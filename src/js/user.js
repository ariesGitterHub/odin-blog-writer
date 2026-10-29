import { put, del } from "./api.js";

// NOTE and REMINDER - technically async is not needed below since the imported helper functions in api.js are returning the promise!!!

export function updateProfile(userData) {
  console.log("updateProfile arguments:", userData);

  return put("/api/user/profile", userData);
}

// NOTE - userId is not needed here since the backend gets the current user's ID from the authenticated JWT
export function deleteProfile() {
  return del("/api/user/profile");
}
