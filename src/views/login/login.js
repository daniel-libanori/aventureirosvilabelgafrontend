import { Button, Card, Flex, Image, Input, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

export function Login() {
 
    const navigate = useNavigate();

    return (
      <Flex style={{width: "100vw", height: "100vh"}} alignItems="center" justify={'center'} backgroundColor="#384ba1">
            <Card style={{width: "50vw", height: "350px"}} display='flex' justify='center' alignItems='center' direction='row'>
                <Flex w='100%' minW="350px" direction='column' align="center" justify='space-evenly' h="100%">
                    <Text>Plataforma Aventureiros da Vila Belga</Text>
                    <Flex direction='column' w='100%' align='center'>
                        <Input placeholder='Digite seu email...' w="80%" mb={3}/>
                        <Input placeholder='Digite sua senha...' w="80%"/>
                    </Flex>
                    
                    <Button w="70%" onClick={()=>{navigate("/books")}}>Login</Button>
                </Flex>
                <Flex h="100%" w='100%'>
                    <Image objectFit='cover' src='https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149330605.jpg?size=626&ext=jpg&ga=GA1.2.823121397.1691003478&semt=sph'/>
                </Flex>
            </Card>
      </Flex>
    );
  }
  
