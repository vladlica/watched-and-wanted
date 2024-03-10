import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import Error from "../../ui/Error";
import Select from "../../ui/Select";
import FormExtraInfoList from "../../ui/FormExtraInfoList";
import {
  capitalizeFirstWord,
  convertExtraInfoFromDatabase,
  convertExtraInfoObjectToArray,
} from "../../utils/helpers";
import ButtonsList from "../../ui/ButtonsList";
import FormChecboxesRow from "../../ui/FormCheckboxesRow";
import Button from "../../ui/Button";
import { useCreateSeries } from "./useCreateSeries";
import { useUpdateSeries } from "./useUpdateSeries";
import Checkbox from "../../ui/Checkbox";

function CreateEditSeriesForm({ series, onClose }) {
  const scrollRef = useRef(null);

  const { isCreating, createSeries } = useCreateSeries();
  const { isUpdating, updateSeries } = useUpdateSeries();

  const isEditSession = Boolean(series?.id);

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
          ...series,
        }
      : {
          hasBook: false,
          hasMovie: false,
          hasNews: false,
          isFinished: false,
        },
  });

  const { errors } = formState;

  const watchFields = watch(["status"]);

  const isWatched = watchFields[0] === "watched";

  useEffect(
    function () {
      if (!isWatched) {
        setValue("numSeasons", "");
        setValue("numEpisodes", "");
        setValue("hasNews", false);
      }
    },
    [isWatched, setValue]
  );

  function onSubmit(data) {
    const {
      title,
      numSeasons,
      numEpisodes,
      status,
      hasBook,
      hasMovie,
      hasNews,
      isFinished,
      ...extraInfoData
    } = data;

    const seriesInfo = {
      title: capitalizeFirstWord(title),
      numSeasons: +numSeasons,
      numEpisodes: +numEpisodes,
      status,
      hasBook,
      hasMovie,
      hasNews,
      isFinished,
    };

    if (isEditSession) {
      delete extraInfoData.extra_info;
      delete extraInfoData.id;
      delete extraInfoData.created_at;
    }

    const extraInfoArray = convertExtraInfoObjectToArray(extraInfoData);

    if (isEditSession)
      updateSeries(
        { id: series.id, updatedSeries: seriesInfo, extraInfo: extraInfoArray },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    else
      createSeries(
        { newSeries: seriesInfo, extraInfo: extraInfoArray },
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
          placeholder="Title of the series"
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
          disabled={!isWatched || isCreating || isUpdating}
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
          isEditSession ? convertExtraInfoFromDatabase(series.extra_info) : []
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
        <Checkbox
          id="hasMovie"
          label="Movie"
          control={control}
          disabled={isCreating || isUpdating}
        />
        <Checkbox
          id="hasNews"
          label="News"
          control={control}
          disabled={!isWatched || isCreating || isUpdating}
        />
        <Checkbox
          id="isFinished"
          label="Finished"
          control={control}
          disabled={isCreating || isUpdating}
        />
      </FormChecboxesRow>

      <ButtonsList $justify="end">
        <Button $variation="primary" disabled={isCreating || isUpdating}>
          {isEditSession ? "Update series" : "Create series"}
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

export default CreateEditSeriesForm;
