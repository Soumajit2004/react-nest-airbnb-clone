import ImageDropzoneListingForm from './image-dropzone.component.tsx';
import { useState } from 'react';
import LocationSelectorInput from './location-selector.component.tsx';
// import { useForm } from 'react-hook-form';
import { LatLngLiteral } from '../../../../../types/location.type.ts';
import DashedBox from '../../../../../components/common/dashed-box.component.tsx';
import { ImageFile } from '../../../../../types/files/image-file.type.ts';

// type AddListingFormInputs = {
//   title: string
//   description: string
//   files: File[]
//   location: LatLngLiteral
// }

export default function AddListingFormComponent() {

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<AddListingFormInputs>();

  const [files, setFiles] = useState<ImageFile[]>([]);
  const [location, setLocation] = useState<LatLngLiteral | null>(null);


  return (
    <form className={'grid grid-cols-2 gap-4'}>
      <div id={'image-dropzone'}>
        <DashedBox>
          <h4 className="font-bold text-xl">Image Upload</h4>

          <ImageDropzoneListingForm files={files} setFiles={setFiles} />
        </DashedBox>
      </div>

      <div className={'flex flex-col gap-4'}>
      <DashedBox>
          <h4 className="font-bold text-xl">Listing Info</h4>
          <input type="text" placeholder="Title" className="input input-bordered w-full" />
          <textarea className="textarea textarea-bordered" placeholder="Description"></textarea>
        </DashedBox>

        <LocationSelectorInput location={location} setLocation={setLocation} />

        <div className={'w-full grid grid-cols-2 gap-4'}>
          <button type={'reset'} className={'btn btn-base'}>Reset</button>
          <button type={'submit'} className={'btn btn-primary'}>Create</button>
        </div>
      </div>
    </form>
  );
}