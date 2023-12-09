import Form from "../../ui/Form";
import FormField from "../../ui/FormField";

import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSetting } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings = {},
  } = useSetting();

  const {
    minBookingLength,
    maxBookingLength,
    maxGestsPerBooking,
    breakfastPrice,
  } = settings;
  
  const { isUpdating, UpdateSetting } = useUpdateSetting();

  const handleUpdate = (event, field) => {
    const { value } = event.target;
    if(!value || Number(settings[field]) === Number(value)) return;
    const updatedSetting = { [field]: value };
    UpdateSetting(updatedSetting);
  };

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormField label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormField>
      <FormField label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormField>
      <FormField label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxGestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGestsPerBooking")}
        />
      </FormField>
      <FormField label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormField>
    </Form>
  );
}

export default UpdateSettingsForm;
