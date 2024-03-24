import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  capitalizeFirstWord,
  convertExtraInfoFromDatabase,
  convertExtraInfoObjectToArray,
} from "../../utils/helpers";
import { useCreateMovie } from "./useCreateMovie";
import { useUpdateMovie } from "./useUpdateMovies";
import FormRow from "../../ui/FormRow";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Error from "../../ui/Error";
import Select from "../../ui/Select";
import FormExtraInfoList from "../../ui/FormExtraInfoList";
import FormChecboxesRow from "../../ui/FormCheckboxesRow";
import Checkbox from "../../ui/Checkbox";
import Form from "../../ui/Form";
import ButtonsList from "../../ui/ButtonsList";
import Button from "../../ui/Button";

// Props:
// - movie: Object - The movie data to be edited, if provided
// - onClose: Object - Function to close the form
function CreateEditMoviesForm({ movie, onClose }) {
  const scrollRef = useRef(null);

  const { isCreating, createMovie } = useCreateMovie();
  const { isUpdating, updateMovie } = useUpdateMovie();

  const isEditSession = Boolean(movie?.id);

  const {
    register,
    unregister,
    handleSubmit,
    getValues,
    watch,
    formState,
    control,
    setValue,
  } = useForm({
    defaultValues: isEditSession
      ? {
          ...movie,
        }
      : {
          hasBook: false,
        },
  });

  const { errors } = formState;

  // Watches changes in the "status" field and updates accordingly
  const watchFields = watch(["status"]);

  const isWatched = watchFields[0] === "watched";

  useEffect(
    function () {
      if (!isWatched) {
        // Using setValue instead of reset, because reset would revert the checkbox to its default value
        setValue("duration", "");
      }
    },
    [isWatched, setValue]
  );

  function onSubmit(data) {
    const { title, duration, status, hasBook, ...extraInfoData } = data;

    const movieInfo = {
      title: capitalizeFirstWord(title),
      duration: +duration,
      status,
      hasBook,
    };

    const extraInfoArray = convertExtraInfoObjectToArray(extraInfoData);

    if (isEditSession)
      updateMovie(
        { id: movie.id, updatedMovie: movieInfo, extraInfo: extraInfoArray },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    else
      createMovie(
        { newMovie: movieInfo, extraInfo: extraInfoArray },
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
          placeholder="Title of the movie"
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
        <Label htmlFor="duration">Duration</Label>
        <Input
          type="number"
          id="duration"
          placeholder="Duration in minutes "
          {...register("duration", {
            validate: {
              required: (value) => {
                if (!value && getValues().status === "watched")
                  return "This field is required";
                return true;
              },
            },
            min: {
              value: 1,
              message: "The duration value should be positive",
            },
          })}
          disabled={!isWatched || isCreating || isUpdating}
        />
        {errors?.numSeasons?.message && (
          <Error>{errors.numSeasons.message}</Error>
        )}
      </FormRow>

      <FormExtraInfoList
        register={register}
        unregister={unregister}
        errors={errors}
        ref={scrollRef}
        // If it's an editing session converts the array of extra info from the database to an array which has the expected structure for the FormExtraInfoList component
        defaultValue={
          isEditSession ? convertExtraInfoFromDatabase(movie.extra_info) : []
        }
        disabled={isCreating || isUpdating}
      />

      <FormChecboxesRow>
        <Checkbox
          id="hasBook"
          label="Book"
          control={control}
          disabled={isCreating || isUpdating}
        />
      </FormChecboxesRow>

      <ButtonsList $justify="end">
        <Button $variation="primary" disabled={isCreating || isUpdating}>
          {isEditSession ? "Update movie" : "Create movie"}
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

export default CreateEditMoviesForm;
