import { useForm } from "react-hook-form";
import propTypes from "prop-types";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormField from "../../ui/FormField";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabins } from "./useEditCabins";
function CreateCabinForm({ editedCabin = {}, onCloseModal }) {
  const { id: editedId, ...dataToEdit } = editedCabin;
  const isEditingSession = Boolean(editedId);
  // We need to reset the form after a successful submission
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditingSession ? dataToEdit : {},
  });

  // Get the errors from the formState object
  const { errors } = formState;

  const { createCabin, isCreating } = useCreateCabin();

  const { editCabin, isEditing } = useEditCabins();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditingSession)
      editCabin(
        { editedData: { ...data, image }, id: editedId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormField label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="name"
          {...register("name", {
            required: { value: true, message: "Cabin name is required" },
          })}
        />
      </FormField>

      <FormField label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: { value: true, message: "Maximum capacity is required" },
            min: { value: 0, message: "Capacity can't be lower than 0" },
          })}
        />
      </FormField>

      <FormField label="Regular price" error={errors.regularPrice?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="regularPrice"
          {...register("regularPrice", {
            required: { value: true, message: "Regular price is required" },
            min: { value: 0, message: "Price can't be lower than 0" },
          })}
        />
      </FormField>

      <FormField label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: { value: true, message: "Discount is required" },
            min: { value: 0, message: "Discount can't be lower than 0" },
            validate: (value) => {
              return (
                Number(value) <= Number(getValues().regularPrice) ||
                "Discount can't be higher than regular price"
              );
            },
          })}
        />
      </FormField>

      <FormField
        label="Description for website"
        error={errors.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: { value: true, message: "Description is required" },
          })}
        />
      </FormField>

      <FormField label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={isWorking}
          accept="image/*"
          {...register("image", {
            required: isEditingSession
              ? false
              : { value: true, message: "image is required" },
          })}
        />
      </FormField>

      <FormField>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditing ? "Edit Cabin" : `Add cabin`}
        </Button>
      </FormField>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  editedCabin: propTypes.object,
  onCloseModal: propTypes.func,
};

export default CreateCabinForm;
