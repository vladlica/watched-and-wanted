import React, { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

function AddButton({ form, type }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <Button $variation="primary" onClick={() => setIsModalOpen(true)}>
        Add {type}
      </Button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {React.cloneElement(form, {
            onClose: () => closeModal(),
          })}
        </Modal>
      )}
    </div>
  );
}

export default AddButton;
