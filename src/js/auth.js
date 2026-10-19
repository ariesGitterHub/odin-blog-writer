import { get, post } from "./api.js";

// NOTE - technically async is not needed below since the imported helper functions in api.js are returning the promise!!!

// export function login(email, password) {
//   return post("/api/auth/login", {
//   // return post("/api/auth/login-writer", {
//     email,
//     password,
//   });
// }
export function login(email, password) {
  return post("/api/auth/writer-login", {
  // return post("/api/auth/login-writer", {
    email,
    password,
  });
}

export function logout() {
  return post("/api/auth/logout");
}

export function getCurrentUser() {
  return get("/api/auth/me");
}
