import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { useCreateBook } from "./useCreateBook";
import { useUpdateBook } from "./useUpdateBook";
import {
  capitalizeFirstWord,
  convertDateToISO,
  convertExtraInfoFromDatabase,
  convertExtraInfoObjectToArray,
} from "../../utils/helpers";
import FormExtraInfoList from "../../ui/FormExtraInfoList";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import ButtonsList from "../../ui/ButtonsList";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Error from "../../ui/Error";

// Props:
// - book: Object - The book data to be edited, if provided
// - onClose: Object - Function to close the form
function CreateEditBookForm({ book, onClose }) {
  const scrollRef = useRef(null);
  const startedDateRef = useRef(null);
  const finishedDateRef = useRef(null);

  const { isCreating, createBook } = useCreateBook();
  const { isUpdating, updateBook } = useUpdateBook();

  const isEditSession = Boolean(book?.id);

  const {
    register,
    unregister,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState,
    control,
  } = useForm({
    defaultValues: isEditSession
      ? {
          ...book,
          startDate: (book.startDate &&= new Date(book.startDate)),
          finishDate: (book.finishDate &&= new Date(book.finishDate)),
        }
      : {},
  });

  const { errors } = formState;

  // Watches changes in the "status", "startDate" and "finishDate" fields and updates accordingly
  const watchFields = watch(["status", "startDate", "finishDate"]);

  const isRead = watchFields[0] === "read";

  useEffect(
    function () {
      if (!isRead) {
        reset({
          numVolumes: "",
          numPages: "",
          startDate: "",
          finishDate: "",
        });
      }
    },
    [isRead, reset]
  );

  // Allows the closing of the calendar element when clicking outside the calendar but inside the modal
  function handleClickInsideModal(e) {
    if (
      e.target.id !== "startDate" &&
      !document.querySelector(".p-datepicker")?.contains(e.target)
    )
      startedDateRef.current.hide();

    if (
      e.target.id !== "finishDate" &&
      !document.querySelector(".p-datepicker")?.contains(e.target)
    )
      finishedDateRef.current.hide();
  }

  function onSubmit(data) {
    const {
      author,
      title,
      series,
      numVolumes,
      numPages,
      status,
      startDate,
      finishDate,
      ...extraInfoData
    } = data;

    const bookInfo = {
      author: capitalizeFirstWord(author),
      title: capitalizeFirstWord(title),
      series: capitalizeFirstWord(series),
      numVolumes: +numVolumes,
      numPages: +numPages,
      status,
      // Need to convert the dates to ISO format as required by the Supabase database
      startDate: convertDateToISO(startDate),
      finishDate: convertDateToISO(finishDate),
    };

    const extraInfoArray = convertExtraInfoObjectToArray(extraInfoData);

    if (isEditSession)
      updateBook(
        { id: book.id, updatedBook: bookInfo, extraInfo: extraInfoArray },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    else
      createBook(
        { newBook: bookInfo, extraInfo: extraInfoArray },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
  }

  return (
    <Form
      ref={scrollRef}
      onSubmit={handleSubmit(onSubmit)}
      onClick={handleClickInsideModal}
      autoComplete="off"
    >
      <FormRow>
        <Label htmlFor="author">Author</Label>
        <Input
          type="text"
          id="author"
          placeholder="Author's name"
          {...register("author", {
            required: "This field is required",
          })}
          disabled={isCreating || isUpdating}
        />
        {errors?.author?.message && <Error>{errors.author.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          placeholder="Title of the book"
          {...register("title", {
            required: "This field is required",
          })}
          disabled={isCreating || isUpdating}
        />
        {errors?.title?.message && <Error>{errors.title.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="series">Series</Label>
        <Input
          type="text"
          id="series"
          placeholder="Series the book is part of"
          {...register("series")}
          disabled={isCreating || isUpdating}
        />
        {errors?.series?.message && <Error>{errors.series.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="status">Status</Label>
        <Select
          id="status"
          options={["wanted", "read"]}
          register={register}
          disabled={isCreating || isUpdating}
        ></Select>
      </FormRow>

      <FormRow>
        <Label htmlFor="numVolumes">Volumes</Label>
        <Input
          type="number"
          id="numVolumes"
          placeholder="Number of volumes "
          {...register("numVolumes", {
            validate: {
              required: (value) => {
                if (!value && getValues().status === "read")
                  return "This field is required";
                return true;
              },
            },
            min: {
              value: 1,
              message: "The volumes number should be positive",
            },
          })}
          disabled={!isRead || isCreating || isUpdating}
        />
        {errors?.numVolumes?.message && (
          <Error>{errors.numVolumes.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="numPages">Pages</Label>
        <Input
          type="number"
          id="numPages"
          placeholder="Number of pages "
          {...register("numPages", {
            validate: {
              required: (value) => {
                if (!value && getValues().status === "read")
                  return "This field is required";
                return true;
              },
            },
            min: {
              value: 1,
              message: "The pages number should be positive",
            },
          })}
          disabled={!isRead || isCreating || isUpdating}
        />
        {errors?.numPages?.message && <Error>{errors.numPages.message}</Error>}
      </FormRow>

      <FormRow>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <>
              <Label htmlFor={field.name}>Started reading </Label>
              <Calendar
                inputId={field.name}
                value={field.value}
                onChange={field.onChange}
                dateFormat="dd/mm/yy"
                placeholder="Start reading date"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                showButtonBar
                maxDate={getValues().finishDate || new Date()}
                disabled={!isRead || isCreating || isUpdating}
                ref={startedDateRef}
              />
            </>
          )}
        />
      </FormRow>

      <FormRow>
        <Controller
          name="finishDate"
          control={control}
          render={({ field }) => (
            <>
              <Label htmlFor={field.name}>Finished reading </Label>
              <Calendar
                inputId={field.name}
                value={field.value}
                onChange={field.onChange}
                dateFormat="dd/mm/yy"
                placeholder="Finished reading date"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                showButtonBar
                minDate={getValues().startDate}
                maxDate={new Date()}
                disabled={!isRead || isCreating || isUpdating}
                ref={finishedDateRef}
              />
            </>
          )}
        />
      </FormRow>

      <FormExtraInfoList
        register={register}
        unregister={unregister}
        errors={errors}
        ref={scrollRef}
        // If it's an editing session converts the array of extra info from the database to an array which has the expected structure for the FormExtraInfoList component
        defaultValue={
          isEditSession ? convertExtraInfoFromDatabase(book.extra_info) : []
        }
        disabled={isCreating || isUpdating}
      />

      <ButtonsList $justify="end">
        <Button $variation="primary" disabled={isCreating || isUpdating}>
          {isEditSession ? "Update book" : "Create book"}
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

export default CreateEditBookForm;
