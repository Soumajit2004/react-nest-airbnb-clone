import {AxiosError} from "axios";

export const extractApiError = (error: AxiosError) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return error.response?.data?.message || error.message;
}