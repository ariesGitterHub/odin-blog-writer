import { get, post, put, del } from "./api.js";

// NOTE and REMINDER - technically async is not needed below since the imported helper functions in api.js are returning the promise!!!

// TODO - remove /public below to start the ball rolling on get locking this down for just WRITER and ADMIN, but make sure that login is set up first!!!
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

export function editBlogPost(postId, postTitle, postMessage) {
  return put(`/api/posts/${postId}`, {
    // NOTE - do not use published here, this is a design choice
    post_title: postTitle,
    post_message: postMessage,
  });
}

export function togglePublishedBlogPost(postId, published) {
  return put(`/api/posts/publish/${postId}`, {
    // NOTE - published is used here, again, this is a design choice
    published,
  });
}

export function deleteBlogPost(postId) {
  return del(`/api/posts/${postId}`);
}
