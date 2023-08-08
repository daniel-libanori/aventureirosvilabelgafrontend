import { Image, Card, Flex, Text } from '@chakra-ui/react'
import {
    useDisclosure
} from '@chakra-ui/react'
import { NewBookModal } from './newBookModal';
import { useNavigate } from 'react-router-dom';
import { useContext, useLayoutEffect } from 'react';
import { GlobalContext } from '../../context/globalState';


export function Books() {
    const { isOpen, onOpen, onClose } = useDisclosure() //NewBookModal
    const navigate = useNavigate()
    const { getBooks, load } = useContext(GlobalContext)

    useLayoutEffect(()=>{
        load()
    },[])

    return (
        <Flex style={{ width: "100vw", minHeight: "100vh" }} alignItems="center" justify={'center'} backgroundColor="#384ba1">

            <NewBookModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

            <Card w="80%" h="100%" >
                <Flex direction='column' align="center" justify='space-evenly' h="100%">
                    
                    
                    <Flex w='100%' p={10} align='center' justify='space-between'>
                        <Text fontSize='6xl'>Meus Livros</Text>
                        <Card onClick={onOpen}
                            w="400px" h="120px" flex align='center' direction='row' mb='15px' ml='15px' backgroundColor="rgba(100,250,150,0.8)">
                            <Flex direction='column' ml='15px' alignItems='center' w='100%'>
                                <Text fontSize='3xl' align='center'>Crie um novo Livro</Text>
                            </Flex>
                        </Card>
                    </Flex>
                    

                    <Flex direction='column' overflow={"scroll"} w="100%" h="100%" minH="300px" >


                        { getBooks().map((book,index) =>
                            <Card key={index} onClick={()=>navigate(`/${book.id}/chapters`)} 
                                w="600px" h="150px" bg='#FBFBFF' flex align='center' direction='row' mb='15px' ml='15px'>
                                <Image src='https://images.pexels.com/photos/13650913/pexels-photo-13650913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' w='130px' h='100px' ml='15px' />
                                <Flex direction='column' ml='15px'>
                                    <Text fontSize='3xl'>{book.book_name}</Text>
                                    <Text fontSize='lg'>{book.chapters.length} Capítulo{book.chapters.length !==1 && 's'}</Text>
                                </Flex>
                            </Card>
                            
                            
                            
                            )}

                            { (getBooks().length === 0) &&
                            <Text>
                                Você ainda não possui livros criados, clique no botão verde para criar o seu primeiro.    
                            </Text>}
                    </Flex>




                </Flex>
            </Card>
        </Flex>
    );
}

