import styled from "styled-components";
import Button from "./Button";

const StyledConfirmDelete = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
`;

// Props:
// - type: String - Type of item being deleted (e.g., "book", "movie", etc.)
// - onClose: Object - Function to handle closing the confirmation dialog
// - onConfirmDelete: Object - Function to handle the deletion of the item
// - disabled: Boolean - Indicating whether the buttons are disabled
function ConfirmDelete({ type, onClose, onConfirmDelete, disabled }) {
  return (
    <StyledConfirmDelete>
      <h1>Delete {type}</h1>
      <p>
        Are you sure you want to delete this {type} permanently? This action
        cannot be undone.
      </p>
      <div>
        <Button
          $variation="danger"
          onClick={onConfirmDelete}
          disabled={disabled}
        >
          Delete
        </Button>
        <Button $variation="secondary" onClick={onClose} disabled={disabled}>
          Cancel
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
