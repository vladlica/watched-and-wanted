import styled from "styled-components";
import Tag from "../../ui/Tag";
import { format } from "date-fns";
import Button from "../../ui/Button";
import CreateEditBookForm from "./CreateEditBookForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteBook } from "./useDeleteBook";

const HeaderDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TagsList = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ButtonsList = styled.div`
  display: flex;
  gap: 1rem;
`;

function BookDetailsHeader({ book }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isDeleting, deleteBook } = useDeleteBook();

  const statusToTagColor = {
    read: "green",
    wanted: "silver",
  };

  return (
    <>
      <HeaderDetails>
        <TagsList>
          <Tag color={`${statusToTagColor[book.status]}`}>{book.status}</Tag>
          <Tag color="blue">{book.author}</Tag>
          {book.series && <Tag color="orange">{book.series} Series</Tag>}
          {book.finishDate && (
            <Tag color="indigo">
              Finished in {format(new Date(book.finishDate), "yyyy")}
            </Tag>
          )}
          {book.isLongestBook && book.finishDate && (
            <Tag color="yellow">
              Longest book of {format(new Date(book.finishDate), "yyyy")}
            </Tag>
          )}
          {book.isShortestBook && book.finishDate && (
            <Tag color="yellow">
              Shortest book of {format(new Date(book.finishDate), "yyyy")}
            </Tag>
          )}
          {book.numDays && <Tag color="red">Read in {book.numDays} days</Tag>}
        </TagsList>

        <h1>{book.title}</h1>
        {book.series && <p>{book.series} Series</p>}
      </HeaderDetails>

      <ButtonsList>
        <Button
          $variation="primary"
          $size="small"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit book
        </Button>
        {isEditModalOpen && (
          <Modal onClose={() => setIsEditModalOpen(false)}>
            <CreateEditBookForm
              book={book}
              onClose={() => setIsEditModalOpen(false)}
            />
          </Modal>
        )}
        <Button
          $variation="danger"
          $size="small"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete book
        </Button>
        {isDeleteModalOpen && (
          <Modal onClose={() => setIsDeleteModalOpen(false)}>
            <ConfirmDelete
              type="book"
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirmDelete={() =>
                deleteBook(book.id, {
                  onSettled: () => navigate("/books", { replace: true }),
                })
              }
              disabled={isDeleting}
            />
          </Modal>
        )}
        <Button
          $variation="secondary"
          $size="small"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </ButtonsList>
    </>
  );
}

export default BookDetailsHeader;
