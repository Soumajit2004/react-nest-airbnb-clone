import api from "./api.ts";

const URLS = {
  signUpUsersUrl: "auth/signUp",
  signInUrl: "auth/signIn",
}

export const signUpUser = (data: { email: string, password: string }) => {
  return api.post(URLS.signUpUsersUrl, data)
}