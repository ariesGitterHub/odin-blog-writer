import { post, put, del } from "./api.js";

// NOTE - technically async is not needed below since the imported helper functions in api.js are returning the promise!!!

export function createNewBlogComment(postId, commentMessage) {
  return post(`/api/post/${postId}`, {
    // The backend supplies userId
    comment_message: commentMessage,
  });
}

export function editBlogComment(commentId, commentMessage) {
  return put(`/api/post/${commentId}`, {
    comment_message: commentMessage,
  });
}

export function deleteBlogComment(commentId) {
  return del(`/api/post/${commentId}`);
}
