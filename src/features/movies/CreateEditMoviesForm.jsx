import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Error from "../../ui/Error";
import Select from "../../ui/Select";
import FormExtraInfoList from "../../ui/FormExtraInfoList";
import {
  capitalizeFirstWord,
  convertExtraInfoFromDatabase,
  convertExtraInfoObjectToArray,
} from "../../utils/helpers";
import FormChecboxesRow from "../../ui/FormCheckboxesRow";
import Checkbox from "../../ui/Checkbox";
import Form from "../../ui/Form";
import ButtonsList from "../../ui/ButtonsList";
import Button from "../../ui/Button";
import { useCreateMovie } from "./useCreateMovie";

function CreateEditMoviesForm({ movie, onClose }) {
  const scrollRef = useRef(null);

  const { isCreating, createMovie } = useCreateMovie();

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

  const watchFields = watch(["status"]);

  const isWatched = watchFields[0] === "watched";

  useEffect(
    function () {
      if (!isWatched) {
        setValue("duration", "");
      }
    },
    [isWatched, setValue]
  );

  function onSubmit(data) {
    console.log("submit");
    console.log(data);

    const { title, duration, status, hasBook, ...extraInfoData } = data;

    const movieInfo = {
      title: capitalizeFirstWord(title),
      duration: +duration,
      status,
      hasBook,
    };

    if (isEditSession) {
      delete extraInfoData.extra_info;
      delete extraInfoData.id;
      delete extraInfoData.created_at;
    }

    const extraInfoArray = convertExtraInfoObjectToArray(extraInfoData);

    console.log("----");
    console.log(extraInfoArray);
    console.log(movieInfo);

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
          // disabled={isCreating || isUpdating}
        />
        {errors?.title?.message && <Error>{errors.title.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="status">Status</Label>
        <Select
          id="status"
          options={["wanted", "watched"]}
          register={{ ...register("status") }}
          // disabled={isCreating || isUpdating}
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
          // disabled={!isWatched || isCreating || isUpdating}
          disabled={!isWatched}
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
        defaultValue={
          isEditSession ? convertExtraInfoFromDatabase(movie.extra_info) : []
        }
        // disabled={isCreating || isUpdating}
      />

      <FormChecboxesRow>
        <Checkbox
          id="hasBook"
          label="Book"
          control={control}
          // disabled={isCreating || isUpdating}
        />
      </FormChecboxesRow>

      <ButtonsList $justify="end">
        <Button
          $variation="primary"
          //  disabled={isCreating || isUpdating}
        >
          {isEditSession ? "Update movie" : "Create movie"}
        </Button>
        <Button
          $variation="secondary"
          onClick={onClose}
          type="button"
          // disabled={isCreating || isUpdating}
        >
          Cancel
        </Button>
      </ButtonsList>
    </Form>
  );
}

export default CreateEditMoviesForm;
