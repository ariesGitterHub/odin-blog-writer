import { get, post } from "./api.js";

// NOTE and REMINDER - technically async is not needed below since the imported helper functions in api.js are returning the promise!!!

export function login(email, password) {
  // NOTE - the blog writer gets its own special backend login due to only allowing roles for "ADMIN" and "WRITER"

  return post("/api/auth/writer-login", { // NOTE - "writer-login" here!!!
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
