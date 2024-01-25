import { Link } from "react-router-dom";
import styled from "styled-components";
import propTypes from "prop-types";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--type-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { guests, id, numNights, status } = activity;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="blue">arriving</Tag>}
      {status === "checked-in" && <Tag type="green">departing</Tag>}
      <Flag src={guests.countryFlag} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} Nights</div>
      {status === "unconfirmed" && (
        <Button size="small" variation="primary" as={Link} to={`/checkIn/${id}`}>
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

TodayItem.propTypes = {
  activity: propTypes.object.isRequired,
};

export default TodayItem;
