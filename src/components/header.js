import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import PaperTexture from '../assets/paperText2.jpeg'
import AVBLogo from '../assets/logoVB.png'

function Header() {
    return (
        <StyledFlex position={'absolute'} w={"100vw"} h={10}  top={0} align={'center'} color={"#84503D"}>
            <Image src={AVBLogo} h={7} ml={5}/>
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
