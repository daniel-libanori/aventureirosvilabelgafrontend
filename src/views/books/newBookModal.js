import { Text, Button, Input } from '@chakra-ui/react'
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
import { useNavigate } from 'react-router-dom';
import { createNewBook } from '../../api/bookAPI';


export function NewBookModal({ isOpen, onOpen, onClose, user }) {

    const [bookName, setBookName] = useState('')
    const navigate = useNavigate()


    const handleCreateNewBook =  async () => {
        const newBook = await createNewBook(user.id, bookName)
        if(!newBook?.data?.error){
            navigate(`/${newBook.data.id}/chapters`)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Criar um Novo Livro</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        Parabéns, você deu o primeiro passo para criar seu livro!
                    </Text>
                    <Text mt={5}>
                        Qual será o nome do seu livro?
                    </Text>
                    <Input placeholder='Insira aqui o nome do seu novo livro...' value={bookName}
                        onChange={(e)=> setBookName(e.target.value)}/>
                </ModalBody>

                <ModalFooter mt={10}>


                    <Button colorScheme='blue' mr={3} onClick={handleCreateNewBook} isDisabled={bookName === ''}>
                        CRIAR !
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
}

