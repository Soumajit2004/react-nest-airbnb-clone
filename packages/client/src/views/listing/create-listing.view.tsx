import AddListingFormComponent from './components/listing-form/add-listing-form/add-listing-form.component.tsx';

export default function CreateListingView() {

  return (
    <>
      <h3 className={'text-3xl font-bold my-5'}>Create new listing</h3>

      <AddListingFormComponent />
    </>
  );
}