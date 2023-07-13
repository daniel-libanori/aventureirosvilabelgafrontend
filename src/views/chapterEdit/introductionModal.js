import { Text, Button, Input, Select, Textarea } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useContext, useState } from 'react';
import { GlobalContext } from '../../context/globalState';
import { useNavigate, useParams } from 'react-router-dom';


export function IntroductionModal({ isOpen, onOpen, onClose }) {

    const {addChapterIntroduction} = useContext(GlobalContext)
    const [creationStep, setCreationStep] = useState(1)
    const [introduction, setIntroduction] = useState('')
    const [map, setMap] = useState('1')
    const { bookId, chapterId } = useParams()
    const navigate = useNavigate()

    const onCreatePress = () => {
        addChapterIntroduction(bookId,chapterId, introduction)   
        onClose()     
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text mb={5}>
                        Agora adicione o texto de introdução do seu capítulo.
                    </Text>
                    <Textarea placeholder='Insira aqui a introdução do seu capítulo...' value={introduction}
                        onChange={(e)=> setIntroduction(e.target.value)} height={400}/>
                </ModalBody>

                <ModalFooter mt={10} display='flex' justifyContent='flex-end'>

                <Button colorScheme='blue' mr={3} onClick={onCreatePress}>
                    Adicionar/Criar Introdução
                </Button>
                   
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
}

