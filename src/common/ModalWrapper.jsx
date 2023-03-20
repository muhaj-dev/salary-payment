import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";

const ModalWrapper = ({ children, isOpen, onOpen, onClose, size }) => {

  return (
    <Modal isOpen={isOpen} size={size} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody  >
         {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalWrapper;
