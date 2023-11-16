import { Text, Button, Input, Select } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

const helpData = {
    login:{
        title: "Login",
        text: "Para fazer login, digite seu email no campo de texto e clique no botão 'Login'. Caso seja seu primeiro acesso, será criado um novo usuário com o email fornecido.",
    },



}

export function HelpModal({ isOpen, onOpen, onClose, helpDataKey }) {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{helpData[helpDataKey].title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    
                    <Text>
                        {helpData[helpDataKey].text}
                    </Text>

                </ModalBody>

                <ModalFooter mt={10} display='flex' justifyContent='flex-end'>
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
}

