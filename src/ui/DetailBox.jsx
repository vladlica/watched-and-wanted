import React from "react";
import styled from "styled-components";

const StyledDetailBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  padding: 1rem;
  box-shadow: var(--shadow-md);
  border-radius: 25px;
`;

// Props:
// - color: String - Determines the background and icon color
const LeftBox = styled.div`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-${(props) => props.color}-600);
  padding: 1rem;

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-50);
  }
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--color-grey-600);

  & a:link,
  a:visited {
    color: var(--color-orange-700);
    border-radius: 25px;
  }

  & a:hover,
  a:active {
    text-decoration: underline;
    border-radius: 25px;
  }

  & a:focus-visible {
    outline: 2px solid var(--color-orange-600);
    outline-offset: 3px;
  }
`;

const Value = styled.span`
  font-weight: 600;
`;

// Props:
// - icon: JSX.Element - Icon component
// - details: Oject- Array of detail objects containing label and value
// - color: String - Color theme for the detail box (default is "orange")
// - oneLine: Boolean - Indicating whether to display details in one line or not (default is false)
function DetailBox({ icon, details, color = "orange", oneLine = false }) {
  return (
    <StyledDetailBox>
      <LeftBox color={color}>{icon}</LeftBox>
      <RightBox>
        {details?.map((detail) =>
          !oneLine ? (
            <React.Fragment key={detail.label}>
              <span>{detail.label}</span>
              <Value>{detail.value}</Value>
            </React.Fragment>
          ) : (
            <span key={detail.label}>
              {detail.label} <Value>{detail.value}</Value>
            </span>
          )
        )}
      </RightBox>
    </StyledDetailBox>
  );
}

export default DetailBox;
