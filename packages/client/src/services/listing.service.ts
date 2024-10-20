import { CreateListingDto } from '../dto/listing/create-listing.dto.ts';
import { listingApi } from '../api/hosting/listing.api.ts';
import { Listing } from '../types/listing/listing.type.ts';
import { toast } from 'react-toastify';


const createListing = async (createListingWithImageDto: CreateListingDto) => {
  const { metadata, images } = createListingWithImageDto;

  const response = await listingApi.createListing(metadata);

  const listingData: Listing = response.data;

  let imagesUploaded: number = 0;
  for (const image of images) {
    const promise = new Promise((resolve, reject) => {
      try {
        listingApi.uploadListingImage({ listingId: listingData.id, uploadListingImageDto: image });
        resolve(listingData);
      } catch (err) {
        reject(err);
      }
    });

    await toast.promise(promise, {
      pending: `Uploading image ${imagesUploaded} out of ${images.length}`,
      success: 'Image uploaded successfully',
      error: 'Image upload failed',
    });

    imagesUploaded++;
  }
};

export const listingService = {
  createListing,
};