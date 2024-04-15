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
    expPointTypes:{
        title: "Tipos de pontos de exploração",
        text: `Podem haver os seguintes tipos de ponto de exporação: 
            <br/><br/> <b>Apenas Texto</b> - Ponto de exploração que contém apenas texto. 
            <br/> <b>Desafio de Rolagem individual</b> - Desafio de rolagem de dados de apenas um jogador. 
            <br/> <b>Desafio de Rolagem em Grupo</b> - Desafio de rolagem de dados de vários jogadores, que pode ser realizado ao longo de várias rodadas para andar com o marcador do trem. 
            <br/> <b>Inimigos aparecem</b> - Selecione uma carta de inimigo para enfrentar.`,
    }
    
    


}

export function HelpModal({ isOpen, onOpen, onClose, helpDataKey }) {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{helpData[helpDataKey]?.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    
                <div dangerouslySetInnerHTML={{ __html: helpData[helpDataKey]?.text }} />

                </ModalBody>

                <ModalFooter mt={10} display='flex' justifyContent='flex-end'>
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
}

