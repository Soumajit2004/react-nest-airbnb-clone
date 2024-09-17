import ImageDropzoneListingForm from './components/image-dropzone.component.tsx';
import { useState } from 'react';
import LocationSelectorInput from './components/location-selector.component.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LatLngLiteral } from '../../../../../types/location.type.ts';
import DashedBox from '../../../../../components/common/dashed-box.component.tsx';
import { ImageFile } from '../../../../../types/files/image-file.type.ts';
import { toast } from 'react-toastify';
import { listingService } from '../../../../../services/listing.service.ts';
import { ListingImageCategory } from '../../../../../types/listing/listing-image.type.ts';
import { extractApiError } from '../../../../../utils/error/extractApiError.ts';
import { AxiosError } from 'axios';
import CreateListingSuccessComponent from '../../add-listing-success.component.tsx';

type MetaDataInputs = {
  title: string
  description: string
  costing: number
}

export default function AddListingFormComponent() {

  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MetaDataInputs>();

  const [files, setFiles] = useState<ImageFile[]>([]);
  const [location, setLocation] = useState<LatLngLiteral | null>(null);

  const onSubmit: SubmitHandler<MetaDataInputs> = async (hookFormData) => {
    if (!location) {
      toast.error('Please enter a valid location');
      return;
    }

    try {
      await listingService.createListing({
        metadata: { ...hookFormData, location },
        images: files.map((imageFile: ImageFile) => {
          return { category: ListingImageCategory.EXTERIOR, imageFile };
        }),
      });

      setIsFormSubmitted(true);
    } catch (err) {
      toast.error(extractApiError(err as AxiosError));
    }
  };

  const handleReset = () => {
    reset();
    setFiles([]);
    setLocation(null);
  };

  return (
    <>
      {
        isFormSubmitted && (
          <CreateListingSuccessComponent />
        )
      }

      {
        !isFormSubmitted && (
          <form className={'grid grid-cols-2 gap-4 pb-4'} onSubmit={handleSubmit(onSubmit)}>
            {/*image dropzone section*/}
            <div id={'image-dropzone'}>
              <DashedBox>
                <h4 className="font-bold text-xl">Image Upload</h4>

                <ImageDropzoneListingForm files={files} setFiles={setFiles} />
              </DashedBox>
            </div>

            <div className={'flex flex-col gap-4'}>
              <DashedBox>
                <h4 className="font-bold text-xl">Listing Info</h4>

                <input type="text" className="input input-bordered"
                       placeholder="Title" {...register('title', { required: true })} />


                <label className="input input-bordered flex items-center gap-2">
                  $
                  <input type="text" className="grow"
                         placeholder="Costing" {...register('costing', { required: true })} />
                  / day
                </label>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/*@ts-expect-error*/}
                {errors['rentRequired'] && <span>This field is required</span>}

                <textarea className="textarea textarea-bordered"
                          placeholder="Description" {...register('description')}></textarea>
              </DashedBox>

              {/*location selection input*/}
              <LocationSelectorInput location={location} setLocation={setLocation} />

              <div className={'w-full grid grid-cols-2 gap-4'}>
                <button type={'reset'} onClick={handleReset} className={'btn btn-base'}>Reset</button>
                <button type={'submit'} className={'btn btn-primary'}>Create</button>
              </div>
            </div>
          </form>
        )
      }
    </>

  );
}