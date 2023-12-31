import {
  HiOutlineEye,
  HiOutlineMinusCircle,
  HiOutlinePencil,
  HiOutlinePlusCircle,
  HiOutlineTrash,
} from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import React, { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

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
