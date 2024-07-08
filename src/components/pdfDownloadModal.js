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
import { useNavigate, useParams } from "react-router-dom";

export function PdfDownloadModalModal({ isOpen, onOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          Obrigado por Baixar o PDF do Livro
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text textAlign="center">
            Por favor avalie como foi a sua experiência com a plataforma. Isso
            irá nos ajudar a melhorar cada vez mais. E nos ajudará a avaliar o
            projeto.
          </Text>
        </ModalBody>

        <ModalFooter display="flex" justifyContent="center">
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() =>
              window.open("https://forms.gle/fSZ44LYcEzZptc5T6", "_blank")
            }
          >
            Clique aqui para avaliar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
