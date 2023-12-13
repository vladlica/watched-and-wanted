import Table from "../../ui/Table";
import ButtonIcon from "../../ui/ButtonIcon";
import {
  HiOutlineEye,
  HiOutlineMinusCircle,
  HiOutlinePencil,
  HiOutlinePlusCircle,
  HiOutlineTrash,
} from "react-icons/hi2";
import { useState } from "react";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBook } from "./useDeleteBook";
import { useToggleBookStatus } from "./useToggleBookStatus";
import { format } from "date-fns";
import Tag from "../../ui/Tag";
import CreateEditBookForm from "./CreateEditBookForm";
import { useNavigate } from "react-router-dom";

function BookRow({ book }) {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { isDeleting, deleteBook } = useDeleteBook();
  const { isToggling, toggleStatus } = useToggleBookStatus();

  const statusToTagColor = {
    read: "green",
    wanted: "silver",
  };

  const isRead = book.status === "read";

  return (
    <Table.Row>
      <div>{book.author}</div>
      <div>
        <p>{book.title}</p>
      </div>
      <div>{book.series || "-"}</div>
      <div>
        <Tag color={statusToTagColor[book.status]}>{book.status}</Tag>
      </div>
      <div>
        {book.finishDate && book.status === "read" ? (
          <Tag color={statusToTagColor[book.status]}>
            {format(new Date(book.finishDate), "dd MMM yyyy ")}
          </Tag>
        ) : (
          "-"
        )}
      </div>

      <div>
        <ButtonIcon
          title={`Mark book as ${isRead ? "wanted" : "read"}`}
          $place="table"
          onClick={() =>
            toggleStatus({
              id: book.id,
              obj: { status: isRead ? "wanted" : "read" },
            })
          }
          disabled={isToggling}
        >
          {isRead ? <HiOutlineMinusCircle /> : <HiOutlinePlusCircle />}
        </ButtonIcon>
        <ButtonIcon
          title="View details about the book"
          $place="table"
          disabled={isToggling}
          onClick={() => navigate(`/books/${book.id}`)}
        >
          <HiOutlineEye />
        </ButtonIcon>
        <ButtonIcon
          title="Edit book"
          $place="table"
          onClick={() => setIsEditModalOpen(true)}
          disabled={isToggling}
        >
          <HiOutlinePencil />
        </ButtonIcon>
        {isEditModalOpen && (
          <Modal onClose={() => setIsEditModalOpen(false)}>
            <CreateEditBookForm
              book={book}
              onClose={() => setIsEditModalOpen(false)}
            />
          </Modal>
        )}
        <ButtonIcon
          title="Delete book"
          $place="table"
          onClick={() => setIsDeleteModalOpen(true)}
          disabled={isToggling}
        >
          <HiOutlineTrash />
        </ButtonIcon>
        {isDeleteModalOpen && (
          <Modal onClose={() => setIsDeleteModalOpen(false)}>
            <ConfirmDelete
              type="book"
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirmDelete={() => deleteBook(book.id)}
              disabled={isDeleting}
            />
          </Modal>
        )}
      </div>
    </Table.Row>
  );
}

export default BookRow;
