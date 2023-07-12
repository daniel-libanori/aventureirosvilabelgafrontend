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


            <Card w="80%" h="90%" mt="5vh" mb="vh">
                <Flex direction='column' align="center" justify='space-evenly' h="100%">
                    <Text fontSize='8xl'>Books</Text>

                    <Flex direction="column">

                        <Card onClick={onOpen}
                            w="600px" h="150px" bg='#FBFBFF' flex align='center' direction='row' mb='15px' ml='15px' backgroundColor="green">
                            <Flex direction='column' ml='15px'>
                                <Text fontSize='3xl'>Create a New Book</Text>
                            </Flex>
                        </Card>

                        <Flex direction='column'>
                            {getBooks().map((book,index) =>
                                <Card key={index} onClick={()=>navigate(`/${book.id}/chapters`)} 
                                    w="600px" h="150px" bg='#FBFBFF' flex align='center' direction='row' mb='15px' ml='15px'>
                                    <Image src='https://images.pexels.com/photos/13650913/pexels-photo-13650913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' w='130px' h='100px' ml='15px' />
                                    <Flex direction='column' ml='15px'>
                                        <Text fontSize='3xl'>{book.book_name}</Text>
                                        <Text fontSize='lg'>{book.chapters.length} Capítulo{book.chapters.length !==1 && 's'}</Text>
                                    </Flex>
                                </Card>)}
                        </Flex>



                    </Flex>

                </Flex>
            </Card>
        </Flex>
    );
}

