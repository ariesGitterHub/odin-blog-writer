import { get, post, put, del } from "./api.js";
// get all users
// create a user
// update a user
// delete a user

export function getUsersForAdmin() {
  return get("/api/admin/");
}

export function getOneUserForAdmin(userId) {
  return get(`/api/admin/${userId}`);
}

export function updateUserByAdmin(userId, userData) {
  return put(`/api/admin/${userId}`, userData);
}

export function deleteUserByAdmin(userId) {
  return del(`/api/admin/${userId}`);
}