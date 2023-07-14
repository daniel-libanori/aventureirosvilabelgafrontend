import { Card, Flex, Image, Text } from '@chakra-ui/react'
import {
    useDisclosure
} from '@chakra-ui/react'
import { IntroductionModal } from './introductionModal';
import { useContext, useLayoutEffect, useState } from 'react';
import { GlobalContext } from '../../context/globalState';
import { useParams } from 'react-router-dom';
import { returnMissingNumberOrNext } from '../../utils/arrFunctions';
import { AddExplorationPointModal } from './addExplorationPointModal';

const mapMatrixInit = [
    [{x:0, y:0, points:[]},{x:0, y:1, points:[]},{x:0, y:2, points:[]},{x:0, y:3, points:[]},{x:0, y:4, points:[]}],
    [{x:1, y:0, points:[]},{x:1, y:1, points:[]},{x:1, y:2, points:[]},{x:1, y:3, points:[]},{x:1, y:4, points:[]}],
    [{x:2, y:0, points:[]},{x:2, y:1, points:[]},{x:2, y:2, points:[]},{x:2, y:3, points:[]},{x:2, y:4, points:[]}],
    [{x:3, y:0, points:[]},{x:3, y:1, points:[]},{x:3, y:2, points:[]},{x:3, y:3, points:[]},{x:3, y:4, points:[]}],
    [{x:4, y:0, points:[]},{x:4, y:1, points:[]},{x:4, y:2, points:[]},{x:4, y:3, points:[]},{x:4, y:4, points:[]}],
]

export function ChapterEdit() { 
    const { isOpen, onOpen, onClose } = useDisclosure() //IntroductionModal
    const { isOpen: isOpenExpPoint, onOpen: onOpenExpPoint , onClose: onCloseExpPoint } = useDisclosure() //IntroductionModal
    const [ mapMatrix, setMapMatrix ] = useState(mapMatrixInit)
    const { bookId, chapterId } = useParams()
    const [ selectedMapPart, setSelectedMapPart ] = useState()
    const { getExplorationPoints,globalState } = useContext(GlobalContext)
    const bookIndex = globalState.books.map(e=>e.id).indexOf(parseInt(bookId))


    useLayoutEffect(()=>{
        setMapMatrix(getExplorationPoints(bookId, chapterId))
    },[ globalState.books[bookIndex]?.chapters.length,
        globalState.books[bookIndex]?.chapters[chapterId]?.exploration_points.length])


    return (
        <Flex style={{ width: "100vw", minHeight: "100vh" }} alignItems="center" justify={'center'} backgroundColor="#384ba1">

            <IntroductionModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            <AddExplorationPointModal isOpen={isOpenExpPoint} onOpen={onOpenExpPoint} onClose={onCloseExpPoint} />

            <Card w="80%" h="90%" mt="5vh" mb="5vh">
                <Flex direction='column' align="center" justify='space-evenly' h="100%">
                    <Text fontSize='8xl'>Chapter Edit</Text>
                    <Flex direction="column" w="100%">

                        <Card onClick={onOpen}
                            w="98%" h="150px" bg='#FBFBFF' flex align='center' direction='row' mb='15px' ml='15px' backgroundColor="green">
                            <Flex direction='column' ml='15px'>
                                <Text fontSize='3xl'>Add/Edit Introduction</Text>
                            </Flex>
                        </Card>


                        <Flex direction="row">
                            <Flex direction="column" mt={5}>
                                {[1,2,3,4,5].map(e=>(
                                    <Flex key={e} w={10} h={119} justify="flex-end"  align="center">
                                        <Text fontSize={30} fontWeight="700" >{e}</Text>
                                    </Flex>
                                ))}
                            </Flex>
                            
                            <Flex direction="column">
                                <Flex position="relative">
                                    <Flex h={600} w={600} m={5} wrap="wrap" zIndex={2}>
                                        { mapMatrix?.map((row, rowIdx) => row?.map((item, columnIdx) =>(
                                            <Flex h={119} w={119} border="1px solid black" key={`${rowIdx}${columnIdx}`} 
                                                zIndex={2} align="center" justify="center"
                                                bgColor={selectedMapPart?.x === rowIdx && selectedMapPart?.y === columnIdx ?
                                                            "rgba(255,255,0,0.4)": null}
                                                onClick={()=>setSelectedMapPart({x:rowIdx,y:columnIdx})}
                                            >
                                                { item?.points?.length > 0 &&
                                                    <Flex bg="rgba(255,0,0,0.7)" w={16} h={16} justify="center" align="center" borderRadius={40}>
                                                        <Text fontSize={40} textAlign="center">{item?.points?.length}</Text>
                                                    </Flex>
                                                }
                                            </Flex>
                                        )))



                                        }
                                    </Flex>
                                    <Image zIndex={1} 
                                        src='https://dicegrimorium.com/wp-content/uploads/2022/09/ForestGatesVol2Thumb.jpg' 
                                        position="absolute" w={600} h={600} m={5}/>
                                </Flex>
                                <Flex mt={-5} ml={5}>
                                    {["A","B","C","D","E"].map(e=>(
                                        <Flex key={e} w={119} h={10} justify="center" align="center" >
                                            <Text fontSize={30} fontWeight="700" >{e}</Text>
                                        </Flex>
                                    ))} 
                                </Flex>
                            </Flex>

                            <Flex w={600} h={600} direction="column" border="1px solid black" m={5} mb={10} overflow={"auto"}> 
                                {!!selectedMapPart && mapMatrix[selectedMapPart.x][selectedMapPart.y].points?.map(e=>(
                                    <Flex key={e.id} border="1px solid black" borderRadius={10} m={5}>
                                        <Text fontSize={25} p={5}>{e.name}</Text>
                                    </Flex>
                                ))}
                                <Flex border="1px dashed black" onClick={onOpenExpPoint}
                                    borderRadius={10} m={5} bgColor="rgba(0,255,0,0.2)">
                                    <Text fontSize={25} p={5}>Add New Exploration Point</Text>
                                </Flex>

                            </Flex>

                        </Flex>

                    </Flex>

                </Flex>
            </Card>
        </Flex>
    );
}

