import { Card, Flex, Text } from '@chakra-ui/react'
import {
    useDisclosure
} from '@chakra-ui/react'
import { NewChapterModal } from './newChapterModal';
import { useContext, useLayoutEffect, useState } from 'react';
import { GlobalContext } from '../../context/globalState';
import { useNavigate, useParams } from 'react-router-dom';
import { getBooksChapter } from '../../api/chapterAPI';
import { getBook } from '../../api/bookAPI';


export function Chapters() {
    const { isOpen, onOpen, onClose } = useDisclosure() //NewChapterModal
    const { getChapters } = useContext(GlobalContext)
    const navigate = useNavigate()
    const [chapters, setChapters] = useState([])
    const [ user, setUser ] = useState({})
    const [ book, setBook ] = useState({})

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

    return (
        <Flex style={{ width: "100vw", minHeight: "100vh" }} alignItems="center" justify={'center'} backgroundColor="#384ba1">

            <NewChapterModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>

            <Card h="90%" mt="5vh" mb="vh">
                <Flex direction='column' align="center" p={50} justify='space-evenly' h="100%">
                    <Flex direction="column">
                        <Text fontSize='8xl'>Capítulos</Text>
                        <Text fontSize='2xl' mb={10}>{book.name}</Text>
                    </Flex>
                    
                    

                    <Card onClick={onOpen} 
                                w="100%" h="150px" bg='#20B020' flex align='center' direction='row' mb='15px'>
                        <Flex direction='column' ml='15px'>
                            <Text fontSize='3xl' >Criar Novo Capítulo</Text>
                        </Flex>
                    </Card>
                    {
                        chapters.map(chps=>(
                            <Card onClick={()=>navigate(`/${bookId}/chapters`)}  key={chps.id}
                                w="100%" h="150px" bg='#FBFBFF' flex align='center' direction='row' mb='15px'>
                                <Flex direction='column' ml='15px'>
                                    <Text fontSize='3xl'>{chps.name}</Text>
                                    {/* <Text fontSize='lg'>5 Pontos de Exploração</Text> */}
                                </Flex>
                            </Card>
                        ))

                    }


                </Flex>
            </Card>
        </Flex>
    );
}

