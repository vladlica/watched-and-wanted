import React, { useEffect, useState, forwardRef } from "react";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import FormRow from "./FormRow";
import ButtonsList from "./ButtonsList";
import Label from "./Label";
import Input from "./Input";
import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineLink,
  HiXMark,
} from "react-icons/hi2";
import { capitalizeFirstWord, isHttpValid } from "../utils/helpers";
import Error from "./Error";

const ExtraInfoContainer = styled.div`
  position: relative;
`;

const FormExtraInfoList = forwardRef(function (
  { register, unregister, errors, disabled, defaultValue = [] },
  ref
) {
  const [extraInfo, setExtraInfo] = useState(defaultValue);

  // to keep the scroll to the bottom
  useEffect(
    function () {
      if (extraInfo.length) ref.current.scrollTop = ref.current.scrollHeight;
    },
    [extraInfo.length, ref]
  );

  function removeExtraInfo(index, type) {
    unregister(`${index + 1}${type}`);

    setExtraInfo((extraInfo) =>
      extraInfo.map((info, i) => (i === index ? info.valid === false : info))
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
                    id={`${i + 1}${info.type}`}
                    defaultValue={
                      info.type === "comment" ? info?.text : info?.link
                    }
                    placeholder={capitalizeFirstWord(info.type)}
                    {...register(`${i + 1}${info.type}`, {
                      required: "This field is required",
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
                    onClick={() => removeExtraInfo(i, info.type)}
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
