import { get, post, put, del } from "./api.js";

// NOTE - technically async is not needed below since the imported helper functions in api.js are returning the promise!!!

// TODO - remove /public below to start the ball rolling on get locking this down for just WRITER and ADMIN, but make sure that login is set up first!!!
export function getBlogPosts() {
  return get("/api/posts/");
}

export function createNewBlogPost(postTitle, postMessage) {
  return post("/api/posts/", {
    // The backend supplies userId
    // published: published,
    post_title: postTitle,
    post_message: postMessage,
  });
}

export function editBlogPost(postId, published, postTitle, postMessage) {
  return put(`/api/posts/${postId}`, {
    published: published,
    post_title: postTitle,
    post_message: postMessage,
  });
}

export function togglePublishBlogPost(postId, published) {
  return put(`/api/posts/${postId}`, {
    published: published,
  });
}

export function deleteBlogPost(postId) {
  return del(`/api/posts/${postId}`);
}
