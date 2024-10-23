import AddListingFormComponent from './components/listing-form/add-listing-form/add-listing-form.component.tsx';

export default function CreateListingView() {

  return (
    <>
      <h3 className={'text-3xl font-bold mt-5 mb-10'}>Become a host !</h3>

      <AddListingFormComponent />
    </>
  );
}