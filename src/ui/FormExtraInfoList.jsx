import React, { useEffect, useState, forwardRef } from "react";
import styled from "styled-components";
import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineLink,
  HiXMark,
} from "react-icons/hi2";
import { capitalizeFirstWord, isHttpValid } from "../utils/helpers";
import ButtonIcon from "./ButtonIcon";
import FormRow from "./FormRow";
import ButtonsList from "./ButtonsList";
import Label from "./Label";
import Input from "./Input";
import Error from "./Error";

const ExtraInfoContainer = styled.div`
  position: relative;
`;

// This component renders extra information such as comments and links associated with an item,
// allowing the addition and deletion of any piece of extra information
// Props:
// - register: Object - Function to register inputs provided by react-hook-form library
// - unregister: Object - Function to unregister inputs provided by react-hook-form library
// - errors: Object - Containing validation errors for form inputs, provided by react-hook-form library
// - disabled: Boolean - Indicating whether the elements in the form are disabled
// - defaultValue: Object - Array of comments and links (comment structure: { type: 'comment', text: 'Comment text', valid: true }, link structure: { type: 'link', link: 'http://example.com', text: 'Link text', valid: true })
// - ref: RefObject - Ref forwarded from parent component pointing to the form element
const FormExtraInfoList = forwardRef(function (
  { register, unregister, errors, disabled, defaultValue = [] },
  ref
) {
  const [extraInfo, setExtraInfo] = useState(defaultValue);

  // Keep the scroll to the bottom when extra info is added
  useEffect(
    function () {
      if (extraInfo.length) ref.current.scrollTop = ref.current.scrollHeight;
    },
    [extraInfo.length, ref]
  );

  function removeExtraInfo(index, type) {
    // To remove it from the data retrieved when submitting the form
    unregister(`${index}${type}`);
    // Removing a piece of extra information by setting its "valid" property to false,
    // because removing it from the array would cause the index for each element to modify
    setExtraInfo((extraInfo) =>
      extraInfo.map((info, i) =>
        i + 1 === index ? info.valid === false : info
      )
    );
  }

  function addComment() {
    setExtraInfo((extraInfo) => [
      ...extraInfo,
      { type: `comment`, valid: true },
    ]);
  }

  function addLink() {
    setExtraInfo((extraInfo) => [...extraInfo, { type: `link`, valid: true }]);
  }

  return (
    <>
      {extraInfo.map((info, i) => {
        if (info.valid)
          return (
            <React.Fragment key={i + 1}>
              <FormRow>
                <Label htmlFor={`${i + 1}${info.type}`}>
                  {capitalizeFirstWord(info.type)}
                </Label>
                <ExtraInfoContainer>
                  <Input
                    type="text"
                    // Using the index to have an unique id in case there are multiple comments or links
                    id={`${i + 1}${info.type}`}
                    defaultValue={
                      info.type === "comment" ? info?.text : info?.link
                    }
                    placeholder={capitalizeFirstWord(info.type)}
                    {...register(`${i + 1}${info.type}`, {
                      required: "This field is required",
                      // Check if the provided link is a valid one
                      validate: (value) =>
                        info.type === "link"
                          ? isHttpValid(value) ||
                            "The link provided is not valid"
                          : null,
                    })}
                    disabled={disabled}
                  />
                  <ButtonIcon
                    $place="input"
                    type="button"
                    onClick={() => removeExtraInfo(i + 1, info.type)}
                    title={`Remove ${info.type}`}
                    disabled={disabled}
                  >
                    <HiXMark />
                  </ButtonIcon>
                </ExtraInfoContainer>
                {errors?.[`${i + 1}${info.type}`]?.message && (
                  <Error>{errors[`${i + 1}${info.type}`].message}</Error>
                )}
              </FormRow>

              {info.type === "link" && (
                <FormRow>
                  <Label htmlFor={`${i + 1}altText`}>Alternative text</Label>
                  <Input
                    type="text"
                    defaultValue={info?.text}
                    id={`${i + 1}altText`}
                    placeholder={`Alt. text for link above`}
                    {...register(`${i + 1}altText`)}
                    disabled={disabled}
                  />
                </FormRow>
              )}
            </React.Fragment>
          );
        return null;
      })}

      <ButtonsList $justify="start">
        <ButtonIcon
          $place="form"
          type="button"
          title="Add a comment"
          onClick={addComment}
          disabled={disabled}
        >
          <HiOutlineChatBubbleOvalLeft />
        </ButtonIcon>
        <ButtonIcon
          $place="form"
          type="button"
          title="Add a link"
          onClick={addLink}
          disabled={disabled}
        >
          <HiOutlineLink />
        </ButtonIcon>
      </ButtonsList>
    </>
  );
});

export default FormExtraInfoList;
