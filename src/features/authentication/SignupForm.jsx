import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }
  function error() {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, error)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          disabled={isLoading}
          id="fullName"
          disabled={isLoading}
          {...register("fullName", {
            required: "Full name is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          disabled={isLoading}
          id="email"
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          disabled={isLoading}
          id="password"
          {...register("password", {
            required: "Full name is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          disabled={isLoading}
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Password confirmation is required",
            validate: (value) => {
              return (
                value === getValues().password || "The passwords do not match"
              );
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isLoading} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
