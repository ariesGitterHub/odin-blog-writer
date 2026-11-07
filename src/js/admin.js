import {
  get,
  // post,
  // put,
  patch,
  del,
} from "./api.js";

export function getUsersForAdmin() {
  return get("/api/admin/");
}

export function getOneUserForAdmin(userId) {
  return get(`/api/admin/${userId}`);
}

// NEW, using patch here instead of put
export function updateUserByAdmin(userId, userData) {
  return patch(`/api/admin/${userId}`, userData);
}

export function deleteUserByAdmin(userId) {
  return del(`/api/admin/${userId}`);
}
