import styled from "styled-components";

const StyledSelect = styled.select`
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

function Select({ id, options, register }) {
  return (
    <StyledSelect id={id} {...register}>
      {options.map((option, index) => (
        <Option value={option} key={index}>
          {option}
        </Option>
      ))}
    </StyledSelect>
  );
}

export default Select;
