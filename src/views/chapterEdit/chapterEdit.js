import { Button, Card, Flex, Text } from '@chakra-ui/react'
import {
    useDisclosure
} from '@chakra-ui/react'
import { IntroductionModal } from './introductionModal';
import { useContext, useLayoutEffect, useState, useEffect } from 'react';
import { GlobalContext } from '../../context/globalState';
import { useParams } from 'react-router-dom';
import { AddExplorationPointModal } from './addExplorationPointModal';
import { getChapter } from '../../api/chapterAPI';
import { getMap } from '../../api/mapAPI'
import { createNewExplorationPoint, getChapterExplorationPoints } from '../../api/explorationPointAPI';



export function ChapterEdit() { 
    const { isOpen, onOpen, onClose } = useDisclosure() //IntroductionModal
    const { isOpen: isOpenExpPoint, onOpen: onOpenExpPoint , onClose: onCloseExpPoint } = useDisclosure() //IntroductionModal
    // const [ mapMatrix, setMapMatrix ] = useState(mapMatrixInit)
    const { bookId, chapterId } = useParams()
    const [ selectedMapPart, setSelectedMapPart ] = useState()
    const { globalState } = useContext(GlobalContext)
    const bookIndex = globalState.books.map(e=>e.id).indexOf(parseInt(bookId))

    const [chapterData, setChapterData] = useState({})
    const [mapData, setMapData] = useState({})
    const [linhasMap, setLinhasMap] = useState(1);
    const [colunasMap, setColunasMap] = useState(1);
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const [expPointArr, setExpPointArr] = useState([]);
    const [selectedSquare, setSelectedSquare] = useState(0)

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

    return (
        <Flex style={{ width: "100vw", minHeight: "100vh" }} alignItems="center" justify={'center'} backgroundColor="#384ba1">
            {isOpen && <IntroductionModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} chapterData={chapterData}/>}
            {/* <AddExplorationPointModal x={selectedMapPart?.x} y={selectedMapPart?.y}
                isOpen={isOpenExpPoint} onOpen={onOpenExpPoint} onClose={onCloseExpPoint} /> */}

            <Flex bg={'white'} pos="fixed" bottom={0} direction="column" zIndex={1}
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
            </Flex>

            <Card minH={imageHeight + 1000} mt="5vh" mb="5vh">
                <Flex direction='column' align="center" justify='space-evenly' h="100%" p={50}>
                    <Text fontSize='8xl'>{chapterData.name} - Edição</Text>
                    <Flex direction="column" w="100%" justify="center">

                        <Card onClick={onOpen}
                            h="150px" bg='#FBFBFF' flex align='center' direction='row' mb='15px' backgroundColor="green">
                            <Flex direction='column' ml='15px'>
                                <Text fontSize='3xl'>Add/Edit Introduction</Text>
                            </Flex>
                        </Card>


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
                            {!!selectedSquare && expPointArr[expPointArr.map(e=>(parseInt(Object.keys(e)[0]))).indexOf(selectedSquare)][selectedSquare].map(e=>(
                                <Flex key={e.id} border="1px solid black" borderRadius={10} m={5}>
                                    <Text fontSize={25} p={5}>{e.name}</Text>
                                </Flex>
                            ))}


                            { !!selectedSquare &&
                                <Flex border="1px dashed black" onClick={onOpenExpPoint}
                                    borderRadius={10} m={5} bgColor="rgba(0,255,0,0.2)">
                                    <Text fontSize={25} p={5}>Add New Exploration Point</Text>
                                </Flex>
                            }
                            {!selectedSquare &&
                                <Text>Selecione um ponto do mapa</Text>
                            }
                        </Flex>
                    </Flex>

                </Flex>
            </Card>
        </Flex>
    );


}

