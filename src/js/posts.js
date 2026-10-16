import { get } from "./api.js";

// NOTE - technically async is not needed below since the imported helper functions in api.js are returning the promise!!!

export function getPublishedBlogPosts() {
  return get("/api/posts/public");
}
