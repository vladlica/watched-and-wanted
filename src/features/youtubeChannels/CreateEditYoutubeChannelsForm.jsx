import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  capitalizeFirstWord,
  convertExtraInfoFromDatabase,
  convertExtraInfoObjectToArray,
} from "../../utils/helpers";
import { useCreateYoutubeChannel } from "./useCreateYoutubeChannel";
import { useUpdateYoutubeChannel } from "./useUpdateYoutubeChannel";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Error from "../../ui/Error";
import Select from "../../ui/Select";
import FormExtraInfoList from "../../ui/FormExtraInfoList";
import FormChecboxesRow from "../../ui/FormCheckboxesRow";
import Checkbox from "../../ui/Checkbox";
import ButtonsList from "../../ui/ButtonsList";
import Button from "../../ui/Button";

// Props:
// - youtubeChannel: Object - The youtube channel data to be edited, if provided
// - onClose: Object - Function to close the form
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
    reset,
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

  // Watches changes in the "status" field and updates accordingly
  const watchFields = watch(["status"]);

  const isSubscribed = watchFields[0] === "subscribed";

  useEffect(
    function () {
      if (!isSubscribed) {
        reset({
          hasBell: false,
        });
      }
    },
    [isSubscribed, reset]
  );

  function onSubmit(data) {
    const { channelName, status, hasBell, ...extraInfoData } = data;

    const youtubeChannelInfo = {
      channelName: capitalizeFirstWord(channelName),
      status,
      hasBell,
    };

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
          register={register}
          disabled={isCreating || isUpdating}
        ></Select>
      </FormRow>

      <FormExtraInfoList
        register={register}
        unregister={unregister}
        errors={errors}
        ref={scrollRef}
        // If it's an editing session converts the array of extra info from the database to an array which has the expected structure for the FormExtraInfoList component
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
