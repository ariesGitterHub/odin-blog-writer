import {
  // put,
  patch,
  del,
} from "./api.js";

// NOTE and REMINDER - technically async is not needed below since the imported helper functions in api.js are returning the promise!!!

// NEW, using patch here instead of put
export function updateProfile(userData) {
  return patch("/api/user/profile", userData);
}

// NOTE - userId is not needed here since the backend gets the current user's ID from the authenticated JWT
export function deleteProfile() {
  return del("/api/user/profile");
}
