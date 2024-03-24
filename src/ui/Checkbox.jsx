import styled from "styled-components";
import { Controller } from "react-hook-form";
import Label from "./Label";

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  & input[type="checkbox"] {
    height: 2rem;
    width: 2rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-orange-600);
  }

  & input[type="checkbox"]:focus-visible {
    outline: 2px solid var(--color-orange-600);
    outline-offset: 2px;
  }
`;

// Props:
// - id: String - Unique identifier for the checkbox
// - label: String - Text label associated with the checkbox
// - control: Object - Form control object provided by react-hook-form library
// - disabled: Boolean - Indicating whether the checkbox is disabled
function Checkbox({ id, label, control, disabled }) {
  return (
    <CheckboxContainer>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <input
            type="checkbox"
            id={id}
            onChange={(e) => field.onChange(e.target.checked)}
            checked={field.value}
            disabled={disabled}
          />
        )}
      />
      <Label htmlFor={id}>{label}</Label>
    </CheckboxContainer>
  );
}

export default Checkbox;
