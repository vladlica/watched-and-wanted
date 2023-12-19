import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateEditSeriesForm from "./CreateEditSeriesForm";

function AddSeries() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <Button $variation="primary" onClick={() => setIsModalOpen(true)}>
        Add Series
      </Button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <CreateEditSeriesForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default AddSeries;
