import styled from "styled-components";
import { createContext, useContext } from "react";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  overflow: hidden;
`;

// Props:
// - $columns: String - Indicating the grid template columns for defining column widths
const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  font-weight: 600;
  background-color: var(--color-grey-100);
  padding: 0 1rem;
  text-align: center;

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledBody = styled.div`
  margin: 0.4rem 0;
  background-color: var(--color-grey-0);
`;

// Props:
// - $columns: String - Indicating the grid template columns for defining column widths
const StyledRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  padding: 0.5rem 0;
  background-color: var(--color-grey-0);

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-300);
  }
`;

const Footer = styled.div`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

// Props:
// - columns: String - Indicating the grid template columns for the table
// - children: ReactNode - Child elements to be rendered inside the table
function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

// Props:
// - children: ReactNode - Child elements to be rendered inside the header
function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" as="header" $columns={columns}>
      {children}
    </StyledHeader>
  );
}

// Props:
// - children: ReactNode - Child elements to be rendered inside the row
function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" $columns={columns}>
      {children}
    </StyledRow>
  );
}

// Props:
// - data: Object - Array of items to be rendered inside the body
// - render: Object - Callback function to render each data item
function Body({ data, render }) {
  if (!data.length) return <Empty>No data to show. </Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
