import { useState } from "react";
import DeleteAccountForm from "./DeleteAccountForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

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
