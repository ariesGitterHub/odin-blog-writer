import {
  post,
  //  put,
  patch,
  del,
} from "./api.js";

// NOTE and REMINDER - technically async is not needed below since the imported helper functions in api.js are returning the promise!!!

export function createNewBlogComment(postId, commentMessage) {
  return post(`/api/post/${postId}`, {
    // REMINDER - the backend supplies userId from req.user.userId in the JWT
    comment_message: commentMessage,
  });
}

// NEW, using patch here instead of put
export function editBlogComment(commentId, commentMessage) {
  return patch(`/api/post/${commentId}`, {
    comment_message: commentMessage,
  });
}

export function deleteBlogComment(commentId) {
  return del(`/api/post/${commentId}`);
}
