import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Error from "../../ui/Error";
import Select from "../../ui/Select";
import {
  capitalizeFirstWord,
  convertExtraInfoFromDatabase,
  convertExtraInfoObjectToArray,
} from "../../utils/helpers";
import FormExtraInfoList from "../../ui/FormExtraInfoList";
import FormChecboxesRow from "../../ui/FormCheckboxesRow";
import Checkbox from "../../ui/Checkbox";
import ButtonsList from "../../ui/ButtonsList";
import Button from "../../ui/Button";
import { useCreateYoutubeChannel } from "./useCreateYoutubeChannel";
import { useUpdateYoutubeChannel } from "./useUpdateYoutubeChannel";

function CreateEditYoutubeChannelsForm({ youtubeChannel, onClose }) {
  const scrollRef = useRef(null);

  const { isCreating, createYoutubeChannel } = useCreateYoutubeChannel();
  const { isUpdating, updateYoutubeChannel } = useUpdateYoutubeChannel();

  const isEditSession = Boolean(youtubeChannel?.id);

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    formState,
    control,
    setValue,
  } = useForm({
    defaultValues: isEditSession
      ? {
          ...youtubeChannel,
        }
      : {
          hasBell: false,
        },
  });

  const { errors } = formState;

  const watchFields = watch(["status"]);

  const isSubscribed = watchFields[0] === "subscribed";

  useEffect(
    function () {
      if (!isSubscribed) {
        setValue("hasBell", false);
      }
    },
    [isSubscribed, setValue]
  );

  function onSubmit(data) {
    const { channelName, status, hasBell, ...extraInfoData } = data;

    const youtubeChannelInfo = {
      channelName: capitalizeFirstWord(channelName),
      status,
      hasBell,
    };

    if (isEditSession) {
      delete extraInfoData.extra_info;
      delete extraInfoData.id;
      delete extraInfoData.created_at;
    }

    const extraInfoArray = convertExtraInfoObjectToArray(extraInfoData);

    if (isEditSession)
      updateYoutubeChannel(
        {
          id: youtubeChannel.id,
          updatedYoutubeChannel: youtubeChannelInfo,
          extraInfo: extraInfoArray,
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    else
      createYoutubeChannel(
        { newYoutubeChannel: youtubeChannelInfo, extraInfo: extraInfoArray },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
  }
  return (
    <Form ref={scrollRef} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <FormRow>
        <Label htmlFor="channelName">Channel Name</Label>
        <Input
          type="text"
          id="channelName"
          placeholder="The name of the channel"
          {...register("channelName", {
            required: "This field is required",
          })}
          disabled={isCreating || isUpdating}
        />
        {errors?.channelName?.message && (
          <Error>{errors.channelName.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="status">Status</Label>
        <Select
          id="status"
          options={["wanted", "subscribed"]}
          register={{ ...register("status") }}
          disabled={isCreating || isUpdating}
        ></Select>
      </FormRow>

      <FormExtraInfoList
        register={register}
        unregister={unregister}
        errors={errors}
        ref={scrollRef}
        defaultValue={
          isEditSession
            ? convertExtraInfoFromDatabase(youtubeChannel.extra_info)
            : []
        }
        disabled={isCreating || isUpdating}
      />

      <FormChecboxesRow>
        <Checkbox
          id="hasBell"
          label="Bell"
          control={control}
          disabled={!isSubscribed || isCreating || isUpdating}
        />
      </FormChecboxesRow>

      <ButtonsList $justify="end">
        <Button $variation="primary" disabled={isCreating || isUpdating}>
          {isEditSession ? "Update Youtube channel" : "Create Youtube channel"}
        </Button>
        <Button
          $variation="secondary"
          onClick={onClose}
          type="button"
          disabled={isCreating || isUpdating}
        >
          Cancel
        </Button>
      </ButtonsList>
    </Form>
  );
}

export default CreateEditYoutubeChannelsForm;
