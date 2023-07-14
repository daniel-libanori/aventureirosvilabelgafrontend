import { Text, Button, Input, Select, Textarea } from '@chakra-ui/react'
import {
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { GlobalContext } from '../../context/globalState';
import { useParams } from 'react-router-dom';


export function AddExplorationPointModal({ isOpen, onOpen, onClose, x, y}) {

    const {getExplorationPointsArray, addNewExplorationPoint} = useContext(GlobalContext)
    const [text, setText] = useState('')
    const [ expPointsArr, setExpPointsArr ] = useState([])
    const { bookId, chapterId } = useParams()
    const [ necessaryExpPoints, setNecessaryExpPoints] = useState([])
    const [ name, setName ] = useState("")

    useEffect(()=>{
        setExpPointsArr(getExplorationPointsArray(bookId,chapterId))
    },[])

    const onCreatePress = () => {
        addNewExplorationPoint(bookId, chapterId, x, y, name, text, necessaryExpPoints)
        onClose()     
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="5xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction="column">
                        <Text>Digite o nome do seu ponto de exploração</Text>
                        <Input onChange={e=>setName(e.target.value)} value={name} placeholder='Nome do seu ponto de exploração...'/>
                        <Flex direction="row" mt={10}>
                            <Flex direction="column">
                                <Text mb={5}>
                                    Agora adicione o texto de introdução do seu capítulo.
                                </Text>
                                <Textarea placeholder='Insira aqui o texto do ponto de exploração...' value={text}
                                    onChange={(e)=> setText(e.target.value)} height={400} w={400}/>
                            </Flex>
                            <Flex direction="column">
                                <Text ml={5} mb={5}>Selecione pontos que serão liberados ao concluir:</Text>
                                <Flex overflow="auto" direction="column"
                                    border="1px solid black" w={550} h={300} ml={5}>
                                    {expPointsArr.map((expPoint,index)=>(
                                        <Flex key={index} border="1px solid black" m={1} p={1} 
                                            bgColor={necessaryExpPoints.some(p => p.x === expPoint.x && p.y === expPoint.y && p.id === expPoint.id) ?
                                                "rgba(255,255,0,0.5)": null}
                                            direction='column' onClick={()=>{
                                                if(necessaryExpPoints.some(p => p.x === expPoint.x && p.y === expPoint.y && p.id === expPoint.id)){
                                                    const newArr = necessaryExpPoints.filter(p=>{
                                                        return !(p.id==expPoint.id && p.x === expPoint.x && p.y===expPoint.y)
                                                    })
                                                    setNecessaryExpPoints(newArr)
                                                }
                                                else{
                                                    setNecessaryExpPoints([...necessaryExpPoints, expPoint])
                                                    
                                                }
                                            }}>
                                            <Text>{expPoint.name}</Text>
                                            <Text>x:{expPoint.x} y:{expPoint.y}</Text>
                                        </Flex>
                                    ))

                                    }
                                    
                                </Flex>
                                <Text ml={5} mr={1} mb={5}>*Caso nenhum ponto de exploração referencie o seu ponto, ele será liberado ao inicio do jogo.</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    
                    
                    
                </ModalBody>

                <ModalFooter mt={10} display='flex' justifyContent='flex-end'>

                <Button colorScheme='blue' mr={3} onClick={onCreatePress}>
                    Adicionar Ponto de Exploracao
                </Button>
                   
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
}

