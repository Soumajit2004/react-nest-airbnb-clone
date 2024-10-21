import sadFaceSVG from '../../../../assets/images/sad-circle.svg';

export default function ReservationCardComponent() {
  return (
    <div className={'bg-base-200 w-full rounded-xl p-4'}>
      <h3 className={'text-xl font-bold mb-4'}>Reservations</h3>
      <div
        className={'border-4 border-dashed border-base-300 py-12 flex items-center justify-center text-gray-500 font-bold gap-4 rounded-xl'}>
        <img src={sadFaceSVG} alt={'sad-face'} className={'aspect-square h-20'} />
        <p>No reservations found</p>
      </div>
    </div>
  );
}