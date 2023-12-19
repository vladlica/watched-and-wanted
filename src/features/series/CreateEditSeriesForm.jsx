import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import Error from "../../ui/Error";
import Select from "../../ui/Select";
import FormExtraInfoList from "../../ui/FormExtraInfoList";
import { convertExtraInfoFromDatabase } from "../../utils/helpers";
import FormButtonRow from "../../ui/FormButtonRow";
import Button from "../../ui/Button";
import styled from "styled-components";

const FormChecboxesRow = styled.div`
  display: flex;
  gap: 3rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  & input[type="checkbox"] {
    height: 2rem;
    width: 2rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-orange-600);
  }
`;

function CreateEditSeriesForm({ series, onClose }) {
  const scrollRef = useRef(null);

  const isEditSession = Boolean(series?.id);

  const {
    register,
    unregister,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState,
    control,
    setValue,
  } = useForm({
    defaultValues: isEditSession
      ? {
          ...series,
        }
      : { book: false, movie: false, news: false, finished: false },
  });

  const { errors } = formState;

  const watchFields = watch(["status"]);

  const isWatched = watchFields[0] === "watched";

  useEffect(
    function () {
      if (!isWatched) {
        reset({
          numSeasons: "",
          numEpisodes: "",
          //reset the checkbox for news also
        });
      }
    },
    [isWatched, reset]
  );

  function onSubmit(data) {
    console.log("submit");
    console.log(data);
  }

  return (
    <Form ref={scrollRef} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <FormRow>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          placeholder="Series title"
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
        <Label htmlFor="numSeasons">Seasons</Label>
        <Input
          type="number"
          id="numSeasons"
          placeholder="Number of seasons "
          {...register("numSeasons", {
            validate: {
              required: (value) => {
                if (!value && getValues().status === "watched")
                  return "This field is required";
                return true;
              },
            },
            min: {
              value: 1,
              message: "The seasons number should be positive",
            },
          })}
          // disabled={!isWatched || isCreating || isUpdating}
        />
        {errors?.numSeasons?.message && (
          <Error>{errors.numSeasons.message}</Error>
        )}
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
          // disabled={!isWatched || isCreating || isUpdating}
        />
        {errors?.numEpisodes?.message && (
          <Error>{errors.numEpisodes.message}</Error>
        )}
      </FormRow>

      <FormChecboxesRow>
        <CheckboxContainer>
          <Controller
            name="book"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="book"
                onChange={(e) => field.onChange(e.target.checked)}
                checked={field.value}
              />
            )}
          />
          <Label htmlFor="book">Book</Label>
        </CheckboxContainer>
        <CheckboxContainer>
          <Controller
            name="movie"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="movie"
                onChange={(e) => field.onChange(e.target.checked)}
                checked={field.value}
              />
            )}
          />
          <Label htmlFor="movie">Movie</Label>
        </CheckboxContainer>
        <CheckboxContainer>
          <Controller
            name="news"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="news"
                onChange={(e) => field.onChange(e.target.checked)}
                checked={field.value}
              />
            )}
          />
          <Label htmlFor="news">News</Label>
        </CheckboxContainer>
        <CheckboxContainer>
          <Controller
            name="finished"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="finished"
                onChange={(e) => field.onChange(e.target.checked)}
                checked={field.value}
              />
            )}
          />
          <Label htmlFor="finished">Finished</Label>
        </CheckboxContainer>
      </FormChecboxesRow>

      <FormExtraInfoList
        register={register}
        unregister={unregister}
        errors={errors}
        ref={scrollRef}
        defaultValue={
          isEditSession ? convertExtraInfoFromDatabase(series.extra_info) : []
        }
        // disabled={isCreating || isUpdating}
      />

      <FormButtonRow $justify="end">
        <Button
          $variation="primary"
          //  disabled={isCreating || isUpdating}
        >
          {isEditSession ? "Update series" : "Create series"}
        </Button>
        <Button
          $variation="secondary"
          onClick={onClose}
          type="button"
          // disabled={isCreating || isUpdating}
        >
          Cancel
        </Button>
      </FormButtonRow>
    </Form>
  );
}

export default CreateEditSeriesForm;
