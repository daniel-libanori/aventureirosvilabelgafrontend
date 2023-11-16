import { Flex } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import PaperTexture from '../assets/paperbackgroundTexture.jpg'

function Background({children}) {
    return (
        <StyledFlex>
            {children}
        </StyledFlex>
    );
}

export default Background;


const StyledFlex = styled(Flex)`
    width: 100vw;
    height: 100vh;
    background-image: url(${PaperTexture});
    background-color: #bf6b3f;
    background-blend-mode: multiply;
    align-items: center;
    justify-content: center;
`;
