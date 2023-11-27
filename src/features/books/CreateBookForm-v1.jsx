import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { capitalizeFirstWord } from "../../utils/helpers";
import { useForm } from "react-hook-form";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiXMark } from "react-icons/hi2";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: auto;
  padding: 2.4rem 1rem;
  background-color: var(--color-grey-0);
  max-height: 65rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 15rem 1fr 1fr;
  align-items: center;
  gap: 2.4rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  border: 1px solid var(--color-grey-400);
  padding: 0.3rem 1.2rem;
  border-radius: 15px;
  box-shadow: var(--shadow-sm);
  width: 100%;

  &:focus {
    outline: 2px solid var(--color-orange-600);
    outline-offset: -2px;
  }

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

const Select = styled.select`
  border: 1px solid var(--color-grey-400);
  padding: 0.6rem 1.2rem;
  border-radius: 15px;
  box-shadow: var(--shadow-sm);
  width: 100%;

  &:focus {
    outline: 2px solid var(--color-orange-600);
    outline-offset: -2px;
  }
`;

const FormButton = styled.button`
  background-color: var(--color-orange-600);
  color: var(--color-orange-50);
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-orange-700);
  }
`;

const CancelButton = styled.button`
  background-color: var(--color-grey-0);
  color: var(--color-grey-600);
  border: 1px solid var(--color-grey-300);
  padding: 1rem 2rem;
  border-radius: 25px;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const ExtraInfoContainer = styled.div`
  position: relative;
`;

function CreateBookForm({ onClose }) {
  const [extraInfo, setExtraInfo] = useState([]);
  const scrollRef = useRef(null);

  const { register, handleSubmit } = useForm({ shouldUnregister: true });

  //to keep the scroll always to the bottom of the div
  useEffect(
    function () {
      if (extraInfo.length > 0)
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    },
    [extraInfo]
  );

  function addComment() {
    setExtraInfo((extraInfo) => [
      ...extraInfo,
      { type: `comment`, valid: true },
    ]);
  }

  function addLink() {
    setExtraInfo((extraInfo) => [...extraInfo, { type: `link`, valid: true }]);
  }

  function removeExtraInfo(index) {
    setExtraInfo((extraInfo) =>
      extraInfo.map((info, i) => (i === index ? info.valid === false : info))
    );
  }

  function closeModal() {
    onClose();
  }

  function onSubmit(data) {
    console.log("submit");
    console.log(data);

    const bookInfo = {
      author: data.author,
      title: data.title,
      series: data.series,
      numVolumes: data.numVolumes,
      status: data.status,
    };

    const extraInfoSubmitted = extraInfo.reduce((acc, cur, i) => {
      if (cur.valid)
        if (cur.type === "comment")
          acc.push({ text: data[`${cur.type}${i + 1}`], link: "" });
        else
          acc.push({
            text: data[`altText${i + 1}`],
            link: data[`${cur.type}${i + 1}`],
          });

      return acc;
    }, []);
    console.log(extraInfoSubmitted);
    console.log(bookInfo);
  }

  function onError(errors) {
    console.log("error");
    console.log(errors);
  }

  return (
    <Form ref={scrollRef} onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="author">Author</Label>
        <Input
          type="text"
          id="author"
          placeholder="Author's name"
          {...register("author")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          placeholder="Title of the book"
          {...register("title")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="series">Series</Label>
        <Input
          type="text"
          id="series"
          placeholder="Series the book is part of"
          {...register("series")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="numVolumes">Number of volumes</Label>
        <Input
          type="number"
          id="numVolumes"
          placeholder="Number of volumes "
          {...register("numVolumes")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="status">Status</Label>

        <Select id="status" {...register("status")}>
          <option value="unread" key="1">
            Unread
          </option>
          <option value="read" key="2">
            Read
          </option>
        </Select>
      </FormRow>

      {extraInfo.map((info, i) => {
        if (info.valid)
          return (
            <React.Fragment key={i + 1}>
              <FormRow>
                <Label htmlFor={`${info.type}${i + 1}`}>
                  {capitalizeFirstWord(info.type)}
                </Label>
                <ExtraInfoContainer>
                  <Input
                    type="text"
                    id={`${info.type}${i + 1}`}
                    placeholder={capitalizeFirstWord(info.type)}
                    {...register(`${info.type}${i + 1}`, {
                      required: "This field is required",
                    })}
                  />
                  <ButtonIcon
                    place="input"
                    type="button"
                    onClick={() => removeExtraInfo(i)}
                  >
                    <HiXMark />
                  </ButtonIcon>
                </ExtraInfoContainer>
              </FormRow>
              {info.type === "link" && (
                <FormRow>
                  <Label htmlFor={`altText${i + 1}`}>Alternative text</Label>
                  <Input
                    type="text"
                    id={`altText${i + 1}`}
                    placeholder={`Alt. text for link above`}
                    {...register(`altText${i + 1}`)}
                  />
                </FormRow>
              )}
            </React.Fragment>
          );
        return null;
      })}

      <ButtonRow>
        <FormButton>Add book</FormButton>
        <FormButton onClick={addComment} type="button">
          Add comment
        </FormButton>
        <FormButton onClick={addLink} type="button">
          Add link
        </FormButton>
        <CancelButton onClick={closeModal} type="button">
          Cancel
        </CancelButton>
      </ButtonRow>
    </Form>
  );
}

export default CreateBookForm;
