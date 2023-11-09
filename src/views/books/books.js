import { Image, Card, Flex, Text } from '@chakra-ui/react'
import {
    useDisclosure
} from '@chakra-ui/react'
import { NewBookModal } from './newBookModal';
import { useNavigate } from 'react-router-dom';
import { useContext, useLayoutEffect, useState } from 'react';
import { GlobalContext } from '../../context/globalState';
import { getMyBooks } from '../../api/bookAPI';
import {GlobalUserContext} from '../../context/userState'


export function Books() {
    const { isOpen, onOpen, onClose } = useDisclosure() //NewBookModal
    const navigate = useNavigate()
    const { getBooks, load } = useContext(GlobalContext)
    const { getGlobalUser } = useContext(GlobalUserContext)
    const [ user, setUser ] = useState({})
    const [ books, setBooks ] = useState([])

    useLayoutEffect(()=>{
        getData()
    },[])

    const getData =  async () => {
        setUser(await getGlobalUser())
        const usr = await getGlobalUser()
        const bks = await getMyBooks(usr.id)
        await setBooks(bks.data)
    }

    return (
        <Flex style={{ width: "100vw", minHeight: "100vh" }} alignItems="center" justify={'center'} backgroundColor="#384ba1">

            <NewBookModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} user={user}/>

            <Card h="100%">
                    
                    
                    <Flex  p={20} align='center' justify='space-between' direction="column">
                        <Text fontSize='6xl'>Meus Livros</Text>
                        
                    
                        <Card onClick={onOpen}
                            w="400px" h="120px" flex align='center' direction='row' mb='15px' backgroundColor="rgba(100,250,150,0.8)">
                            <Flex direction='column' ml='15px' alignItems='center' w='100%'>
                                <Text fontSize='3xl' align='center'>Crie um novo Livro</Text>
                            </Flex>
                        </Card>

                        {   books.map((book)=>
                            <Card key={book.id} onClick={()=>navigate(`/${book.id}/chapters`)} w="100%" h="150px" bg='#FBFBFF' flex align='center' direction='row' mb='15px'>
                                <Image src='https://images.pexels.com/photos/13650913/pexels-photo-13650913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' w='130px' h='100px' ml='15px' />
                                <Flex direction='column' ml='15px'>
                                    <Text fontSize='3xl'>{book.name}</Text>
                                    <Text fontSize='lg'>{book.chapterCount} Capítulo{book.chapterCount !== 1 ? "s" : ""}</Text>
                                </Flex>
                            </Card>
                        )

                        }
                    </Flex>




            </Card>
        </Flex>
    );
}

