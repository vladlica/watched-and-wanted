import styled from "styled-components";

// Props:
// - color: String - Determines the background and text color of the tag
const Tag = styled.span`
  background-color: var(--color-${(props) => props.color}-100);
  color: var(--color-${(props) => props.color}-700);
  border-radius: 15px;
  padding: 0.4rem 1rem;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
`;

export default Tag;
