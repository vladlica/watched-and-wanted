import React, { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

// Props:
// - form: JSX.Element - The form component to be rendered inside the modal
// - type: String - The type of item being added (e.g., "book", "movie", etc.)
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
          {/* Cloning the form so the "closeModal" function can be passed as a prop  */}
          {React.cloneElement(form, {
            onClose: closeModal,
          })}
        </Modal>
      )}
    </div>
  );
}

export default AddButton;
