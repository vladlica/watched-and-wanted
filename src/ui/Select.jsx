import styled from "styled-components";

const StyledSelect = styled.select`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-400);
  padding: 0.6rem 1.2rem;
  border-radius: 15px;
  box-shadow: var(--shadow-sm);
  width: 100%;
  text-transform: capitalize;

  &:focus {
    outline: 2px solid var(--color-orange-600);
    outline-offset: -2px;
  }
`;

const Option = styled.option`
  text-transform: capitalize;
`;

// Props:
// - id: String- Unique identifier for the select element
// - options: Object - An array of options to be displayed in the select element
// - register: Object - Function to register inputs provided by react-hook-form library
function Select({ id, options, register }) {
  return (
    <StyledSelect id={id} {...register(id)}>
      {options.map((option, index) => (
        <Option value={option} key={index}>
          {option}
        </Option>
      ))}
    </StyledSelect>
  );
}

export default Select;
