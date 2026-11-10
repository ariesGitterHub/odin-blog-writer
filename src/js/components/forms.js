import {
  createButton,
  createLabel,
  createInput,
  createElement,
  createImage,
} from "../templates.js";

import {
  createClearButton,
  createShowPasswordButton,
  createSubmitButton,
  createDivRow,
} from "./reusables.js";

export function renderLoginForm() {
  const loginForm = createElement("form", "", "login-form");

  const titleRow = createDivRow("justify-content-start", "margin-top");

  const appLogo = createImage(
    "/public/favicon.svg",
    "Quill logo",
    "app-logo-image",
  );

  const title = createElement("h1", "Login");

  const waitMessage = createElement("div", "Please be patient while the server wakes itself up.", "wait-message");
  const errorMessage = createElement("div", "", "error-login", "error-message");

  const emailLabel = createLabel("email-login", "Email");

  const emailInput = createInput(
    "email-login",
    "email",
    "email",
    "Enter email address",
    true,
  );
  emailInput.setAttribute("autocomplete", "username");

  const passwordLabel = createLabel("password-login", "Password");

  const passwordRow = createDivRow();

  const passwordInput = createInput(
    "password-login",
    "password",
    "password",
    "Enter password",
    true,
  );
  passwordInput.setAttribute("autocomplete", "current-password");

  const showPasswordButton = createShowPasswordButton();

  const showPasswordButtonImage = createImage(
    "/public/assets/eye-off.svg",
    "an eye icon that toggles open and closed",
    "show-password-button-image",
  );
  showPasswordButtonImage.setAttribute(
    "id",
    "show-password-button-image-login",
  );

  const buttonRow = createDivRow("full-width", "gap", "margin-top-bottom");

  const submitButton = createSubmitButton();
  submitButton.classList.add("full-width");

  const clearButton = createButton("button", "Clear", "clear-login-form", "full-width");

  titleRow.append(appLogo, title);

  showPasswordButton.append(showPasswordButtonImage);

  passwordRow.append(passwordInput, showPasswordButton);

  buttonRow.append(submitButton, clearButton);

  loginForm.append(
    titleRow,
    waitMessage,
    errorMessage,
    emailLabel,
    emailInput,
    passwordLabel,
    passwordRow,
    buttonRow,
  );

  return loginForm;
}

export function renderProfileForm() {
  const profileForm = createElement("form", "", "profile-form");

  const titleRow = createDivRow("justify-content-start");

  const appLogo = createImage(
    "/public/favicon.svg",
    "Quill logo",
    "app-logo-image",
  );

  const title = createElement("h1", "Edit Profile");

  const errorMessage = createElement(
    "div",
    "",
    "error-profile",
    "error-message",
  );

  const firstNameLabel = createLabel("first-name-profile", "First Name");
  const firstNameInput = createInput(
    "first-name-profile",
    "text",
    "first_name",
    "",
  );

  const lastNameLabel = createLabel("last-name-profile", "Last Name");
  const lastNameInput = createInput(
    "last-name-profile",
    "text",
    "last_name",
    "",
  );

  const emailLabel = createLabel("email-profile", "Email");
  const emailInput = createInput("email-profile", "email", "email", "");
  emailInput.setAttribute("autocomplete", "username");

  const passwordLabel = createLabel("password-profile", "New Password");

  const passwordRow = createDivRow();

  const passwordInput = createInput(
    "password-profile",
    "password",
    "password",
    "",
  );

  passwordInput.setAttribute("autocomplete", "new-password");

  const showPasswordButton = createShowPasswordButton();

  const showPasswordButtonImage = createImage(
    "/public/assets/eye-off.svg",
    "an eye icon that toggles open and closed",
    "show-password-button-image",
  );

  showPasswordButtonImage.setAttribute(
    "id",
    "show-password-button-image-profile",
  );

  const buttonRow = createDivRow("full-width", "gap", "margin-top");

  const submitButton = createSubmitButton();
  submitButton.classList.add("full-width");

  const clearButton = createClearButton();

  const deleteProfileButton = createButton(
    "button",
    "Delete",
    "open-profile-delete-confirmation", 
    "full-width",
  );

  titleRow.append(appLogo, title);

  showPasswordButton.append(showPasswordButtonImage);

  passwordRow.append(passwordInput, showPasswordButton);

  buttonRow.append(submitButton, clearButton, deleteProfileButton);

  profileForm.append(
    titleRow,
    errorMessage,
    firstNameLabel,
    firstNameInput,
    lastNameLabel,
    lastNameInput,
    emailLabel,
    emailInput,
    passwordLabel,
    passwordRow,
    buttonRow,
  );

  return profileForm;
}

export function renderConfirmProfileDeleteForm() {
  // NOTE - this is hidden until deleteProfileButton is clicked
  const confirmProfileDeleteForm = createElement(
    "form",
    "",
    "confirm-profile-delete-form",
  );

  const hrLineTop = createElement("hr", "", "hr-line-warning");

  const deleteProfileMessage = createElement(
    "p",
    "Are you sure that you wish to delete your account? This action is permanent.",
    "error-form",
    "error-warning",
  );

  const hrLineBottom = createElement("hr", "", "hr-line-warning");

  // Submits the actual account profile deletion
  const confirmProfileDeleteButton = createButton(
    "submit",
    "Confirm",
    "",
    "full-width",
  );

  // Cancels account profile deletion
  const cancelProfileDeleteButton = createButton(
    "button",
    "Cancel",
    "cancel-profile-delete-confirmation", // This data-action triggers case of the same name in events.js
    "full-width",
  );

  const buttonRow = createDivRow("full-width", "gap");

  buttonRow.append(confirmProfileDeleteButton, cancelProfileDeleteButton);

  confirmProfileDeleteForm.append(
    hrLineTop,
    deleteProfileMessage,
    hrLineBottom,
    buttonRow,
  );

  return confirmProfileDeleteForm;
}

export function renderCreatePostForm(postId) {
    const createPostForm = createElement("form", "", "create-post-form");
    createPostForm.id = postId;

    const postDiv = createElement("div", "", "create-post-div");

    const postTitleLabel = createLabel("create-post-title", "New Post Title");

    const postTitleInput = createInput(
      "create-post-title",
      "text",
      "post_title",
      "Enter new post title",
      true,
    );

    postTitleInput.maxLength = 100;

    const messageRow = createDivRow("gap", "justify-content-start");

    const maxCharLimitMessage = createElement(
      "p",
      "255 Character Limit",
      "max-char-limit",
    );
    maxCharLimitMessage.id = `max-char-limit-${postId}`;

    const textArea = createElement("textarea", "");
    textArea.id = `textarea-${postId}`;
    textArea.name = "post_message";
    textArea.maxLength = 255;

    const buttonRow = createDivRow("justify-content-end");

    const submitButton = createSubmitButton();
    submitButton.dataset.postId = postId;

    const cancelButton = createButton(
      "button",
      "Cancel",
      "cancel-new-post-form",
    );

    messageRow.append(maxCharLimitMessage);

    buttonRow.append(submitButton, cancelButton);
    postDiv.append(
      postTitleLabel,
      postTitleInput,
      messageRow,
      textArea,
      buttonRow,
    );
    createPostForm.append(postDiv);

    return createPostForm;
}

export function renderUpdatePostForm(postId, postTitle, postMessage) {
  const updatePostForm = createElement("form", "", "update-post-form");
  updatePostForm.id = `update-post-form-${postId}`;
  updatePostForm.dataset.postId = postId;

  const updatePostDiv = createElement("div", "", "update-post-div");

  const updatePostTitle = createElement("h2", "Edit Post");

  const updatePostTitleLabel = createLabel(`update-post-title-${postId}`, "Post Title");

  const updatePostTitleInput = createInput(
    `update-post-title-${postId}`,
    "text",
    "post_title",
    "",
  );
  updatePostTitleInput.value = postTitle;
  updatePostTitleInput.maxLength = 100;

  const messageRow = createDivRow("gap", "justify-content-start");

  const maxCharLimitMessage = createElement(
    "p",
    "255 Character Limit",
    "max-char-limit",
  );
  maxCharLimitMessage.id = `max-char-limit-${postId}`;

  const textArea = createElement("textarea", "");
  textArea.id = `textarea-${postId}`;
  textArea.name = "post_message";
  textArea.value = postMessage
  textArea.maxLength = 255;

  const buttonRow = createDivRow("justify-content-end");

  const submitButton = createSubmitButton();
  submitButton.dataset.postId = postId;

  const cancelButton = createButton(
    "button",
    "Cancel",
    "cancel-update-post-form", 
  );
  cancelButton.dataset.postId = postId;

  messageRow.append(maxCharLimitMessage);

  buttonRow.append(submitButton, cancelButton);

  updatePostDiv.append(
    updatePostTitle,
    updatePostTitleLabel,
    updatePostTitleInput,
    messageRow,
    textArea,
    buttonRow,
  );

  updatePostForm.append(updatePostDiv);

  return updatePostForm;
}

export function renderTogglePublishedForm(postId, published) {
  const togglePublishedPostForm = createElement("form", "", "toggle-published-post-form");
  togglePublishedPostForm.dataset.postId = postId;

    const publishPostButton = createButton(
      "submit",
      [published === true ? "Unpublish" : "Publish"],
      "",
      "publish-post-button",
    );

    // NOTE - publishPostButton must read initial/current state
    published === true
      ? (publishPostButton.dataset.published = "true")
      : publishPostButton.dataset.published = "false";

    published === true
      ? (publishPostButton.style.backgroundColor = "var(--black)")
      : (publishPostButton.style.backgroundColor = "var(--red)");

  // publishPostButton.dataset.postId = postId;
  publishPostButton.id = `publish-post-button-${postId}`;

    const publishedInput = createInput(
      `published-${postId}`,
      "checkbox",
      "published",
      "",
    );
    publishedInput.style.display = "none";
    publishedInput.checked = published;

  togglePublishedPostForm.append(publishPostButton, publishedInput);

  return togglePublishedPostForm;
}

export function renderDeletePostForm(postId) {
  const deletePostForm = createElement("form", "", "delete-post-form");
  deletePostForm.dataset.postId = postId;

  const deletePostButton = createButton(
    "submit",
    "Delete",
    "",
    "delete-post-button",
  );

  deletePostButton.dataset.postId = postId;

  deletePostForm.append(deletePostButton);

  return deletePostForm;
}

// NOTE - This is where I was having a collision with "maxCharLimitMessage.id = `max-char-limit-${postId}`;" and "textArea.id = `textarea-${postId}`;" Both createCommentForm and updatePostForm were using this; I added createComment to pad the id for both textArea and maxCharLimitMessage below
export function renderCreateCommentForm(postId, createComment) {
  const createCommentForm = createElement("form", "", "create-comment-form");
  createCommentForm.id = `create-comment-form-${postId}`;
  createCommentForm.dataset.postId = postId;

  const createCommentDiv = createElement("div", "", "create-comment-div");

  const messageRow = createDivRow("gap", "justify-content-start");

  const maxCharLimitMessage = createElement(
    "p",
    "255 Character Limit",
    "max-char-limit",
  );
  maxCharLimitMessage.id = `max-char-limit-${createComment}-${postId}`;

  const textArea = createElement("textarea", "");
  textArea.id = `textarea-${createComment}-${postId}`;
  textArea.name = "comment_message";
  textArea.maxLength = 255;

  const buttonRow = createDivRow("justify-content-end");

  const submitButton = createSubmitButton();
  submitButton.dataset.postId = postId;

  const cancelButton = createButton(
    "button",
    "Cancel",
    "cancel-create-comment-form", 
  );

  cancelButton.dataset.postId = postId;

  messageRow.append(maxCharLimitMessage);
  buttonRow.append(submitButton, cancelButton);
  createCommentDiv.append(messageRow, textArea, buttonRow);
  createCommentForm.append(createCommentDiv);

  return createCommentForm;
}

export function renderUpdateCommentForm(commentId, commentMessage) {
  const updateCommentForm = createElement("form", "", "update-comment-form");
  updateCommentForm.id = `update-comment-form-${commentId}`;
  updateCommentForm.dataset.commentId = commentId;

  const updateCommentDiv = createElement("div", "", "update-comment-div");

  const messageRow = createDivRow("gap", "justify-content-start");

  const maxCharLimitMessage = createElement(
    "p",
    "255 Character Limit",
    "max-char-limit",
  );
  maxCharLimitMessage.id = `max-char-limit-${commentId}`;

  const textArea = createElement("textarea", "");
  textArea.id = `textarea-${commentId}`;
  textArea.name = "comment_message";
  textArea.value = commentMessage;
  textArea.maxLength = 255;

  const buttonRow = createDivRow("justify-content-end");

  const submitButton = createSubmitButton();
  submitButton.dataset.commentId = commentId;

  const cancelButton = createButton(
    "button",
    "Cancel",
    "cancel-update-comment-form",
  );
  cancelButton.dataset.commentId = commentId;

  messageRow.append(maxCharLimitMessage);
  buttonRow.append(submitButton, cancelButton);
  updateCommentDiv.append(messageRow, textArea, buttonRow);
  updateCommentForm.append(updateCommentDiv);

  return updateCommentForm;
}

export function renderDeleteCommentForm(commentId) {
  const deleteCommentForm = createElement("form", "", "delete-comment-form");
  deleteCommentForm.dataset.commentId = commentId;

  const deleteCommentButton = createButton(
    "submit",
    "Delete",
    "",
    "delete-comment-button",
  );

  deleteCommentButton.dataset.commentId = commentId;

  deleteCommentForm.append(deleteCommentButton);

  return deleteCommentForm;
}

export function renderAdminEditUserForm() {
  const adminEditUserForm = createElement("form", "", "admin-edit-user-form");

  const titleRow = createDivRow("justify-content-start");

  const gearIcon = createImage(
    "/public/assets/gear-icon.svg",
    "Gear icon",
    "gear-icon-image",
  );

  const title = createElement("h1", "Edit User");

  const errorMessage = createElement(
    "div",
    "",
    "error-admin-edit-user",
    "error-message",
  );

  const firstNameLabel = createLabel(
    "first-name-admin-edit-user",
    "First Name",
  );
  const firstNameInput = createInput(
    "first-name-admin-edit-user",
    "text",
    "first_name",
    "",
  );

  const lastNameLabel = createLabel("last-name-admin-edit-user", "Last Name");
  const lastNameInput = createInput(
    "last-name-admin-edit-user",
    "text",
    "last_name",
    "",
  );

  const roleLabel = createLabel("role-admin-edit-user", "Role");

  // Create the select role dropdown container
  const selectRoleDropdown = document.createElement("select");
  selectRoleDropdown.id = "role-admin-edit-user";
  selectRoleDropdown.name = "role";

  // Define the data array for the options
  const selectRoleOptions = [
    { value: "", text: "Choose a new role" },
    { value: "USER", text: "User (Reader Only)" },
    { value: "WRITER", text: "Writer" },
    { value: "ADMIN", text: "Admin" },
  ];

  // Loop through data, create option elements, and add them to the select element
  selectRoleOptions.forEach((optionData) => {
    const roleOption = document.createElement("option");
    roleOption.value = optionData.value;
    roleOption.textContent = optionData.text; // Prevents HTML injection bugs

    selectRoleDropdown.appendChild(roleOption);
  });

  const emailLabel = createLabel("email-admin-edit-user", "Email");
  const emailInput = createInput("email-admin-edit-user", "email", "email", "");
  emailInput.setAttribute("autocomplete", "username");

  // Create the select email verified dropdown container
  const emailVerifiedLabel = createLabel("email-verified-admin-edit-user", "Email Verified");
  const selectEmailVerifiedDropdown = document.createElement("select");
  selectEmailVerifiedDropdown.id = "email-verified-admin-edit-user";
  selectEmailVerifiedDropdown.name = "email_verified";

  // Define the data array for the options
  const selectEmailVerifiedOptions = [
    { value: "", text: "Email is verified..." },
    { value: "false", text: "🔴 False" },
    { value: "true", text: "🟢 True" },
  ];

  // Loop through data, create option elements, and add them to the select element
  selectEmailVerifiedOptions.forEach((optionData) => {
    const emailVerifiedOption = document.createElement("option");
    emailVerifiedOption.value = optionData.value;
    emailVerifiedOption.textContent = optionData.text; // Prevents HTML injection bugs

    selectEmailVerifiedDropdown.appendChild(emailVerifiedOption);
  });

  const passwordLabel = createLabel("password-admin-edit-user", "New Password");

  const passwordRow = createDivRow();

  const passwordInput = createInput(
    "password-admin-edit-user",
    "password",
    "password",
    "",
  );

  passwordInput.setAttribute("autocomplete", "new-password");

  const showPasswordButton = createShowPasswordButton();

  const showPasswordButtonImage = createImage(
    "/public/assets/eye-off.svg",
    "an eye icon that toggles open and closed",
    "show-password-button-image",
  );

  showPasswordButtonImage.setAttribute(
    "id",
    "show-password-button-image-admin-edit-user",
  );

  const buttonRow = createDivRow("full-width", "gap", "margin-top");

  const submitButton = createSubmitButton();
  submitButton.classList.add("full-width");

  const deleteUserButton = createButton(
    "button",
    "Delete",
    "open-admin-edit-user-delete-confirmation",
    "admin-edit-user-delete-button",
    "full-width",
  );

  titleRow.append(gearIcon, title);
  showPasswordButton.append(showPasswordButtonImage);
  passwordRow.append(passwordInput, showPasswordButton);
  buttonRow.append(submitButton, deleteUserButton);
  adminEditUserForm.append(
    titleRow,
    errorMessage,
    firstNameLabel,
    firstNameInput,
    lastNameLabel,
    lastNameInput,
    roleLabel,
    selectRoleDropdown,
    emailLabel,
    emailInput,
    emailVerifiedLabel,
    selectEmailVerifiedDropdown,
    passwordLabel,
    passwordRow,
    buttonRow,
  );

  return adminEditUserForm;
}

export function renderConfirmAdminDeleteUserForm() {
  // NOTE - this is hidden until deleteProfileButton is clicked
  const confirmAdminDeleteUserForm = createElement(
    "form",
    "",
    "confirm-admin-delete-user-form",
  );

  const hrLineTop = createElement("hr", "", "hr-line-warning");

  const adminDeleteUserMessage = createElement(
    "p",
    "Are you sure that you wish to delete this user? This action is permanent.",
    "error-form",
    "error-warning",
  );

  const hrLineBottom = createElement("hr", "", "hr-line-warning");

  const confirmAdminDeleteUserButton = createButton(
    "submit",
    "Confirm",
    "",
    "full-width",
  );

  const cancelAdminDeleteUserButton = createButton(
    "button",
    "Cancel",
    "cancel-admin-delete-user-confirmation",
    "full-width",
  );

  const buttonRow = createDivRow("full-width", "gap");

  buttonRow.append(confirmAdminDeleteUserButton, cancelAdminDeleteUserButton);

  confirmAdminDeleteUserForm.append(
    hrLineTop,
    adminDeleteUserMessage,
    hrLineBottom,
    buttonRow,
  );

  return confirmAdminDeleteUserForm;
}
