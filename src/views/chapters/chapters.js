import { Card, Flex, Text } from '@chakra-ui/react'
import {
    useDisclosure
} from '@chakra-ui/react'
import { NewChapterModal } from './newChapterModal';
import { useContext, useLayoutEffect, useState } from 'react';
import { GlobalContext } from '../../context/globalState';
import { useNavigate, useParams } from 'react-router-dom';


export function Chapters() {
    const { isOpen, onOpen, onClose } = useDisclosure() //NewChapterModal
    const { getChapters } = useContext(GlobalContext)
    const navigate = useNavigate()
    const { bookId } = useParams()
    const [chapters, setChapters] = useState([])

    useLayoutEffect(()=>{
        //setChapters(getChapters(bookId))
    },[])

    return (
        <Flex style={{ width: "100vw", minHeight: "100vh" }} alignItems="center" justify={'center'} backgroundColor="#384ba1">

            <NewChapterModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

            

            <Card h="90%" mt="5vh" mb="vh">
                <Flex direction='column' align="center" p={50} justify='space-evenly' h="100%">
                    <Flex direction="column">
                        <Text fontSize='8xl'>Capítulos</Text>
                        <Text fontSize='2xl' mb={10}>Livro 1</Text>
                    </Flex>
                    

                    <Card onClick={onOpen} 
                                w="100%" h="150px" bg='#20B020' flex align='center' direction='row' mb='15px'>
                        <Flex direction='column' ml='15px'>
                            <Text fontSize='3xl' >Criar Novo Capítulo</Text>
                        </Flex>
                    </Card>
                    <Card onClick={()=>navigate(`/1/chapters`)} 
                                w="100%" h="150px" bg='#FBFBFF' flex align='center' direction='row' mb='15px'>
                        <Flex direction='column' ml='15px'>
                            <Text fontSize='3xl'>Capitulo 1</Text>
                            <Text fontSize='lg'>5 Pontos de Exploração</Text>
                        </Flex>
                    </Card>
                    <Card onClick={()=>navigate(`/1/chapters`)} 
                                w="100%" h="150px" bg='#FBFBFF' flex align='center' direction='row' mb='15px'>
                        <Flex direction='column' ml='15px'>
                            <Text fontSize='3xl'>Capitulo 2</Text>
                            <Text fontSize='lg'>5 Pontos de Exploração</Text>
                        </Flex>
                    </Card>
                    <>
                    {/* {chapters.map((chapter,index) =>
                        <Card key={index} onClick={()=>navigate(`/${bookId}/chapters/${chapter.id}`)} 
                            w="200px" h="300px" bg='#FBFBFF' flex align='center' direction='row' mb='15px' ml='15px'>
                            <Flex direction='column' ml='15px'>
                                <Text fontSize='3xl'>{chapter.chapter_name}</Text>
                                <Text fontSize='lg'>{chapter.exploration_points.length} Ponto{chapter.exploration_points.length !==1 && 's'} de Exploração</Text>
                            </Flex>
                        </Card>
                    )} */}
                    </>


                </Flex>
            </Card>
        </Flex>
    );
}

