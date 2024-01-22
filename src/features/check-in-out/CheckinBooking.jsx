import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useSetting } from "../settings/useSettings";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { data: booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSetting();
  const [confirmPaying, setConfirmPaying] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking || {};

  const breakfastPrice = numGuests * numNights * settings?.breakfastPrice || 0;

  function handleCheckin() {
    if (!confirmPaying) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: breakfastPrice,
          totalPrice: totalPrice + breakfastPrice,
        },
      });
    } else checkin({ bookingId });
  }

  useEffect(() => {
    setConfirmPaying(booking?.isPaid);
  }, [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((prev) => !prev);
              setConfirmPaying(false);
            }}
            id="breakfast"
          >
            Add Breakfast for the price of {formatCurrency(breakfastPrice)}
          </CheckBox>
        </Box>
      )}
      <Box>
        <CheckBox
          checked={confirmPaying}
          onChange={() => setConfirmPaying((prev) => !prev)}
          id="confirmPaying"
          disabled={confirmPaying}
        >
          I confirm that the guest ({guests.fullName}) has paid the total price
          of{" "}
          {formatCurrency(totalPrice + breakfastPrice * Number(addBreakfast))}
          {addBreakfast
            ? `(${formatCurrency(totalPrice)}+${formatCurrency(
                breakfastPrice
              )})`
            : ""}{" "}
          for {numNights} nights .
        </CheckBox>
      </Box>
      <ButtonGroup>
        <Button
          disabled={!confirmPaying || isCheckingIn}
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
