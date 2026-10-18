import { createButton, createElement } from "../templates.js";
import { formatExactDate } from "../../utils/format-date.utils.js";
import {
  renderLoginForm,
  renderCreateCommentForm,
  renderUpdateCommentForm,
  renderDeleteCommentForm,
} from "./forms.js";
import { createDivRow } from "./reusables.js";

export function renderPosts(posts, currentUser) {
  const postsContainer = document.querySelector("#posts");
  const loginForm = renderLoginForm();

  postsContainer.replaceChildren();

  if (currentUser && currentUser.role === "ADMIN" || currentUser && currentUser.role === "WRITER") {
    posts.forEach((post) => {
      postsContainer.style.border = "var(--border-basic)";
      const postArticle = renderPost(post, currentUser);
      postsContainer.append(postArticle);
    });    
  } else if (!currentUser) {
    postsContainer.style.border = "none"
    postsContainer.append(loginForm);
  }
}

function renderPost(post, currentUser) {
  const postArticle = createElement("article", "", "post-article");

  const postTitle = createElement("h2", post.postTitle);

  const postTimestamp = renderTimestamp(post.createdAt, post.updatedAt);

  const editButtonRow = createDivRow(
    "justify-content-start",
    "margin-post-button-rows",
  );

    // TODO - this is a temp dummy button
  const publishPostButton = createButton(
    "button",
    "Publish",
    "dummy",
    "dummy",
  );


  const editPostButton = createButton(
    "button",
    "Edit",
    "open-update-post-form", // This data-action triggers case of the same name in events.js
    "edit-post-button",
  );

  // TODO - this is a temp dummy button
  const deletePostButton = createButton(
    "button",
    "Delete",
    "dummy",
    "dummy",
  );


  // const deletePostButton = renderDeletePostForm(post.id); // TODO - create this, then delete dummy button above

  const hrLine = createElement("hr", "", "hr-line-post");

  const postMessage = createElement("p", post.postMessage, "post-message");

  editButtonRow.append(
    publishPostButton,
    editPostButton,
    deletePostButton,
  );

  postArticle.append(
    postTitle,
    postTimestamp,
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
