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
import { useContext, useState } from 'react';
import { GlobalContext } from '../../context/globalState';
import { useNavigate, useParams } from 'react-router-dom';


export function NewChapterModal({ isOpen, onOpen, onClose }) {

    const {addNewChapter, getChapters} = useContext(GlobalContext)
    const [creationStep, setCreationStep] = useState(1)
    const [chapterName, setChapterName] = useState('')
    const [map, setMap] = useState('1')
    const { bookId } = useParams()
    const navigate = useNavigate()

    const onCreatePress = () => {
        //const newChapInfo = addNewChapter(bookId,map, chapterName) 
        navigate(`/1/chapters/1`)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {creationStep === 1 &&
                        <>
                            <Text>
                                Agora vamos criar um capítulo para seu livro!
                            </Text>
                            <Text mt={5}>
                                Qual será o nome desse capítulo?
                            </Text>
                            <Input placeholder='Insira aqui o nome do seu novo capítulo...' value={chapterName}
                                onChange={(e)=> setChapterName(e.target.value)}/>
                        </>
                    }

                    {creationStep === 2 &&
                        <>
                            <Text mt={5}>
                                Qual será o mapa desse capítulo?
                            </Text>
                            <Select 
                                placeholder='Escolha o Mapa'
                                value={map}
                                onChange={(e)=>setMap(e.target.value)}
                            >
                                <option value='1'>Museu</option>
                            </Select>
                        </>
                    }
                </ModalBody>

                <ModalFooter mt={10} display='flex' justifyContent='flex-end'>


                    {creationStep === 1 &&                   
                        <Button colorScheme='blue' mr={3} onClick={()=>setCreationStep(2)}>
                            Próximo Passo
                        </Button>
                    }
                    

                    {creationStep === 2 &&                   
                        <>
                            <Button colorScheme='blue' mr={3} onClick={()=>setCreationStep(1)}>
                                Voltar
                            </Button>
                            <Button colorScheme='blue' mr={3} onClick={onCreatePress}>
                                CRIAR!!!
                            </Button>
                        </>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
}

