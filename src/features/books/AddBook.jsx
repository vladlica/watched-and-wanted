import { useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateEditBookForm from "./CreateEditBookForm";

function AddBook() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <Button
        $variation="primary"
        onClick={() => setIsModalOpen((open) => !open)}
      >
        Add book
      </Button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <CreateEditBookForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default AddBook;
