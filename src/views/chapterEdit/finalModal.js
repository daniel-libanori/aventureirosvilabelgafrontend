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

export function FinalModal({ isOpen, onOpen, onClose, chapterData }) {
  const [final, setFinal] = useState(chapterData.final);
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();

  const onCreatePress = async () => {
    const res = await updateChapter(
      chapterId,
      chapterData.name,
      chapterData.introduction,
      bookId,
      chapterData.mapId,
      final
    );
    await navigate(0);
    onClose();
  };

  useLayoutEffect(() => {
    setFinal(chapterData.final);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Fim do Capítulo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={5}>
            Agora adicione o texto que aparecerá após a conclusão do seu
            capítulo.
          </Text>
          <Textarea
            placeholder="Insira aqui o final do seu capítulo..."
            value={final}
            onChange={(e) => setFinal(e.target.value)}
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
