import { Flex, Image, Text } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import PaperTexture from '../assets/paperText2.jpeg'
import AVBLogo from '../assets/logoVB.png'
import { useNavigate } from 'react-router-dom';
import { GlobalUserContext } from '../context/userState';

function Header() {

    const navigate = useNavigate();
    const {logout,getGlobalUser} = useContext(GlobalUserContext)
    const [isLogged, setIsLogged] = React.useState(false)


    useEffect(() => {
        const user = getGlobalUser()
        setIsLogged(!!user?.email)
    }, [])

    return (
        <StyledFlex position={'absolute'} w={"100vw"} h={10}  top={0} 
            align={'center'} justify={"space-between"} color={"#593123"}>
            <Image src={AVBLogo} h={7} ml={5} onClick={()=>navigate("/")}
                cursor={"pointer"}/>
            { isLogged &&
            <Text fontSize={20} fontWeight={700} mr={5} cursor={"pointer"}
                onClick={()=>{logout();navigate("/")}}>
                Sair
            </Text>}
        </StyledFlex>
    );
}

export default Header;


const StyledFlex = styled(Flex)`
    background-color: #e08c5e;
    background-image: url(${PaperTexture});
    background-blend-mode: multiply;
    border-bottom: 2px solid #84503D;
`;
