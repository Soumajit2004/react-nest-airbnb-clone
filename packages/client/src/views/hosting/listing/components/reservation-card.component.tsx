import EmptyCard from '../../../../components/common/cards/empty-card.component.tsx';

export default function ReservationCardComponent() {
  return (
    <EmptyCard className={"h-80"}>
      <p>No reservations found</p>
    </EmptyCard>
  );
}