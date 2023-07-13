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
        setChapters(getChapters(bookId))
    },[])

    return (
        <Flex style={{ width: "100vw", minHeight: "100vh" }} alignItems="center" justify={'center'} backgroundColor="#384ba1">

            <NewChapterModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

            

            <Card w="80%" h="90%" mt="5vh" mb="vh">
                <Flex direction='column' align="center" justify='space-evenly' h="100%">
                    <Text fontSize='8xl'>Chapters</Text>

                    <Flex direction="row" wrap="wrap">

                        <Card onClick={onOpen}
                            w="200px" h="300px" bg='#FBFBFF' flex align='center' direction='row' mb='15px' ml='15px' backgroundColor="green">
                            <Flex direction='column' textAlign="center">
                                <Text fontSize='2xl'>Create a New Chapter</Text>
                            </Flex>
                        </Card>

                        {chapters.map((chapter,index) =>
                            <Card key={index} onClick={()=>navigate(`/${bookId}/chapters/${chapter.id}`)} 
                                w="200px" h="300px" bg='#FBFBFF' flex align='center' direction='row' mb='15px' ml='15px'>
                                <Flex direction='column' ml='15px'>
                                    <Text fontSize='3xl'>{chapter.chapter_name}</Text>
                                    <Text fontSize='lg'>{chapter.exploration_points.length} Ponto{chapter.exploration_points.length !==1 && 's'} de Exploração</Text>
                                </Flex>
                            </Card>
                        )}


                    </Flex>

                </Flex>
            </Card>
        </Flex>
    );
}

