import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  capitalizeFirstWord,
  convertExtraInfoFromDatabase,
  convertExtraInfoObjectToArray,
} from "../../utils/helpers";
import { useCreateAnime } from "./useCreateAnime";
import { useUpdateAnime } from "./useUpdateAnime";
import ButtonsList from "../../ui/ButtonsList";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Error from "../../ui/Error";
import FormRow from "../../ui/FormRow";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import FormExtraInfoList from "../../ui/FormExtraInfoList";

// Props:
// - anime: Object - The anime data to be edited, if provided
// - onClose: Object - Function to close the form
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

  // Watches changes in the "status" field and updates accordingly
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
    const { title, numEpisodes, status, ...extraInfoData } = data;

    const animeInfo = {
      title: capitalizeFirstWord(title),
      numEpisodes: +numEpisodes,
      status,
    };

    const extraInfoArray = convertExtraInfoObjectToArray(extraInfoData);

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
          register={register}
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
        // If it's an editing session converts the array of extra info from the database to an array which has the expected structure for the FormExtraInfoList component
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
