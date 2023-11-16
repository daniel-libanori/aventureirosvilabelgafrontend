import { Text, Button, Input, Select, Textarea, HStack, useNumberInput, NumberInput, NumberInputField } from '@chakra-ui/react'
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
    const [ explorationPointType, setExplorationPointType ] = useState("text")
    const navigate = useNavigate()

    const [formatedExpPointArr, setFormatedExpPointArr] = useState([])

    // Fight
    const [enemyArr, setEnemyArr] = useState([])
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 10,
      precision: 0,
    })

    //challanges
    const [diceAmount, setDiceAmount] = useState(1)
    const [diceMinimumValue, setDiceMinimumValue] = useState(1)
    const [diceSuccessAmout, setDiceSuccessAmout] = useState(1)

    //challanges and fight
    const [successText, setSuccessText] = useState("")
    const [failText, setFailText] = useState("")

  const inc = getIncrementButtonProps()
  const dec = () => {
    setEnemyArr(enemyArr.slice(0, -1))
    getDecrementButtonProps()
  }
  const input = getInputProps()

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

    function contarAteNumero(numero) {
        if(numero==0) return [1]

        const resultado = [];
        for (let i = 1; i <= numero; i++) {
            resultado.push(i);
        }
        return resultado;
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
                                
                                <Text mt={5} mb={2}>
                                    Selecione o tipo do seu ponto de exploração.
                                </Text>
                                <Select 
                                    placeholder='Escolha o Tipo do Ponto de Exploração'
                                    value={explorationPointType}
                                    onChange={(e)=>setExplorationPointType(e.target.value)}
                                >
                                    <option value={'text'}>Texto Apenas</option>
                                    <option value={'fight'}>Inimigos aparecem</option>
                                    <option value={'individual-challange'}>Desafio de Rolagem individual</option>
                                    <option value={'group-challange'}>Desafio de Rolagem em Grupo</option>    
                                </Select>

                                {explorationPointType === "text" &&
                                <>
                                    <Text mt={5} mb={2}>
                                        Agora adicione o texto do seu ponto de exploração.
                                    </Text>
                                    <Textarea placeholder='Insira aqui o texto do ponto de exploração...' value={text}
                                        onChange={(e)=> setText(e.target.value)} height={400} w={400}/>
                                </>
                                }
                                {explorationPointType === "fight" &&
                                    <>
                                        <Text mt={5} mb={2}>
                                            Selecione a quantidade de inimigos que irão aparecer.
                                        </Text>
                                        <HStack >
                                            <Button {...dec}>-</Button>
                                            <Input {...input} textAlign=''/>
                                            <Button {...inc}>+</Button>
                                        </HStack>
                                        <Text mt={5} mb={2}>
                                            Agora selecione quais inimigos irão aparecer.
                                        </Text>
                                    {contarAteNumero(parseInt(input.value)).map((item,index)=>(
                                        <Select 
                                            key={index}
                                            placeholder='Escolha o inimigo que aparecerá'
                                            value={enemyArr[index]}
                                            onChange={(e)=>{
                                                const newArr = [...enemyArr]
                                                newArr[index] = e.target.value
                                                setEnemyArr(newArr)
                                            }}
                                        >
                                            <option value={'ze'}>Zé da Manga</option>
                                            <option value={'sopa'}>Sopa pra nois</option>
                                            <option value={'romario'}>Romario</option>
                                        </Select>
                                    ))}
                                    </>
                                }
                                {(explorationPointType === "individual-challange" || explorationPointType === "group-challange" )&&
                                    <>
                                        <Flex direction="row" align='center'>
                                            <NumberInput defaultValue={1} min={1} step={1}
                                                value={diceAmount} onChange={(e)=>setDiceAmount(e)} 
                                                w={50} mr={3}
                                            >
                                                <NumberInputField textAlign='center' pl={0} pr={0}/>
                                            </NumberInput>
                                            <Text>Quantidade de Dados</Text>
                                        </Flex>
                                        <Flex direction="row" align='center'>
                                            <NumberInput defaultValue={1} min={1} step={1} max={6}
                                                value={diceMinimumValue} onChange={(e)=>setDiceMinimumValue(e)}
                                                w={50} mr={3}
                                            >
                                                <NumberInputField textAlign='center' pl={0} pr={0}/>
                                            </NumberInput>
                                            <Text>Valor Mínimo para o Sucesso</Text>
                                        </Flex>
                                        <Flex direction="row" align='center'>
                                            <NumberInput defaultValue={1} min={1} step={1} max={diceAmount}
                                                value={diceSuccessAmout} onChange={(e)=>setDiceSuccessAmout(e)}
                                                w={50} mr={3}
                                            >
                                                <NumberInputField textAlign='center' pl={0} pr={0}/>
                                            </NumberInput>
                                            <Text>Quantidade de Dados com Valor Mínimo para Suceso</Text>
                                        </Flex>
                                    </>
                                }
                                        <Text mt={5} mb={2}>
                                            Agora adicione o texto de sucesso do seu ponto de exploração.
                                        </Text>
                                        <Textarea placeholder='Insira aqui o texto de sucesso' value={successText}
                                            onChange={(e)=> setSuccessText(e.target.value)} height={200} w={400}/>
                                        <Text mt={1} fontSize={11}>
                                            *Caso não exista texto de sucesso, ele será pulado ao criar o pdf do livro.
                                        </Text>
                                        <Text mt={5} mb={2}>
                                            Agora adicione o texto de falha do seu ponto de exploração.
                                        </Text>
                                        <Textarea placeholder='Insira aqui o texto de falha' value={failText}
                                            onChange={(e)=> setFailText(e.target.value)} height={200} w={400}/>
                                        <Text mt={1} fontSize={11}>
                                            *Caso não exista texto de falha, ele será pulado ao criar o pdf do livro.
                                        </Text>

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

