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
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewBook, updateBook } from '../../api/bookAPI';


export function NewBookModal({ isOpen, onOpen, onClose, user, type, selectedBook }) {

    const [bookName, setBookName] = useState('')
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if(type === "update"){
            setBookName(selectedBook?.name)
        }
    },[])

    const handleCreateNewBook =  async () => {
        if(type === "add"){
            const newBook = await createNewBook(user.id, bookName)
            if(!newBook?.data?.error){
                navigate(`/${newBook.data.id}/chapters`)
            }
        }
        else if(type === "update"){
            const updatedBook = await updateBook(selectedBook.id, bookName)
            if(!updatedBook?.data?.error){
                navigate(0)
            }
        }
    }


    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    { type === "add" ?
                        "Criar um Novo Livro" :
                        `Edição do Livro: ${selectedBook?.name}`
                    }
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    { type === "add" &&
                        <Text>Parabéns, você deu o primeiro passo para criar seu livro!</Text>}
                    <Text mt={5}>
                        Qual será o nome do seu livro?
                    </Text>
                    <Input placeholder='Insira aqui o nome do seu novo livro...' value={bookName}
                        onChange={(e)=> setBookName(e.target.value)}/>
                </ModalBody>

                <ModalFooter mt={10}>


                    <Button colorScheme='blue' mr={3} onClick={handleCreateNewBook} isDisabled={bookName === ''}>
                        {type === 'add' ? "CRIAR !" : "Atualizar"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
}

