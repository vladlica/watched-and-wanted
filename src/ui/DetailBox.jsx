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
  }

  & a:hover,
  a:active {
    text-decoration: underline;
  }
`;

const Value = styled.span`
  font-weight: 600;
`;

function DetailBox({ icon, details, color = "orange", oneLine = false }) {
  return (
    <StyledDetailBox>
      <LeftBox color={color}>{icon}</LeftBox>
      <RightBox>
        {details?.map((detail) => (
          <React.Fragment key={detail.label}>
            {!oneLine ? (
              <>
                <span>{detail.label}</span>
                <Value>{detail.value}</Value>
              </>
            ) : (
              <span>
                {detail.label} <Value>{detail.value}</Value>
              </span>
            )}
          </React.Fragment>
        ))}
      </RightBox>
    </StyledDetailBox>
  );
}

export default DetailBox;
