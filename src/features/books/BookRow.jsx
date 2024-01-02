import Table from "../../ui/Table";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBook } from "./useDeleteBook";
import { useToggleBookStatus } from "./useToggleBookStatus";
import { format } from "date-fns";
import Tag from "../../ui/Tag";
import CreateEditBookForm from "./CreateEditBookForm";
import TableActionsColumn from "../../ui/TableActionsColumn";
import { statusToTagColor } from "../../utils/constants";

function BookRow({ book }) {
  const { isDeleting, deleteBook } = useDeleteBook();
  const { isToggling, toggleStatus } = useToggleBookStatus();

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

      <TableActionsColumn
        type="book"
        isConsumed={isRead}
        consumeType="read"
        toggleOnClick={() =>
          toggleStatus({
            id: book.id,
            obj: { status: isRead ? "wanted" : "read" },
          })
        }
        viewPath={`/books/${book.id}`}
        contentEditModal={<CreateEditBookForm book={book} />}
        contentDeleteModal={
          <ConfirmDelete
            onConfirmDelete={() => deleteBook(book.id)}
            disabled={isDeleting}
          />
        }
        disabled={isToggling || isDeleting}
      />
    </Table.Row>
  );
}

export default BookRow;
