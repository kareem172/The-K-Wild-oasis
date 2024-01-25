import { useCheckout } from "./useCheckout";
import propTypes from "prop-types";
import Button from "../../ui/Button";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckingOut}
      onClick={() => checkout(bookingId)}
    >
      Check out
    </Button>
  );
}

CheckoutButton.propTypes = {
  bookingId: propTypes.string.isRequired,
}

export default CheckoutButton;
