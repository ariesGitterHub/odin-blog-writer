import { createButton, createElement } from "../templates.js";
import { formatExactDate } from "../../utils/format-date.utils.js";
import {
  // renderLoginForm,
  // renderCreatePostForm,
  renderDeletePostForm,
  renderCreateCommentForm,
  renderUpdateCommentForm,
  renderDeleteCommentForm,
} from "./forms.js";
import { createDivRow } from "./reusables.js";

// const userRoleMessage = createElement(
//   "p",
//   "☹️ Oops! It looks like you are currently a 'Bloggie Reader' user, but you aren't currently able to draft posts on 'Bloggie Writer.' You may still logout or make changes to your profile from this site.",
//   "error-message",
// );

export function renderPosts(posts, currentUser) {
  const postsContainer = document.querySelector("#posts");

  currentUser
    ? (postsContainer.style.display = "flex")
    : (postsContainer.style.display = "none");

  // Clear the previous children
  postsContainer.replaceChildren();

  posts.forEach((post) => {
    // postsContainer.style.border = "var(--border-basic)";
    const postArticle = renderPost(post, currentUser);
    postArticle.dataset.postId = post.id;
    postsContainer.append(postArticle);
  });
}

function renderPost(post, currentUser) {
  const postArticle = createElement("article", "", "post-article");

  const postTitle = createElement("h2", post.postTitle);

  const postDetailsRow = createElement(
    "div",
    "",
    "row-container",
    "justify-contents-start",
    "post-details-row",
  );

  const postAuthor = createElement(
    "p",
    `By: ${post.user.firstName} ${post.user.lastName}`,
    "post-author",
  );

  const postTimestamp = renderTimestamp(post.createdAt, post.updatedAt);

  const editButtonRow = createDivRow(
    "justify-content-start",
    "margin-post-button-rows",
  );

  // TODO - this is a temp dummy button
  const publishPostButton = createButton(
    "button",
    //  "Publish",
     post.published === true ? "Unpublish" : "Publish",
      "dummy",
       "publish-post-button"
      );

    publishPostButton.dataset.commentId = post.id;

   post.published !== true
     ? (publishPostButton.style.backgroundColor = "var(--red)")
     : (publishPostButton.style.backgroundColor = "var(--black)");

  const editPostButton = createButton(
    "button",
    "Edit",
    "open-update-post-form", // This data-action triggers case of the same name in events.js
    "edit-post-button",
  );
  editPostButton.dataset.postId = post.id;

  // TODO - this is a temp dummy button
  // const deletePostButton = createButton("button", "Delete", "dummy", "dummy");

  const deletePostButton = renderDeletePostForm(post.id); // TODO - create this, then delete dummy button above

  const hrLine = createElement("hr", "", "hr-line-post");

  const postMessage = createElement("p", post.postMessage, "post-message");

  postDetailsRow.append(postAuthor, postTimestamp);

  editButtonRow.append(publishPostButton, editPostButton, deletePostButton);

  postArticle.append(
    postTitle,
    // postAuthor,
    // postTimestamp,
    postDetailsRow,
    editButtonRow,
    hrLine,
    postMessage,
  );

  if (currentUser) {
    const commentButtonRow = createDivRow(
      "justify-content-start",
      "margin-post-button-rows",
    );

    const commentButton = createButton(
      "button",
      "Comment",
      "open-create-comment-form", // This data-action triggers case of the same name in events.js
      "comment-button",
    );

    // Identify which post the button belongs to.
    commentButton.dataset.postId = post.id;

    // Comment Draft DOM elements should go after comment button, and be singular
    const createComment = renderCreateCommentForm(post.id);

    commentButtonRow.append(commentButton);
    postArticle.append(commentButtonRow, createComment);
  }

  post.comments.forEach((comment) => {
    const renderExistingComment = renderComment(comment, currentUser);
    const renderUpdateComment = renderUpdateCommentForm(
      comment.id,
      comment.commentMessage,
    );
    postArticle.append(renderExistingComment, renderUpdateComment);
  });

  return postArticle;
}

function renderComment(comment, currentUser) {
  const commentArticle = createElement("article", "", "post-article-comment");
  commentArticle.id = comment.id;

  const authorName = `${comment.user.firstName} ${comment.user.lastName}`;

  const commentAuthor = createElement("h3", authorName);

  const commentTimestamp = renderTimestamp(
    comment.createdAt,
    comment.updatedAt,
  );

  const hrLine = createElement("hr", "", "hr-line-comment");

  const commentMessage = createElement(
    "p",
    comment.commentMessage,
    "post-comment-message",
  );

  commentArticle.append(
    commentAuthor,
    commentTimestamp,
    hrLine,
    commentMessage,
  );

  // Ownership information can be used here to conditionally render the edit button once the current-user comparison is defined.
  if (currentUser !== null && currentUser.id === comment.user.id) {
    const editButtonRow = createDivRow(
      "justify-content-end",
      "margin-post-button-rows",
    );

    const editCommentButton = createButton(
      "button",
      "Edit",
      "open-update-comment-form", // This data-action triggers case of the same name in events.js
      "edit-comment-button",
    );

    editCommentButton.dataset.commentId = comment.id;

    const deleteCommentButton = renderDeleteCommentForm(comment.id);

    editButtonRow.append(editCommentButton, deleteCommentButton);
    commentArticle.append(editButtonRow);
  }

  return commentArticle;
}

function renderTimestamp(createdAt, updatedAt) {
  if (createdAt === updatedAt) {
    return createElement(
      "p",
      `Created: ${formatExactDate(createdAt)}`,
      "time-stamp",
    );
  }

  return createElement(
    "p",
    `Updated: ${formatExactDate(updatedAt)}`,
    "time-stamp",
  );
}
