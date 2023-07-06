import { Image, Card, Flex, Text } from '@chakra-ui/react'

export function Books() {
 
    return (
      <Flex style={{width: "100vw", height: "100vh"}} alignItems="center" justify={'center'} backgroundColor="#384ba1">
            <Card w="80%" h="90%">
                <Flex direction='column' align="center" justify='space-evenly' h="100%">
                    <Text fontSize='8xl'>Books</Text>

                    <Flex>

                    <Card w="450px" h="450px" flex align='center' direction='row' bg='#75F075'>
                        <Text fontSize='6xl' color='white' align='center'>Create New Book</Text>
                    </Card>

                    <Flex direction='column'>
                        {[1,2].map((num)=>
                        <Card w="600px" h="150px" bg='#FBFBFF' flex align='center' direction='row' mb='15px' ml='15px'>
                            <Image src='https://images.pexels.com/photos/13650913/pexels-photo-13650913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' w='130px' h='100px' ml='15px'/>
                            <Flex direction='column' ml='15px'>
                                <Text fontSize='3xl'>Livro {num}</Text>
                                <Text fontSize='lg'>5 Capitulos</Text>
                            </Flex>
                        </Card>)}
                    </Flex>
                    


                    </Flex>
                     
                </Flex>
            </Card>
      </Flex>
    );
  }
  
