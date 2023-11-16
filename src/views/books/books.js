import { Image, Card, Flex, Text, Button, Icon } from '@chakra-ui/react'
import {
    useDisclosure
} from '@chakra-ui/react'
import { NewBookModal } from './newBookModal';
import { useNavigate } from 'react-router-dom';
import { useContext, useLayoutEffect, useState } from 'react';
import { deleteBook, getMyBooks } from '../../api/bookAPI';
import { GlobalUserContext } from '../../context/userState'
import { getPdf } from '../../api/pdfAPI';
import Background from '../../components/background';
import styled from 'styled-components';
import { BsBook } from "react-icons/bs";
import { HelpModal } from '../../components/helpModal';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

import { BsPencilSquare } from "react-icons/bs";
import { BsTrash3Fill } from "react-icons/bs";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";

export function Books() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const { isOpen: isOpenHelp, onOpen: onOpenHelp, onClose: onCloseHelp } = useDisclosure()
    const [helpDataKey, setHelpDataKey] = useState("")
    const navigate = useNavigate()
    const { getGlobalUser } = useContext(GlobalUserContext)
    const [user, setUser] = useState({})
    const [books, setBooks] = useState([])

    const [updateOrAddBookModalType, setUpdateOrAddExpPointModalType] = useState("add") //add or update
    const [selectedBook, setSelectedBook] = useState({})


    useLayoutEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setUser(await getGlobalUser())
        const usr = await getGlobalUser()
        const bks = await getMyBooks(usr.id)
        await setBooks(bks?.data)
    }

    const generatePDF = async (bookId) => {
        const response = await getPdf(bookId)
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(pdfBlob);
        window.open(url);
    };

    const handleSelectBookToOpenUpdateModal = (book) => {
        setUpdateOrAddExpPointModalType("update")
        setSelectedBook(book)
        onOpen()
    }

    const handleDelete = async () => {
        const deletedBook = await deleteBook(selectedBook.id)
        navigate(0)
    }

    return (
        <Background style={{ width: "100vw", minHeight: "100vh" }} alignItems="center" justify={'center'} backgroundColor="#384ba1">

            <HelpModal isOpen={isOpenHelp} onOpen={onOpenHelp} onClose={onCloseHelp} helpDataKey={helpDataKey}/>

            {isOpen && <NewBookModal isOpen={isOpen} onOpen={onOpen} onClose={()=> {setUpdateOrAddExpPointModalType("add");onClose()}} user={user} type={updateOrAddBookModalType} selectedBook={selectedBook}/>}

            { isOpenDelete &&
            <AlertDialog isOpen={isOpenDelete} onClose={onCloseDelete}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Deletar Livro
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Você tem certeza? Essa ação não poderá ser desfeita.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={onCloseDelete}>
                        Cancelar
                        </Button>
                        <Button colorScheme="red" onClick={handleDelete} ml={3}>
                        Deletar
                        </Button>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>}


            <Card mt={[, , , 100, 300]} mb={[, , , 100, 300]} 
                boxShadow="0px 5px 10px rgba(0, 0, 0, 0.5)"
                w={[,,,"70vw","60vw"]}>

                <Flex align='flex-start' justify='space-between' direction="column" p={10}>
                    <Flex position="relative" mb={5}>
                        <Text fontSize='6xl'>Dashboard</Text>
                        <QuestionOutlineIcon cursor="pointer" 
                                position="absolute" 
                                boxSize={5} top={4} right={-6} 
                                onClick={(e)=>{
                                    e.stopPropagation()
                                    setHelpDataKey("dashboard")
                                    onOpenHelp()
                                }}/>
                    </Flex>
                    
                    <Flex direction='row' justify='flex-start' w='100%' mb='15px'>
                        <CreateNewBookButton onClick={onOpen}>
                            <QuestionOutlineIcon cursor="pointer" 
                                position="absolute" 
                                boxSize={6} top={3} right={3} 
                                onClick={(e)=>{
                                    e.stopPropagation()
                                    setHelpDataKey("newBook")
                                    onOpenHelp()
                                }}/>

                            <Icon as={BsBook} w={24} h={24} mb={5}/>
                            <Text>Criar Novo Livro</Text>
                            
                        </CreateNewBookButton>
                        
                        <Flex direction='column' w={"-webkit-fill-available"}>
                            <Text ml={1.5} mb={2} fontSize='md' fontWeight={500}>Meus Livros:</Text>
                            <Flex direction='column' overflowY="auto" maxHeight={265}>
                            
                                {books.length >0 ?
                                    books.map((book,idx) =>
                                    
                                        <Flex key={book.id} onClick={() => navigate(`/${book.id}/chapters`)} 
                                            minW={400} bg={idx%2===0 ? '#FBFBFB' : '#EEE'} 
                                            align='center' direction='row'
                                            justify={'space-between'}
                                            cursor="pointer"
                                        >
                                            <Flex direction='column' ml='15px'>
                                                <Text fontSize='xl'>{book.name}</Text>
                                                <Text fontSize='md' mb={2}>{book.chapterCount} Capítulo{book.chapterCount !== 1 ? "s" : ""}</Text>
                                            </Flex>
                                            <Flex direction={'row'} height={"100%"}>    
                                                <Flex direction={'column'} justify={'space-evenly'}>
                                                    <Icon as={BsPencilSquare} w={5} h={5} mr={3} onClick={(event) => { event.stopPropagation(); handleSelectBookToOpenUpdateModal(book) }}/>
                                                    <Icon as={BsTrash3Fill} w={5} h={5} mr={3} onClick={(event) => { event.stopPropagation(); ;setSelectedBook(book); onOpenDelete() }}/>
                                                </Flex>

                                                <Button height={"100%"} variant='ghost'
                                                    onClick={(event) => { event.stopPropagation(); generatePDF(book.id) }}>
                                                    Gerar PDF
                                                </Button>
                                            </Flex>
                                            
                                        </Flex>
                                    )
                                    :
                                    <Flex align='center' justify='center' w={"100%"} h={100}>
                                        <Text fontSize='xl' textAlign="center">Você ainda não possui livros criados</Text>
                                    </Flex>
                                }
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>




            </Card>
        </Background>
    );
}

const CreateNewBookButton = styled(Flex)`
    width: 300px;
    height: 300px;
    border-radius: 20px;
    background-color: rgba(99, 224, 111,1);
    cursor: pointer;
    border: 5px dashed #3fb54b;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
    font-size: 30px;
    line-height: 32px;
    font-weight: 500;
    text-align: center;
    margin-right: 20px;
    position: relative;
`;
