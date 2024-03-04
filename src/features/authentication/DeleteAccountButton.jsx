import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import DeleteAccountForm from "./DeleteAccountForm";

function DeleteAccountButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <Button $variation="danger" onClick={() => setIsModalOpen(true)}>
        Delete account
      </Button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <DeleteAccountForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default DeleteAccountButton;
