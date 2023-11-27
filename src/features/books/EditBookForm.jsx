import { Controller, useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import Select from "../../ui/Select";
import { Calendar } from "primereact/calendar";
import FormButtonRow from "../../ui/FormButtonRow";
import Button from "../../ui/Button";
import Error from "../../ui/Error";
import { useEffect, useRef } from "react";
import FormExtraInfoList from "../../ui/FormExtraInfoList";
import {
  convertDateToISO,
  convertExtraInfoFromDatabase,
  convertExtraInfoObjectToArray,
} from "../../utils/helpers";
import { useEditBook } from "./useEditBook";

function EditBookForm({ book, onCloseEditModal }) {
  const scrollRef = useRef(null);
  const startedDateRef = useRef(null);
  const finishedDateRef = useRef(null);

  const { isEditing, editBook } = useEditBook();

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
    defaultValues: {
      ...book,
      startDate: new Date(book.startDate),
      finishDate: new Date(book.finishDate),
    },
  });

  const { errors } = formState;

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

  function onClick(e) {
    if (
      e.target.id !== "startDate" &&
      !document.querySelector(".p-datepicker")?.contains(e.target)
    ) {
      startedDateRef.current.hide();
    }

    if (
      e.target.id !== "finishDate" &&
      !document.querySelector(".p-datepicker")?.contains(e.target)
    )
      finishedDateRef.current.hide();
  }

  function onSubmit(data) {
    console.log("submit");
    console.log(data);

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
      author,
      title,
      series,
      numVolumes: +numVolumes,
      numPages: +numPages,
      status,
      startDate: convertDateToISO(startDate),
      finishDate: convertDateToISO(finishDate),
    };

    delete extraInfoData.extra_info;
    delete extraInfoData.id;
    delete extraInfoData.created_at;

    const extraInfoArray = convertExtraInfoObjectToArray(extraInfoData);

    console.log(bookInfo);
    console.log(extraInfoArray);

    editBook(
      { id: book.id, obj: bookInfo, extraInfo: extraInfoArray },
      {
        onSuccess: () => {
          onCloseEditModal();
        },
      }
    );
  }

  return (
    <Form
      ref={scrollRef}
      onSubmit={handleSubmit(onSubmit)}
      onClick={onClick}
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
          disabled={isEditing}
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
          disabled={isEditing}
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
          disabled={isEditing}
        />
        {errors?.series?.message && <Error>{errors.series.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="status">Status</Label>
        <Select
          id="status"
          options={["wanted", "read"]}
          register={{ ...register("status") }}
          disabled={isEditing}
        ></Select>
      </FormRow>

      <FormRow>
        <Label htmlFor="numVolumes">Number of volumes</Label>
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
          disabled={!isRead || isEditing}
        />
        {errors?.numVolumes?.message && (
          <Error>{errors.numVolumes.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="numPages">Number of pages</Label>
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
          disabled={!isRead || isEditing}
        />
        {errors?.numPages?.message && <Error>{errors.numPages.message}</Error>}
      </FormRow>

      <FormRow>
        <Controller
          name="startDate"
          control={control}
          render={({ field, fieldState }) => (
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
                maxDate={getValues().finishDate}
                disabled={!isRead || isEditing}
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
          render={({ field, fieldState }) => (
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
                disabled={!isRead || isEditing}
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
        defaultValue={convertExtraInfoFromDatabase(book.extra_info)}
        disabled={isEditing}
      />

      <FormButtonRow $justify="end">
        <Button $variation="primary" disabled={isEditing}>
          Edit book
        </Button>
        <Button
          $variation="secondary"
          onClick={onCloseEditModal}
          type="button"
          disabled={isEditing}
        >
          Cancel
        </Button>
      </FormButtonRow>
    </Form>
  );
}

export default EditBookForm;
