import { Text, Button, Input, Textarea } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useContext, useLayoutEffect, useState } from "react";
import { GlobalContext } from "../../context/globalState";
import { useNavigate, useParams } from "react-router-dom";
import { updateChapter } from "../../api/chapterAPI";

export function IntroductionModal({ isOpen, onOpen, onClose, chapterData }) {
  const [introduction, setIntroduction] = useState(chapterData.introduction);
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();

  const onCreatePress = async () => {
    const res = await updateChapter(
      chapterId,
      introduction,
      bookId,
      chapterData.mapId
    );
    await navigate(0);
    onClose();
  };

  useLayoutEffect(() => {
    setIntroduction(chapterData.introduction);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Capítulo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={5} fontStyle="italic" fontWeight={300}>
            A introdução será o texto que irá aparecer logo ao iniciar o seu
            capítulo, nela você pode escrever falando sobre o inicio do capítulo
            e sobre o que aconteceu quando os personagens chegaram no local do
            mapa desse capítulo, por exemplo.
          </Text>
          <Text mb={5}>Adicione o texto de introdução do seu capítulo.</Text>
          <Textarea
            placeholder="Insira aqui a introdução do seu capítulo..."
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            height={400}
          />
        </ModalBody>

        <ModalFooter mt={10} display="flex" justifyContent="flex-end">
          <Button colorScheme="blue" mr={3} onClick={onCreatePress}>
            Finalizar Edição
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
