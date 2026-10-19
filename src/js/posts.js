import { get } from "./api.js";

// NOTE - technically async is not needed below since the imported helper functions in api.js are returning the promise!!!

// TODO - remove /public below to start the ball rolling on get locking this down for just WRITER and ADMIN, but make sure that login is set up first!!!
export function getBlogPosts() {
  return get("/api/posts/");
}
