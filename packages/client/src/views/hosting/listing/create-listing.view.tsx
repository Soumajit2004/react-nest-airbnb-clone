import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImageFile } from '../../../types/files/image-file.type.ts';
import { LatLngLiteral } from '../../../types/location.type.ts';
import { toast } from 'react-toastify';
import { CreateListingDto } from '../../../hooks/apiHooks/hosting/listing/dto/listing.dto.ts';
import CreateListingSuccessComponent from './components/create-listing-success.component.tsx';
import ImageDropzoneListingForm from './components/listing-form/add-listing-form/image-dropzone.component.tsx';
import LocationSelectorInput from './components/listing-form/add-listing-form/location-selector.component.tsx';
import { useMutateCreateListing } from '../../../hooks/apiHooks/hosting/listing/useCreateListing.ts';

type MetaDataInputs = {
  title: string
  description: string
  costing: number
}

export default function CreateListingView() {

  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MetaDataInputs>();

  const [files, setFiles] = useState<ImageFile[]>([]);
  const [location, setLocation] = useState<LatLngLiteral | null>(null);

  const { mutateAsync: createListing } = useMutateCreateListing({
    onSuccess: () => {
      toast.success('Listing created successfully');
    },
  });

  const onSubmit: SubmitHandler<MetaDataInputs> = async (hookFormData) => {

    if (!location) {
      toast.error('Please enter a valid location');
      return;
    }

    const createListingDto: CreateListingDto = {
      metadata: { location, ...hookFormData },
      images: files.map((file) => ({ category: 'exterior', imageFile: file })),
    };

    await createListing(createListingDto);

    setIsFormSubmitted(true);

    handleReset();
  };

  const handleReset = () => {
    reset();
    setFiles([]);
    setLocation(null);
  };

  const FormFields = () => (
    <>
      <input type="text" className="input input-bordered"
             placeholder="Title" {...register('title', { required: true })} />


      <label className="input input-bordered flex items-center gap-2">
        $
        <input type="number" className="grow"
               placeholder="Costing" {...register('costing', { required: true })} />
        per night
      </label>
      {errors.costing && <span>This field is required</span>}

      <textarea className="textarea textarea-bordered"
                placeholder="Description" {...register('description')}></textarea>
    </>
  );

  return isFormSubmitted ?
    (<CreateListingSuccessComponent />) :
    (<>
      <div className={'w-full mt-2 mb-8 flex items-center justify-between'}>
        <h3 className={'text-3xl font-bold'}>Become a host !</h3>

        <button value={'submit'} type={'submit'} form={'createListingForm'} className={'btn btn-primary'}>Create
          Listing
        </button>
      </div>


      <>
        <form id={'createListingForm'} className={'grid grid-cols-2 gap-4 pb-4'}
              onSubmit={handleSubmit(onSubmit)}>
          {/*image dropzone section*/}
          <div id={'image-dropzone'}>
            <ImageDropzoneListingForm files={files} setFiles={setFiles} />
          </div>

          <div className={'flex flex-col gap-4 bg-base-200 rounded-xl p-4'}>
            <FormFields />

            {/*location selection input*/}
            <LocationSelectorInput location={location} setLocation={setLocation} />
          </div>
        </form>
      </>
    </>);
}