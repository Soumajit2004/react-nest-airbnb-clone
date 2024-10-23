import { useJsApiLoader } from '@react-google-maps/api';

const useMapsAPILoader = ({ includedLibs }: { includedLibs: string[] }) => {
  return useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    libraries: includedLibs,
  });
};

export default useMapsAPILoader;