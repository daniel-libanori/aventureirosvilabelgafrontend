import { Card, Flex, Text } from '@chakra-ui/react'
import {
    useDisclosure
} from '@chakra-ui/react'
import { IntroductionModal } from './introductionModal';


export function ChapterEdit() { 
    const { isOpen, onOpen, onClose } = useDisclosure() //IntroductionModal

    return (
        <Flex style={{ width: "100vw", minHeight: "100vh" }} alignItems="center" justify={'center'} backgroundColor="#384ba1">

            <IntroductionModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />


            <Card w="80%" h="90%" mt="5vh" mb="5vh">
                <Flex direction='column' align="center" justify='space-evenly' h="100%">
                    <Text fontSize='8xl'>Chapter Edit</Text>

                    <Flex direction="column" w="100%">

                        <Card onClick={onOpen}
                            w="98%" h="150px" bg='#FBFBFF' flex align='center' direction='row' mb='15px' ml='15px' backgroundColor="green">
                            <Flex direction='column' ml='15px'>
                                <Text fontSize='3xl'>Add/Edit Introduction</Text>
                            </Flex>
                        </Card>




                    </Flex>

                </Flex>
            </Card>
        </Flex>
    );
}

