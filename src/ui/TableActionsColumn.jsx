import {
  HiOutlineEye,
  HiOutlineMinusCircle,
  HiOutlinePencil,
  HiOutlinePlusCircle,
  HiOutlineTrash,
} from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";

function TableActionsColumn({
  type,
  isConsumed,
  consumeType,
  toggleOnClick,
  viewOnClick,
  editOnClick,
  editModal,
  deleteOnClick,
  deleteModal,
  disabled,
}) {
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
        onClick={viewOnClick}
        disabled={disabled}
      >
        <HiOutlineEye />
      </ButtonIcon>

      <ButtonIcon
        title={`Edit ${type}`}
        $place="table"
        onClick={editOnClick}
        disabled={disabled}
      >
        <HiOutlinePencil />
      </ButtonIcon>
      {editModal}

      <ButtonIcon
        title={`Delete ${type}`}
        $place="table"
        onClick={deleteOnClick}
        disabled={disabled}
      >
        <HiOutlineTrash />
      </ButtonIcon>
      {deleteModal}
    </div>
  );
}

export default TableActionsColumn;
