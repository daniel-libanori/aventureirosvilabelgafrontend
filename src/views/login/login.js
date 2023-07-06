import { Button, Card, Flex, Input, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

export function Login() {
 
    const navigate = useNavigate();

    return (
      <Flex style={{width: "100vw", height: "100vh"}} alignItems="center" justify={'center'} backgroundColor="#384ba1">
            <Card style={{width: "500px", height: "350px"}}>
                <Flex direction='column' align="center" justify='space-evenly' h="100%">
                    <Text>Login</Text>
                    <Flex direction='column' w='100%' align='center'>
                        <Input placeholder='email' w="70%" mb={3}/>
                        <Input placeholder='password' w="70%"/>
                    </Flex>
                    
                    <Button w="70%" onClick={()=>{navigate("/books")}}>Login</Button>
                </Flex>
            </Card>
      </Flex>
    );
  }
  
