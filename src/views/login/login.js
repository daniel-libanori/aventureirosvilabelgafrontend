import { Button, Card, Flex, Image, Input, Text, useDisclosure } from '@chakra-ui/react'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLoginReq, handleSignUpReq } from '../../api/loginAPI';
import { GlobalUserContext } from '../../context/userState';

import AVBLogo from '../../assets/logoVB.png'
import AVBCapa from '../../assets/capaVB.jpg'
import PaperTexture from '../../assets/paperbackgroundTexture.jpg'
import styled from 'styled-components';
import Background from '../../components/background';

import {QuestionOutlineIcon} from '@chakra-ui/icons'
import { HelpModal } from '../../components/helpModal';
import Header from '../../components/header';


export function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const { setGlobalUser } = useContext(GlobalUserContext)
  const { isOpen: isOpenHelp, onOpen: onOpenHelp, onClose: onCloseHelp } = useDisclosure()

  function isValidEmail(email) {
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  const handleLogin = async () => {
    const res = await handleLoginReq(email)
    if (!res.data.error) {
      await setGlobalUser(res.data)
      navigate("/books")
    }
    else {
      const res2 = await handleSignUpReq(email)

      if (!res2?.data?.error) {
        await setGlobalUser(res2.data)
        navigate("/books")
      }
    }

  }

  return (
    <Background>
      <Header/>
      <HelpModal isOpen={isOpenHelp} onOpen={onOpenHelp} onClose={onCloseHelp} helpDataKey={"login"}/>
      <Card display='flex' 
      boxShadow="0px 5px 10px rgba(0, 0, 0, 0.5)"
      justify='center' alignItems='center' direction='row' >


        <Flex justify='center' alignItems='center' direction='column' padding={50} position="relative">
          <Image src={AVBLogo} h={100} />

          <Input placeholder='Digite seu email...' w="80%" mb={10} mt={10} onChange={(e) => { setEmail(e.target.value) }} />

          <Button 
          variant='solid' colorScheme='orange'
          w="70%" onClick={handleLogin} isDisabled={!isValidEmail(email)}>Login</Button>
          <QuestionOutlineIcon cursor="pointer" position="absolute" boxSize={5} top={-2} right={4} onClick={onOpenHelp}/>
        </Flex>

        <Image src={AVBCapa} h={400} />

      </Card>
    </Background>
  );
}
