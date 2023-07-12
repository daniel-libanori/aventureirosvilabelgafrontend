import { Card, Flex, Text } from '@chakra-ui/react'
import {
    useDisclosure
} from '@chakra-ui/react'
import { NewChapterModal } from './newChapterModal';


export function ChapterEdit() { 
    const { isOpen, onOpen, onClose } = useDisclosure() //NewChapterModal

    return (
        <Flex style={{ width: "100vw", minHeight: "100vh" }} alignItems="center" justify={'center'} backgroundColor="#384ba1">

            <NewChapterModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />


            <Card w="80%" h="90%" mt="5vh" mb="vh">
                <Flex direction='column' align="center" justify='space-evenly' h="100%">
                    <Text fontSize='8xl'>Chapter Edit</Text>

                    <Flex direction="column">

                        <Card onClick={onOpen}
                            w="600px" h="150px" bg='#FBFBFF' flex align='center' direction='row' mb='15px' ml='15px' backgroundColor="green">
                            <Flex direction='column' ml='15px'>
                                <Text fontSize='3xl'>Create a New Chapter</Text>
                            </Flex>
                        </Card>




                    </Flex>

                </Flex>
            </Card>
        </Flex>
    );
}

