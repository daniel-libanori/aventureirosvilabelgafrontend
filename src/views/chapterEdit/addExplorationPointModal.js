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
import { useLayoutEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createNewExplorationPoint, updateExplorationPoint } from '../../api/explorationPointAPI';


export function AddExplorationPointModal({ isOpen, onOpen, onClose, x, y, expPointArr, type, selectedExplorationPoint}) {
    const [ introduction, setIntroduction] = useState('')
    const [ text, setText] = useState('')
    const { chapterId } = useParams()
    const [ preRequisiteExpPoints, setPreRequisiteExpPoints] = useState([])
    const [ name, setName ] = useState("")
    const [ code, setCode ] = useState("")
    const navigate = useNavigate()

    const [formatedExpPointArr, setFormatedExpPointArr] = useState([])

    useLayoutEffect(()=>{
        const newExpPointArr = expPointArr.map(item=> item[Object.keys(item)[0]]).flat()
        setFormatedExpPointArr(newExpPointArr)
        if(type === "update"){
            setName(selectedExplorationPoint.name)
            setCode(selectedExplorationPoint.code)
            setIntroduction(selectedExplorationPoint.introduction)
            setText(selectedExplorationPoint.text)
            setPreRequisiteExpPoints(selectedExplorationPoint.previousRelation)
        }
    },[])

    const onCreatePress = async () => {
        if(type === "add"){
            const res = await createNewExplorationPoint(chapterId, name, code, x, y, introduction, text,preRequisiteExpPoints.map(e=>e.id), [])
        }
        else if (type === "update"){
            const res = await updateExplorationPoint(selectedExplorationPoint.id, name, code, x, y, introduction, text,preRequisiteExpPoints.map(e=>e.id), [])
        }
        navigate(0)
        onClose()     
    }

    return (

        <Modal isOpen={isOpen} onClose={onClose} size="5xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Criação de Novo Ponto de Exploração</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction="column">
                        <Text>Digite o nome do seu ponto de exploração</Text>
                        <Input onChange={e=>setName(e.target.value)} value={name} placeholder='Nome do seu ponto de exploração...'/>
                        <Text>Digite o código do seu ponto de exploração</Text>
                        <Input onChange={e=>setCode(e.target.value)} value={code} placeholder='Códgio do seu ponto de exploração...'/>
                        <Flex direction="row" mt={10}>
                            <Flex direction="column">
                                <Text mb={5}>
                                    Agora adicione o texto de introdução do seu ponto de exploração.
                                </Text>
                                <Textarea placeholder='Insira aqui a introdução do ponto de exploração...' value={introduction}
                                    onChange={(e)=> setIntroduction(e.target.value)} height={400} w={400}/>
                                <Text mb={5}>
                                    Agora adicione o texto do seu ponto de exploração.
                                </Text>
                                <Textarea placeholder='Insira aqui o texto do ponto de exploração...' value={text}
                                    onChange={(e)=> setText(e.target.value)} height={400} w={400}/>
                            </Flex>
                            <Flex direction="column">
                                <Text ml={5} mb={5}>Selecione pontos que serão pré-requisitos para esse ponto de exploração:</Text>
                                <Flex overflow="auto" direction="column"
                                    border="1px solid black" w={550} h={300} ml={5}>
                                    {formatedExpPointArr.map((expPoint,index)=>{
                                        if(expPoint.id === selectedExplorationPoint.id) return null
                                        return(
                                        <Flex key={index} border="1px solid black" m={1} p={1} 
                                            bgColor={preRequisiteExpPoints.some(p => p.id === expPoint.id) ?
                                                "rgba(255,255,0,0.5)": null}
                                            direction='column' 
                                            onClick={()=>{
                                                if(preRequisiteExpPoints.some(p => p.id === expPoint.id)){
                                                    const newArr = preRequisiteExpPoints.filter(p=>{
                                                        return !(p.id==expPoint.id)
                                                    })
                                                    setPreRequisiteExpPoints(newArr)
                                                }
                                                else{
                                                    setPreRequisiteExpPoints([...preRequisiteExpPoints, expPoint])
                                                    
                                                }
                                            }}
                                            >
                                            <Text>{expPoint.name}</Text>
                                            <Text>x:{expPoint.xPosition} y:{expPoint.yPosition}</Text>
                                        </Flex>
                                    )})

                                    }
                                    
                                </Flex>
                                <Text ml={5} mr={1} mb={5}>*Caso não exista nenhum pré-requisito, ele será liberado ao inicio do jogo.</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    
                    
                    
                </ModalBody>

                <ModalFooter mt={10} display='flex' justifyContent='flex-end'>

                <Button colorScheme='blue' mr={3} onClick={onCreatePress}>
                    {type === "add" ? "Adicionar Ponto de Exploracao" : "Atualizar Ponto de Exploracao"}
                </Button>
                   
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
}

