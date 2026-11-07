import {
  get,
  post,
  // put,
  patch,
  del,
} from "./api.js";

// NOTE and REMINDER - technically async is not needed below since the imported helper functions in api.js are returning the promise!!!

// NOTE - this gets all blog posts, published and unpublished, created by ADMIN and WRITER roles
export function getBlogPosts() {
  return get("/api/posts/");
}

export function createNewBlogPost(postTitle, postMessage) {
  return post("/api/posts/", {
    // REMINDER - the backend supplies userId from req.user.userId in the JWT
    // NOTE - do not use published here, this is a design choice
    post_title: postTitle,
    post_message: postMessage,
  });
}

// NEW, using patch here instead of put
export function editBlogPost(postId, postTitle, postMessage) {
  return patch(`/api/posts/${postId}`, {
    // NOTE - do not use published here, this is a design choice
    post_title: postTitle,
    post_message: postMessage,
  });
}

// NEW, using patch here instead of put
export function togglePublishedBlogPost(postId, published) {
  return patch(`/api/posts/publish/${postId}`, {
    // NOTE - published is used here, again, this is a design choice
    published,
  });
}

export function deleteBlogPost(postId) {
  return del(`/api/posts/${postId}`);
}
