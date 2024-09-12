import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type ImageDropzoneProps = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ImageDropzoneListingForm({ files, setFiles }: ImageDropzoneProps) {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(files);

    setFiles(previousFiles => [
      ...previousFiles,
      ...acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) })),
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  return (
    <>
      <div
        className={'bg-base-100 h-24 border-4 border-dashed rounded-xl flex justify-center items-center text-base-300 mb-4'} {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the images here ...</p> :
            <p>Drag 'n' drop images here, or click to select images</p>
        }
      </div>

      {/*<div className={'flex gap-4'}>*/}
      {/*  <h4 className={'font-bold text-xl'}>Image Preview</h4>*/}
      {/*</div>*/}
    </>
  );
}