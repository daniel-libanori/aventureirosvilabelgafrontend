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
import { updateBook } from "../../api/bookAPI";

export function BookIntroductionModal({ isOpen, onOpen, onClose, book }) {
  const [introduction, setIntroduction] = useState(book.bookIntro);
  const navigate = useNavigate();

  const onCreatePress = async () => {
    const res = await updateBook(
      book.id,
      book.name,
      introduction,
      book.bookFinal
    );
    await navigate(0);
    onClose();
  };

  useLayoutEffect(() => {
    setIntroduction(book.bookIntro);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Prólogo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
