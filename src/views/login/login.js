import { Button, Card, Flex, Image, Input, Text } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin, handleLoginReq, handleSignUpReq } from '../../api/login';
import { GlobalUserContext } from '../../context/userState';

export function Login() {
 
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const {setGlobalUser} = useContext(GlobalUserContext)

    function isValidEmail(email) {
      var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    }

    const handleLogin = async () =>{
      const res = await   handleLoginReq(email)
      if(!res.data.error){
        await setGlobalUser(res.data)
        navigate("/books")
      }
      else{
        const res2 = await handleSignUpReq(email)

        if(!res2?.data?.error){
          await setGlobalUser(res2.data)
          navigate("/books")
        }
      }

    }

    return (
      <Flex style={{width: "100vw", height: "100vh"}} alignItems="center" justify={'center'} backgroundColor="#384ba1">
            <Card display='flex' justify='center' alignItems='center' direction='column' padding={50}>
                
                <Text fontSize={30} fontWeight={500} textAlign={"center"}>Plataforma Aventureiros da Vila Belga</Text>
                <Flex paddingBottom={10} paddingTop={10} w={"50%"}>
                    <Image objectFit='cover' src='https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149330605.jpg?size=626&ext=jpg&ga=GA1.2.823121397.1691003478&semt=sph'/>
                </Flex>

                <Input placeholder='Digite seu email...' w="80%" mb={10} onChange={(e)=>{setEmail(e.target.value)}}/>
                {/* <Input placeholder='Digite sua senha...' w="80%"/> */}
                
                <Button w="70%" onClick={handleLogin} isDisabled={!isValidEmail(email)}>Login</Button>
            </Card>
      </Flex>
    );
  }
  
