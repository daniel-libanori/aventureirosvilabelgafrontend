import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Card, Flex, Icon, Link, Text } from '@chakra-ui/react'
import {
    useDisclosure
} from '@chakra-ui/react'
import { NewChapterModal } from './newChapterModal';
import { useContext, useLayoutEffect, useState } from 'react';
import { GlobalContext } from '../../context/globalState';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteChapter, getBooksChapter } from '../../api/chapterAPI';
import { getBook } from '../../api/bookAPI';
import Background from '../../components/background';
import Header from '../../components/header';
import styled from 'styled-components';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { BsBook, BsPencilSquare, BsTrash3Fill } from "react-icons/bs";
import { BsFileEarmarkMedical } from "react-icons/bs";
import { HelpModal } from '../../components/helpModal';

export function Chapters() {
    const { isOpen, onOpen, onClose } = useDisclosure() //NewChapterModal
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const { isOpen: isOpenHelp, onOpen: onOpenHelp, onClose: onCloseHelp } = useDisclosure()
    const [helpDataKey, setHelpDataKey] = useState("")
    const navigate = useNavigate()
    const [chapters, setChapters] = useState([])
    const [ user, setUser ] = useState({})
    const [ book, setBook ] = useState({})
    const [updateOrAddChapterModalType, setUpdateOrAddChapterModalType] = useState("add") //add or update
    const [ selectedChapter, setSelectedChapter ] = useState({})

    const {bookId} = useParams()

    useLayoutEffect(()=>{
        getData()
    },[])

    const getData =  async () => {
        const chps = await getBooksChapter(bookId)
        const bk = await getBook(bookId)
        await setBook(bk.data)
        await setChapters(chps.data)
    }

    const handleSelectChapterToOpenUpdateModal = (chap) => {
        setUpdateOrAddChapterModalType("update")
        setSelectedChapter(chap)
        onOpen()
    }

    const handleDelete = async () => {
        const deletedChapter = await deleteChapter(selectedChapter.id)
        navigate(0)
    }

    return (
        <Background>
            <Header/>

            { isOpen && <NewChapterModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} selectedChapter={selectedChapter} type={updateOrAddChapterModalType}/>}
            <HelpModal isOpen={isOpenHelp} onOpen={onOpenHelp} onClose={onCloseHelp} helpDataKey={helpDataKey}/>
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
                <Flex direction='column' align="center" pl={10} pt={5} pr={10} justify='space-evenly' h="100%">
                    <Flex direction="column" align={'flex-start'} w={"100%"}>
                        <Text fontSize='8xl'>{book?.name}</Text>
                        <Text fontSize='2xl' mb={10}>
                            Você já selecionou seu livro! Agora vamos criar ou editar os capítulos.
                        </Text>
                    </Flex>
                    
                    <Flex direction='row' justify='flex-start' w='100%' mb='15px'>
                        <CreateNewChapterButton onClick={onOpen}>
                            <QuestionOutlineIcon cursor="pointer" 
                                position="absolute" 
                                boxSize={6} top={3} right={3} 
                                onClick={(e)=>{
                                    e.stopPropagation()
                                    setHelpDataKey("newChapter")
                                    onOpenHelp()
                                }}/>

                            <Icon as={BsFileEarmarkMedical} w={24} h={24} mb={5}/>
                            <Text>Criar Novo Capítulo</Text>
                            
                        </CreateNewChapterButton>


                        <Flex direction='column' w={"-webkit-fill-available"}>
                                <Text ml={1.5} mb={2} fontSize='md' fontWeight={500}>Capítulos do meu livro:</Text>
                                <Flex direction='column' overflowY="auto" maxHeight={265}>
                                
                                    {chapters.length >0 ?
                                        chapters.map((chapter,idx) =>
                                        
                                            <Flex key={chapter.id} onClick={() => navigate(`/${book.id}/chapters/${chapter.id}`)} 
                                                minW={400} bg={idx%2===0 ? '#FBFBFB' : '#EEE'} 
                                                align='center' direction='row'
                                                justify={'space-between'}
                                                cursor="pointer"
                                            >
                                                <Flex direction='column' ml='15px'>
                                                    <Text fontSize='xl'>{chapter.name}</Text>
                                                    <Text fontSize='md' mb={2}>{chapter.explorationPoints.length} Capítulo{chapter.explorationPoints.length !== 1 ? "s" : ""}</Text>
                                                </Flex>
                                                <Flex direction={'row'} height={"100%"}>    
                                                    <Flex direction={'column'} justify={'space-evenly'}>
                                                        <Icon as={BsPencilSquare} w={5} h={5} mr={3} onClick={(event) => { event.stopPropagation(); handleSelectChapterToOpenUpdateModal(chapter) }}/>
                                                        <Icon as={BsTrash3Fill} w={5} h={5} mr={3} onClick={(event) => { event.stopPropagation(); ;setSelectedChapter(chapter); onOpenDelete() }}/>
                                                    </Flex>
                                                </Flex>
                                                
                                            </Flex>
                                        )
                                        :
                                        <Flex align='center' justify='center' w={"100%"} h={100}>
                                            <Text fontSize='xl' textAlign="center">Você ainda não possui capítulos criados</Text>
                                        </Flex>
                                    }
                                </Flex>
                        </Flex>
                    </Flex>
{/*             
                    {
                        chapters.map(chps=>(
                            <Card onClick={()=>navigate(`/${bookId}/chapters/${chps.id}`)}  key={chps.id}
                                w="100%" h="150px" bg='#FBFBFF' flex align='center' direction='row' mb='15px'>
                                <Flex direction='column' ml='15px'>
                                    <Text fontSize='3xl'>{chps.name}</Text>
                                    
                                </Flex>
                            </Card>
                        ))

                    } */}


                </Flex>

                <Flex justify={'space-between'} w={"100%"} pl={2} pr={2} pb={0.5} color={"#888"}>
                    <Text fontStyle={"italic"}>Avalie a nossa plataforma:{' '}
                        <Link href='https://forms.gle/DYmw3VJEa4qnPvgDA' isExternal>Clique Aqui</Link>
                    </Text>
                </Flex>
            </Card>
        </Background>
    );
}

const CreateNewChapterButton = styled(Flex)`
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