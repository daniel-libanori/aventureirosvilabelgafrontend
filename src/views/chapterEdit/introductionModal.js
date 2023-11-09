import { Text, Button, Input, Textarea } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useContext, useLayoutEffect, useState } from 'react';
import { GlobalContext } from '../../context/globalState';
import { useNavigate, useParams } from 'react-router-dom';
import { updateChapter } from '../../api/chapterAPI';


export function IntroductionModal({ isOpen, onOpen, onClose, chapterData }) {

    const [introduction, setIntroduction] = useState(chapterData.introduction)
    const [chapterName, setChapterName] = useState("dsadasd")
    const { bookId, chapterId } = useParams()
    const navigate = useNavigate()

    const onCreatePress = async () => {   
        const res = await updateChapter(chapterId,chapterName, introduction, bookId, chapterData.mapId)
        await navigate(0)
        onClose()     
    }

    useLayoutEffect(()=>{
        setChapterName(chapterData.name)
        setIntroduction(chapterData.introduction)
    },[])

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editar Capítulo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text mb={5}>
                        Título do Capitulo
                    </Text>
                    <Input placeholder='Insira aqui a nome do seu capítulo...' value={chapterName}
                        onChange={(e)=> setChapterName(e.target.value)} />
                    <Text mb={5}>
                        Agora adicione o texto de introdução do seu capítulo.
                    </Text>
                    <Textarea placeholder='Insira aqui a introdução do seu capítulo...' value={introduction}
                        onChange={(e)=> setIntroduction(e.target.value)} height={400}/>
                </ModalBody>

                <ModalFooter mt={10} display='flex' justifyContent='flex-end'>

                <Button colorScheme='blue' mr={3} onClick={onCreatePress} isDisabled={chapterName == ""}>
                    Finalizar Edição
                </Button>
                   
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
}

