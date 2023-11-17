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
import { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllMaps } from '../../api/mapAPI';
import { createNewChapter, updateChapter } from '../../api/chapterAPI';


export function NewChapterModal({ isOpen, onOpen, onClose, selectedChapter, type }) {

    const [creationStep, setCreationStep] = useState(1)
    const [chapterName, setChapterName] = useState('')
    const [map, setMap] = useState('')
    const [mapsArr, setMapsArr] = useState([])
    const { bookId } = useParams()
    const navigate = useNavigate()

    const onCreatePress = async () => {
        const res = await createNewChapter(bookId, chapterName, parseInt(map))     
        navigate(`/${bookId}/chapters/${res.data.id}`)
    }
    const onUpdatePress = async () => {
        const res = await updateChapter(selectedChapter.id, chapterName, selectedChapter.introduction, selectedChapter.bookId, parseInt(map))     
        navigate(0)
    }

    useLayoutEffect(()=>{
        getData()

        if(type === 'update'){
            setChapterName(selectedChapter.name)
            setMap(selectedChapter.mapId)
        }
    },[])

    const getData = async () => {
        const mps = await getAllMaps()
        await setMapsArr(mps.data)

    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{type === 'add' ? "Criação de Novo Capítulo": `Edição do Capítulo ${selectedChapter.name}`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {creationStep === 1 && type === 'add' &&
                        <>
                            <Text>
                                Todo bom livro, tem capítulos, não é mesmo? Vamos criar juntos esse novo capítulo!
                            </Text>
                            <Text mt={5}>
                                Qual será o título desse capítulo?
                            </Text>
                            <Input placeholder='Insira aqui o nome do seu novo capítulo...' value={chapterName}
                                onChange={(e)=> setChapterName(e.target.value)}/>
                        </>
                    }

                    {creationStep === 2 && type === 'add' &&
                        <>
                            <Text>
                                Para cada capítulo, é necessário um mapa.
                            </Text>
                            <Text mt={5}>
                                Qual mapa você deseja associar a este capítulo?
                            </Text>
                            <Select 
                                placeholder='Escolha o Mapa'
                                value={map}
                                onChange={(e)=>setMap(e.target.value)}
                            >
                                {mapsArr.map(m=>(
                                    <option value={m.id}>{m.name}</option>    
                                ))}
                            </Select>
                        </>
                    }
                    {type === 'update' &&
                        <>
                            <Text>
                                Nome do capítulo:
                            </Text>
                            <Input placeholder='Insira aqui o nome do seu capítulo...' value={chapterName}
                                onChange={(e)=> setChapterName(e.target.value)}/>
                            <Text mt={5}>
                                Qual mapa você deseja associar a este capítulo?
                            </Text>
                            <Select 
                                placeholder='Escolha o Mapa'
                                value={map}
                                onChange={(e)=>setMap(e.target.value)}
                            >
                                {mapsArr.map(m=>(
                                    <option value={m.id} key={m.id}>{m.name}</option>    
                                ))}
                            </Select>
                        </>
                    }
                </ModalBody>

                <ModalFooter mt={10} display='flex' justifyContent='flex-end'>


                    {creationStep === 1 && type === 'add' &&                   
                        <Button colorScheme='blue' mr={3} onClick={()=>setCreationStep(2)}>
                            Próximo Passo
                        </Button>
                    }
                    

                    {creationStep === 2 && type === 'add' &&                   
                        <>
                            <Button colorScheme='blue' mr={3} onClick={()=>setCreationStep(1)}>
                                Voltar
                            </Button>
                            <Button colorScheme='blue' mr={3} onClick={onCreatePress}>
                                CRIAR!!!
                            </Button>
                        </>
                    }

                    {type === 'update' &&      
                            <Button colorScheme='blue' mr={3} onClick={onUpdatePress}>
                                Atualizar
                            </Button>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
}

