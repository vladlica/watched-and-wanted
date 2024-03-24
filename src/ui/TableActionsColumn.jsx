import {
  HiOutlineEye,
  HiOutlineMinusCircle,
  HiOutlinePencil,
  HiOutlinePlusCircle,
  HiOutlineTrash,
} from "react-icons/hi2";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";
import Modal from "./Modal";

// Props:
// - type: String - Type of item (e.g., "book", "movie", etc.)
// - isConsumed: Boolean - Indicating if the content is consumed
// - consumeType: String - Type of consumption action (e.g., "watched", "read")
// - toggleOnClick: Object - Function to toggle consumption status
// - viewPath: String - Path to view details about the item
// - contentEditModal: JSX.Element - Modal content for editing the item
// - contentDeleteModal: JSX.Element - Modal content for deleting the item
// - disabled: Boolean - Indicating if the buttons are disabled
function TableActionsColumn({
  type,
  isConsumed,
  consumeType,
  toggleOnClick,
  viewPath,
  contentEditModal,
  contentDeleteModal,
  disabled,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <ButtonIcon
        title={`Mark ${type} as ${isConsumed ? "wanted" : consumeType}`}
        $place="table"
        onClick={toggleOnClick}
        disabled={disabled}
      >
        {isConsumed ? <HiOutlineMinusCircle /> : <HiOutlinePlusCircle />}
      </ButtonIcon>

      <ButtonIcon
        title={`View details about the ${type}`}
        $place="table"
        onClick={() => navigate(viewPath)}
        disabled={disabled}
      >
        <HiOutlineEye />
      </ButtonIcon>

      <ButtonIcon
        title={`Edit ${type}`}
        $place="table"
        onClick={() => setIsEditModalOpen(true)}
        disabled={disabled}
      >
        <HiOutlinePencil />
      </ButtonIcon>
      {isEditModalOpen && (
        <Modal onClose={() => setIsEditModalOpen(false)}>
          {/* Clone the contentEditModal for passing the function that allows closing the modal as a prop */}
          {React.cloneElement(contentEditModal, {
            onClose: () => setIsEditModalOpen(false),
          })}
        </Modal>
      )}

      <ButtonIcon
        title={`Delete ${type}`}
        $place="table"
        onClick={() => setIsDeleteModalOpen(true)}
        disabled={disabled}
      >
        <HiOutlineTrash />
      </ButtonIcon>
      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          {/* Clone the contentDeleteModal element to pass the function that allows closing the modal and the type of the item as props */}
          {React.cloneElement(contentDeleteModal, {
            onClose: () => setIsDeleteModalOpen(false),
            type,
          })}
        </Modal>
      )}
    </div>
  );
}

export default TableActionsColumn;
