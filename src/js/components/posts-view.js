import { createButton, createElement } from "../templates.js";
import { formatExactDate } from "../../utils/format-date.utils.js";
import {
  renderUpdatePostForm,
  renderTogglePublishedForm,
  renderDeletePostForm,
  renderCreateCommentForm,
  renderUpdateCommentForm,
  renderDeleteCommentForm,
} from "./forms.js";
import { createDivRow } from "./reusables.js";

export function renderPosts(posts, currentUser) {
  const postsContainer = document.querySelector("#posts");

  currentUser
    ? (postsContainer.style.display = "flex")
    : (postsContainer.style.display = "none");

  // Clear the previous children
  postsContainer.replaceChildren();

  posts.forEach((post) => {
    const postArticle = renderPost(post, currentUser);
    const updatePostArticle = renderUpdatePostForm(
      post.id,
      post.postTitle,
      post.postMessage,
    );
    // TODO - do I need both below?
    postArticle.dataset.postId = post.id;
    postArticle.id = post.id;
    postsContainer.append(postArticle, updatePostArticle);
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

  postArticle.append(postTitle, postDetailsRow);

  // NOTE - ownership information can be used here to conditionally render the edit button once the current-user comparison is defined.
  if (currentUser !== null && currentUser.id === post.user.id) {
    const editButtonRow = createDivRow(
      "justify-content-start",
      "margin-post-button-rows",
    );

    const publishPostButton = renderTogglePublishedForm(
      post.id,
      post.published,
    );

    const editPostButton = createButton(
      "button",
      "Edit",
      "open-update-post-form",
      "edit-post-button",
    );
    editPostButton.dataset.postId = post.id;

    const deletePostButton = renderDeletePostForm(post.id);

    editButtonRow.append(publishPostButton, editPostButton, deletePostButton);
    postArticle.append(editButtonRow);
  }
  const hrLine = createElement("hr", "", "hr-line-post");

  const postMessage = createElement("p", post.postMessage, "post-message");

  postDetailsRow.append(postAuthor, postTimestamp);

  postArticle.append(hrLine, postMessage);

  if (currentUser) {
    const commentButtonRow = createDivRow(
      "justify-content-start",
      "margin-post-button-rows",
    );

    const commentButton = createButton(
      "button",
      "Comment",
      "open-create-comment-form",
      "comment-button",
    );

    // Identify which post the button belongs to.
    commentButton.dataset.postId = post.id;

    // Create Comment Form DOM elements should go after comment button, and be singular
    // NOTE - the use of "create-comment" below was used to avoid collisions with another form, see renderCreateCommentForm() in forms.js for more
    const createComment = renderCreateCommentForm(post.id, "create-comment");

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

  // Ownership information can be used here to conditionally render the following buttons.
  if (currentUser !== null && currentUser.id === comment.user.id) {
    const editButtonRow = createDivRow(
      "justify-content-end",
      "margin-post-button-rows",
    );

    const editCommentButton = createButton(
      "button",
      "Edit",
      "open-update-comment-form",
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
