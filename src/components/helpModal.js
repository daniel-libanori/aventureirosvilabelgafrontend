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
    newBook:{
        title: "Criar novo livro",
        text: "Para criar um novo livro, digite o nome do livro no campo de texto e clique no botão 'Criar'.",
    },
    dashboard:{
        title: "Dashboard",
        text: "Esse é o Dashboard, esta página te permite ter uma visão geral dos seus livros criados. Você pode selecionar um livro para continuar a edita-lo, gerar o PDF de um dos livros ou criar um novo livro.",
    },
    newChapter:{
        title: "Criar novo capítulo",
        text: "Para criar um novo capítulo, digite o nome do capítulo, escolha um mapa e clique no botão 'Criar'.",
    },
    chapterEdit:{
        title: "Editar capítulo",
        text: "Nessa página você pode editar o capítulo selecionado, mudando o nome e adicionando/editando a introdução do capítulo",
    },
    
    


}

export function HelpModal({ isOpen, onOpen, onClose, helpDataKey }) {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{helpData[helpDataKey]?.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    
                    <Text>
                        {helpData[helpDataKey]?.text}
                    </Text>

                </ModalBody>

                <ModalFooter mt={10} display='flex' justifyContent='flex-end'>
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
}

