import { Flex } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import PaperTexture from '../assets/paperbackgroundTexture.jpg'

function Background({children, editchapter = false}) {
    return (
        <StyledFlex editchapter={editchapter}>
            {children}
        </StyledFlex>
    );
}

export default Background;


const StyledFlex = styled(Flex)`
    width: 100vw;
    height: ${props => !!props.editchapter ? window.innerHeight*3 + "px" : "100vh"};
    background-image: url(${PaperTexture});
    background-color: #bf6b3f;
    background-blend-mode: multiply;
    background-size: auto;
    background-repeat: repeat;
    align-items: center;
    justify-content: center;
`;
