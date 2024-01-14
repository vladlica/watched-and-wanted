import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import Error from "../../ui/Error";
import FormRow from "../../ui/FormRow";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import FormExtraInfoList from "../../ui/FormExtraInfoList";
import {
  capitalizeFirstWord,
  convertExtraInfoFromDatabase,
  convertExtraInfoObjectToArray,
} from "../../utils/helpers";
import ButtonsList from "../../ui/ButtonsList";
import Button from "../../ui/Button";
import { useCreateAnime } from "./useCreateAnime";
import { useUpdateAnime } from "./useUpdateAnime";

function CreateEditAnimeForm({ anime, onClose }) {
  const scrollRef = useRef(null);

  const { isCreating, createAnime } = useCreateAnime();
  const { isUpdating, updateAnime } = useUpdateAnime();
  const isEditSession = Boolean(anime?.id);

  const {
    register,
    unregister,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState,
  } = useForm({
    defaultValues: isEditSession
      ? {
          ...anime,
        }
      : {},
  });

  const { errors } = formState;

  const watchFields = watch(["status"]);

  const isWatched = watchFields[0] === "watched";

  useEffect(
    function () {
      if (!isWatched) {
        reset({
          numEpisodes: "",
        });
      }
    },
    [isWatched, reset]
  );

  function onSubmit(data) {
    console.log("submit");
    console.log(data);

    const { title, numEpisodes, status, ...extraInfoData } = data;

    const animeInfo = {
      title: capitalizeFirstWord(title),
      numEpisodes: +numEpisodes,
      status,
    };

    if (isEditSession) {
      delete extraInfoData.extra_info;
      delete extraInfoData.id;
      delete extraInfoData.created_at;
    }

    const extraInfoArray = convertExtraInfoObjectToArray(extraInfoData);

    console.log("----");
    console.log(extraInfoArray);
    console.log(animeInfo);

    if (isEditSession)
      updateAnime(
        { id: anime.id, updatedAnime: animeInfo, extraInfo: extraInfoArray },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    else
      createAnime(
        { newAnime: animeInfo, extraInfo: extraInfoArray },
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
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          placeholder="Title of the anime"
          {...register("title", {
            required: "This field is required",
          })}
          disabled={isCreating || isUpdating}
        />
        {errors?.title?.message && <Error>{errors.title.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="status">Status</Label>
        <Select
          id="status"
          options={["wanted", "watched"]}
          register={{ ...register("status") }}
          disabled={isCreating || isUpdating}
        ></Select>
      </FormRow>

      <FormRow>
        <Label htmlFor="numEpisodes">Episodes</Label>
        <Input
          type="number"
          id="numEpisodes"
          placeholder="Number of episodes "
          {...register("numEpisodes", {
            validate: {
              required: (value) => {
                if (!value && getValues().status === "watched")
                  return "This field is required";
                return true;
              },
            },
            min: {
              value: 1,
              message: "The episodes number should be positive",
            },
          })}
          disabled={!isWatched || isCreating || isUpdating}
        />
        {errors?.numEpisodes?.message && (
          <Error>{errors.numEpisodes.message}</Error>
        )}
      </FormRow>

      <FormExtraInfoList
        register={register}
        unregister={unregister}
        errors={errors}
        ref={scrollRef}
        defaultValue={
          isEditSession ? convertExtraInfoFromDatabase(anime.extra_info) : []
        }
        disabled={isCreating || isUpdating}
      />

      <ButtonsList $justify="end">
        <Button $variation="primary" disabled={isCreating || isUpdating}>
          {isEditSession ? "Update anime" : "Create anime"}
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

export default CreateEditAnimeForm;
