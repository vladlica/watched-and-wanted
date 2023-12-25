import styled from "styled-components";
import Label from "./Label";
import { Controller } from "react-hook-form";

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
`;

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
