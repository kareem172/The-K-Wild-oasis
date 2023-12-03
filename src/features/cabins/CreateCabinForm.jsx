
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormField from "../../ui/FormField";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data) {
    mutate(data);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: { value: true, message: "Cabin name is required" },
          })}
        />
      </FormField>

      <FormField label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
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
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: { value: true, message: "Discount is required" },
            min: { value: 0, message: "Discount can't be lower than 0" },
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount can't be higher than regular price",
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

      <FormField label="Cabin photo">
        <FileInput id="image" accept="image/*" />
      </FormField>

      <FormField>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormField>
    </Form>
  );
}

export default CreateCabinForm;
