import { Card, Flex, Icon, Text } from '@chakra-ui/react'
import {
    useDisclosure
} from '@chakra-ui/react'
import { IntroductionModal } from './introductionModal';
import { useLayoutEffect, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddExplorationPointModal } from './addExplorationPointModal';
import { getChapter } from '../../api/chapterAPI';
import { getMap } from '../../api/mapAPI'
import { deleteExplorationPoint, getChapterExplorationPoints } from '../../api/explorationPointAPI';
import {DeleteIcon, QuestionOutlineIcon} from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
import Background from '../../components/background';
import Header from '../../components/header';
import styled from 'styled-components';
import { BsBook } from 'react-icons/bs';
import { HelpModal } from '../../components/helpModal';
import { AiOutlineAlignLeft } from "react-icons/ai";


export function ChapterEdit() { 
    const { isOpen, onOpen, onClose } = useDisclosure() //IntroductionModal
    const { isOpen: isOpenExpPoint, onOpen: onOpenExpPoint , onClose: onCloseExpPoint } = useDisclosure()
    const { isOpen: isOpenHelp, onOpen: onOpenHelp, onClose: onCloseHelp } = useDisclosure()

    const [helpDataKey, setHelpDataKey] = useState("")
    const { chapterId } = useParams()
    const navigate = useNavigate()

    const [chapterData, setChapterData] = useState({})
    const [mapData, setMapData] = useState({})
    const [linhasMap, setLinhasMap] = useState(1);
    const [colunasMap, setColunasMap] = useState(1);
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const [expPointArr, setExpPointArr] = useState([]);
    const [selectedSquare, setSelectedSquare] = useState(0)
    
    const [selectedExplorationPoint, setSelectedExplorationPoint] = useState({})
    const [updateOrAddExpPointModalType, setUpdateOrAddExpPointModalType] = useState("add") //add or update

    useLayoutEffect(()=>{
        getData()
    },[ ])

    useEffect(()=>{
        if(!!mapData?.mapImagebase64){
            const img = new Image();
            img.src = mapData?.mapImagebase64
        
            img.onload = () => {
                setImageWidth(img.width);
                setImageHeight(img.height);
            };
        }
    },[mapData?.mapImagebase64])

    const getData = async () => {
        const chps = await getChapter(chapterId)
        const mps = await getMap(chps.data.mapId)
        const expPts = await getChapterExplorationPoints(chapterId, "position")

        const newExpPtsArr = []
        await Object.keys(expPts.data).forEach(key => {
            const newKey = convertKeyToPosition(key,mps.data.xMapSize)
            const newObj = {}
            newObj[newKey] = expPts.data[key]
            newExpPtsArr.push(newObj)
        });

        await setExpPointArr(newExpPtsArr)
        await setChapterData(chps.data)
        await setMapData(mps.data)
        
        await setLinhasMap(mps.data.yMapSize)
        await setColunasMap(mps.data.xMapSize)
    }

    function convertKeyToPosition(key, numColumns) {
        const [x, y] = key.split('-').map(Number);
        return (y - 1) * numColumns + x;
    }

    function contarAteNumero(numero) {
        if(numero==0) return [1]

        const resultado = [];
        for (let i = 1; i <= numero; i++) {
            resultado.push(i);
        }
        return resultado;
    }
    function contarLetrasAteNumero(numero) {
        const resultado = [];
        const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        for (let i = 1; i <= numero; i++) {
          let atual = i - 1;
          let contagem = '';
          
          do {
            contagem = alfabeto[atual % 26] + contagem;
            atual = Math.floor(atual / 26) - 1;
          } while (atual >= 0);
          
          resultado.push(contagem);
        }
        
        return resultado;
    }

    const numeroParaLetra = (numero)=> {
        if (numero >= 1 && numero <= 26) {
            return String.fromCharCode(64 + numero);
        } else {
            return 0
        }
    }

    const handleSelectExplorationPointToOpenUpdateModal = (explorationPoint) => {
        setUpdateOrAddExpPointModalType("update")
        setSelectedExplorationPoint(explorationPoint)
        onOpenExpPoint()
    }

    const onDeletePress = async (expPoint) => {
        const res = await deleteExplorationPoint(expPoint.id)
        navigate(0)   
    }

    return (
        <Background>
            <Header/>

            {isOpen && <IntroductionModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} chapterData={chapterData}/>}
            {isOpenExpPoint &&
                <AddExplorationPointModal 
                    x={selectedSquare%colunasMap !== 0 ? selectedSquare%colunasMap : colunasMap} 
                    y={Math.ceil(selectedSquare/colunasMap)} expPointArr={expPointArr}
                    isOpen={isOpenExpPoint} onOpen={onOpenExpPoint} 
                    onClose={()=>{
                        setUpdateOrAddExpPointModalType("add")
                        setSelectedExplorationPoint({})
                        onCloseExpPoint()
                    }} 
                    type={updateOrAddExpPointModalType}
                    selectedExplorationPoint={selectedExplorationPoint}
                    />
            }
            <HelpModal isOpen={isOpenHelp} onOpen={onOpenHelp} onClose={onCloseHelp} helpDataKey={helpDataKey}/>

            {/* <Flex bg={'white'} pos="fixed" bottom={0} direction="column" zIndex={10}
                  right={0} w={320} h={170} borderTopLeftRadius={50} p={7}>
                <Text fontSize='3xl'>Posição selecionada</Text>
                <Text fontSize='5xl'>
                    {selectedSquare !== 0 ?
                        numeroParaLetra((selectedSquare%colunasMap !== 0 ? selectedSquare%colunasMap : colunasMap))
                        +
                        (Math.ceil(selectedSquare/colunasMap)) :
                        "--"
                    }
                    
                    
                </Text>
            </Flex> */}

            <Card mb={[, , , 100, 300]} 
                boxShadow="0px 5px 10px rgba(0, 0, 0, 0.5)"
                w={[,,,"90vw","60vw"]} position={"absolute"} top={[,,,100,100]}>
                <Flex direction='column' align="center" justify='space-evenly' h="100%" p={50}>
                    <Flex w="100%">
                        <Text fontSize='5xl'>{chapterData.name} - Edição de Pontos de Exploração</Text>
                    </Flex>
                    
                    <Flex direction="column" w="100%" justify="center">

                        
                        <CreateUpdateIntroductionButton onClick={onOpen}>
                            <QuestionOutlineIcon cursor="pointer" 
                                position="absolute" 
                                boxSize={5} top={3} right={3} 
                                onClick={(e)=>{
                                    e.stopPropagation()
                                    setHelpDataKey("newBook")
                                    onOpenHelp()
                                }}/>

                            <Icon as={AiOutlineAlignLeft} mr={5}/>
                            <Text>Adicionar/Editar Introdução do Capítulo</Text>
                            
                        </CreateUpdateIntroductionButton>

                        <Flex direction="row">
                           
                            <Flex direction="column">
                                <Flex position="relative">
                                    
                                    {contarAteNumero(linhasMap).map(num=>(
                                        <Flex pos="absolute" key={num} zIndex={3} h={imageHeight/linhasMap} display="flex" align="center" left={-6} top={(num-1)*(imageHeight/linhasMap)}>
                                            <Text fontSize={30} fontWeight="700">{num}</Text >
                                        </Flex>))}
                                    <Flex h={imageHeight} w={imageWidth} wrap="wrap" zIndex={2}>
                                        {contarAteNumero(linhasMap*colunasMap).map((num)=>(
                                            <Flex h={imageHeight/linhasMap} w={imageWidth/colunasMap} border="2px solid red"  bgColor={selectedSquare==num ? 'rgba(255,255,0,0.5)' : null}
                                                zIndex={2} align="center" justify="center" key={num} onClick={()=>{num!== selectedSquare ? setSelectedSquare(num) : setSelectedSquare(0)}}
                                            >
                                                { expPointArr?.some(elm => num in elm) &&
                                                    <Flex h={(imageHeight/linhasMap)*0.5} w={(imageWidth/colunasMap)*0.5} bgColor={selectedSquare==num ? "rgba(255,0,0,0.7)" : "rgba(255,255,0,0.7)" }
                                                        borderRadius={100} display="flex" align="center" justify="center">
                                                            <Text fontWeight={500}>
                                                                {expPointArr[expPointArr.map(e=>(parseInt(Object.keys(e)[0]))).indexOf(num)][num].length}
                                                            </Text>
                                                    </Flex>
                                                }
                                            </Flex>
                                        ))}
                                    </Flex>
                                    <img style={{zIndex: 1, position:'absolute'}}
                                        src={mapData.mapImagebase64}/>
                                </Flex>
                                <Flex>
                                    {contarLetrasAteNumero(colunasMap).map(e=>(
                                        <Flex key={e} w={imageWidth/colunasMap} h={10} justify="center" align="center" zIndex={3}>
                                            <Text fontSize={30} fontWeight="700">{e}</Text>
                                        </Flex>
                                    ))} 
                                </Flex>
                            </Flex>

                            

                        </Flex>

                        <Flex  h={600} direction="column" border="1px solid black" m={5} mb={10} overflow={"auto"}> 
                            {!!selectedSquare && expPointArr?.some(elm => selectedSquare in elm)  &&
                             expPointArr[expPointArr.map(e=>(parseInt(Object.keys(e)[0]))).indexOf(selectedSquare)][selectedSquare].map(e=>(
                                <Flex key={e.id} border="1px solid black" 
                                    borderRadius={10} m={5} onClick={()=>handleSelectExplorationPointToOpenUpdateModal(e)}
                                    direction="row" align="center" justify="space-between">
                                    <Text fontSize={25} p={5}>{e.name}</Text>
                                    <DeleteIcon boxSize={8} mr={5} onClick={(event)=>{event.stopPropagation(); onDeletePress(e)}} zIndex={10}/>
                                </Flex>
                            ))}


                            { !!selectedSquare &&
                                <Flex border="1px dashed black" onClick={onOpenExpPoint}
                                    borderRadius={10} m={5} bgColor="rgba(0,255,0,0.2)">
                                    <Text fontSize={25} p={5}>Adicionar Novo Ponto de Exploração</Text>
                                </Flex>
                            }
                            {!selectedSquare &&
                                <Text>Selecione um ponto do mapa</Text>
                            }
                        </Flex>
                    </Flex>

                </Flex>
            </Card>
        </Background>
    );


}

const CreateUpdateIntroductionButton = styled(Flex)`
    padding: 20px ;
    border-radius: 20px;
    background-color: rgba(99, 224, 111,1);
    cursor: pointer;
    border: 5px dashed #3fb54b;
    align-items: center;
    flex-direction: row;
    color: white;
    font-size: 30px;
    line-height: 32px;
    font-weight: 500;
    margin-right: 20px;
    margin-bottom: 30px;
    position: relative;
`;