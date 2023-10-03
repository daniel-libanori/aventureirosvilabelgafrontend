import { Button, Card, Flex, Image, Input, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

export function Login() {
 
    const navigate = useNavigate();

    return (
      <Flex style={{width: "100vw", height: "100vh"}} alignItems="center" justify={'center'} backgroundColor="#384ba1">
            <Card display='flex' justify='center' alignItems='center' direction='column' padding={50}>
                
                <Text fontSize={30} fontWeight={500} textAlign={"center"}>Plataforma Aventureiros da Vila Belga</Text>
                <Flex paddingBottom={10} paddingTop={10} w={"50%"}>
                    <Image objectFit='cover' src='https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149330605.jpg?size=626&ext=jpg&ga=GA1.2.823121397.1691003478&semt=sph'/>
                </Flex>

                <Input placeholder='Digite seu email...' w="80%" mb={10}/>
                {/* <Input placeholder='Digite sua senha...' w="80%"/> */}
                
                <Button w="70%" onClick={()=>{navigate("/books")}}>Login</Button>
            </Card>
      </Flex>
    );
  }
  
