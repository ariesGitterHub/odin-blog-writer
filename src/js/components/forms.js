// Import these rendering form functions to where they are needed

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
  // const loginFormContainer = createElement("div", "", "login-form-container");

  const loginForm = createElement("form", "", "login-form");

  const titleRow = createDivRow("justify-content-start", "margin-top");

  const appLogo = createImage("/favicon.svg", "Quill logo", "app-logo-image");

  const title = createElement("h1", "Login");

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
    "/assets/eye-off.svg",
    "an eye icon that toggles open and closed",
    "show-password-button-image",
  );
  showPasswordButtonImage.setAttribute(
    "id",
    "show-password-button-image-login",
  );

  const buttonRow = createDivRow("full-width", "gap", "margin-top-bottom");

  // const submitButton = createButton("submit", "Submit", "", "full-width");

  const submitButton = createSubmitButton();
  submitButton.classList.add("full-width");

  // const clearButton = createClearButton(); // Making this without reusables.js to see if it works 
  const clearButton = createButton("button", "Clear", "clear-login-form", "full-width");

  titleRow.append(appLogo, title);

  showPasswordButton.append(showPasswordButtonImage);

  passwordRow.append(passwordInput, showPasswordButton);

  buttonRow.append(submitButton, clearButton);

  loginForm.append(
    titleRow,
    errorMessage,
    emailLabel,
    emailInput,
    passwordLabel,
    passwordRow,
    buttonRow,
  );

  // loginFormContainer.append(loginForm);

  return loginForm;
  // return loginFormContainer;
}

export function renderProfileForm() {
  const profileForm = createElement("form", "", "profile-form");

  const titleRow = createDivRow("justify-content-start");

  const appLogo = createImage("/favicon.svg", "Quill logo", "app-logo-image");

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
    "/assets/eye-off.svg",
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
    "open-profile-delete-confirmation", // This data-action triggers case of the same name in events.js
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
    "error-message",
  );

  const errorMessage = createElement(
    "div",
    "",
    "error-confirm-profile-delete",
    "error-message",
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
    "close-profile-delete-confirmation", // This data-action triggers case of the same name in events.js
    "full-width",
  );

  const buttonRow = createDivRow("full-width", "gap");

  buttonRow.append(confirmProfileDeleteButton, cancelProfileDeleteButton);

  confirmProfileDeleteForm.append(
    hrLineTop,
    deleteProfileMessage,
    errorMessage,
    hrLineBottom,
    buttonRow,
  );

  return confirmProfileDeleteForm;
}

// Blog post forms
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

    postTitleInput.maxLength = 255;

    const messageRow = createDivRow("gap", "justify-content-start");

    const maxCharLimitMessage = createElement(
      "p",
      "255 Character Limit",
      "max-char-limit",
    );
    maxCharLimitMessage.id = `max-char-limit-${postId}`;
    // maxCharLimitMessage.id = `max-char-limit-create-post`;

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
      "cancel-new-post-form", // This data-action triggers case of the same name in events.js
      // TODO - add above to events.js
    );

    // cancelButton.dataset.postId = postId;

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

// export function renderUpdatePostForm(postId, published, postTitle, postMessage) {
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
    // true,
  );
  updatePostTitleInput.value = postTitle;
  updatePostTitleInput.maxLength = 255;

  const messageRow = createDivRow("gap", "justify-content-start");

  const maxCharLimitMessage = createElement(
    "p",
    "255 Character Limit",
    "max-char-limit",
  );
  maxCharLimitMessage.id = `max-char-limit-${postId}`;
  // maxCharLimitMessage.id = `max-char-limit-create-post`;

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
    "cancel-update-post-form", // This data-action triggers case of the same name in events.js
    // TODO - add above to events.js
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

  // const publishedInput = createInput(`published-${postId}`, "checkbox", "published", "");
  // publishedInput.style.display = "none";

    const publishPostButton = createButton(
      "submit",
      [published === true ? "Unpublish" : "Publish"],
      "",
      "publish-post-button",
    );

    // publishPostButton must read initial/current state
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
      // "text",
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

  // NOTE - below, I can't use createButton function helper from template.js here, as this --> "" , is not working to prevent data-action from filling in the next item into its place
  // TODO - DELETE ABOVE, I forgot to use type = submit
  const deletePostButton = createButton(
    "submit",
    "Delete",
    "",
    "delete-post-button",
  );

  // Cont'd, instead I am just creating this button the regular way
  // const deletePostButton = document.createElement("button");
  // deletePostButton.type = "submit";
  // deletePostButton.textContent = "Delete";
  // deletePostButton.classList.add("delete-post-button");
  deletePostButton.dataset.postId = postId;

  deletePostForm.append(deletePostButton);

  return deletePostForm;
}

// Blog comment forms (on posts)
// NOTE - This is where I was having a collision with "maxCharLimitMessage.id = `max-char-limit-${postId}`;" and "textArea.id = `textarea-${postId}`;" Both createCommentForm and updatePostForm were using this; I added createComment to pad the id for both textArea and maxCharLimitMessage below
export function renderCreateCommentForm(postId, createComment) {
  const createCommentForm = createElement("form", "", "create-comment-form");
  // createCommentForm.id = postId;
  createCommentForm.id = `create-comment-form-${postId}`;
  createCommentForm.dataset.postId = postId;

  const createCommentDiv = createElement("div", "", "create-comment-div");

  const messageRow = createDivRow("gap", "justify-content-start");

  const maxCharLimitMessage = createElement(
    "p",
    "255 Character Limit",
    "max-char-limit",
  );
  // maxCharLimitMessage.id = `max-char-limit-${postId}`;
  maxCharLimitMessage.id = `max-char-limit-${createComment}-${postId}`;

  const textArea = createElement("textarea", "");
  // textArea.id = `textarea-${postId}`;
  textArea.id = `textarea-${createComment}-${postId}`;
  textArea.name = "comment_message";
  textArea.maxLength = 255;

  const buttonRow = createDivRow("justify-content-end");

  const submitButton = createSubmitButton();
  submitButton.dataset.postId = postId;

  const cancelButton = createButton(
    "button",
    "Cancel",
    "cancel-create-comment-form", // This data-action triggers case of the same name in events.js
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
    "cancel-update-comment-form", // This data-action triggers case of the same name in events.js
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

  // NOTE - below, I can't use createButton function helper from template.js here, as this --> "" , is not working to prevent data-action from filling in the next item into its place
  // TODO - DELETE ABOVE, I forgot to use type = submit
  const deleteCommentButton = createButton(
    "submit",
    "Delete",
    "",
    "delete-comment-button",
  );

  // Cont'd, instead I am just creating this button the regular way
  // const deleteCommentButton = document.createElement("button");
  // deleteCommentButton.textContent = "Delete";
  // deleteCommentButton.classList.add("delete-comment-button");
  deleteCommentButton.dataset.commentId = commentId;

  deleteCommentForm.append(deleteCommentButton);

  return deleteCommentForm;
}

// Admin Delete User ... I actually need a confirmation of delete
// export function renderAdminDeleteUserForm(userId) {
//   const deleteUserForm = createElement("form", "", "delete-user-form");
//   deleteUserForm.dataset.userId = userId;

//   const deleteUserButton = createButton(
//     "submit",
//     "Delete",
//     "",
//     "delete-user-button",
//     "full-width",
//   );

//   // deleteUserButton.dataset.userId = userId;

//   deleteUserForm.append(deleteUserButton);

//   return deleteUserForm;
// }


// Admin Edit User
// export function renderAdminEditUserForm(userId) {
export function renderAdminEditUserForm() {
  const adminEditUserForm = createElement("form", "", "admin-edit-user-form");
  // adminEditUserForm.dataset = userId;

  const titleRow = createDivRow("justify-content-start");

  const gearIcon = createImage(
    "/assets/gear-icon.svg",
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

  // const roleLabel = createLabel("role-admin-edit-user", "Email");
  // const roleInput = createInput("role-admin-edit-user", "text", "role", "");

  const roleLabel = createLabel("role-admin-edit-user", "Role");

  // 1. Create the select element container
  const selectRoleDropdown = document.createElement("select");
  selectRoleDropdown.id = "role-admin-edit-user";
  selectRoleDropdown.name = "role";

  // 2. Define the data array for the options
  const selectRoleOptions = [
    { value: "", text: "Choose a new role" },
    { value: "USER", text: "User (Reader Only)" },
    { value: "WRITER", text: "Writer" },
    { value: "ADMIN", text: "Admin" },
  ];
  // selectRoleOptions.id = "role-options-admin-edit-user";

  // 3. Loop through data, create option elements, and add them to the select element
  selectRoleOptions.forEach((optionData) => {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.text; // Prevents HTML injection bugs

    selectRoleDropdown.appendChild(option);
  });

  const emailLabel = createLabel("email-admin-edit-user", "Email");
  const emailInput = createInput("email-admin-edit-user", "email", "email", "");
  emailInput.setAttribute("autocomplete", "username");

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
    "/assets/eye-off.svg",
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

  // const clearButton = createClearButton();

  const deleteUserButton = createButton(
    "button",
    "Delete",
    "open-admin-edit-user-delete-confirmation", // This data-action triggers case of the same name in events.js
    "admin-edit-user-delete-button",
    "full-width",
  );


  // const deleteUserButton = renderAdminDeleteUserForm(userId);
  // const deleteUserButton = renderAdminDeleteUserForm();

  titleRow.append(gearIcon, title);

  showPasswordButton.append(showPasswordButtonImage);

  passwordRow.append(passwordInput, showPasswordButton);

  buttonRow.append(
    submitButton,
    // clearButton,
    // deleteProfileButton
    deleteUserButton,
  );

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
    "error-message",
  );

  const errorMessage = createElement(
    "div",
    "",
    "error-confirm-admin-delete-user",
    "error-message",
  );

  const hrLineBottom = createElement("hr", "", "hr-line-warning");

  // Submits the actual account profile deletion --- HERE!!!!
  const confirmAdminDeleteUserButton = createButton(
    "submit",
    "Confirm",
    "",
    "full-width",
  );

  // Cancels account profile deletion
  const cancelAdminDeleteUserButton = createButton(
    "button",
    "Cancel",
    "close-admin-delete-user-confirmation", // This data-action triggers case of the same name in events.js
    "full-width",
  );

  const buttonRow = createDivRow("full-width", "gap");

  buttonRow.append(confirmAdminDeleteUserButton, cancelAdminDeleteUserButton);

  confirmAdminDeleteUserForm.append(
    hrLineTop,
    adminDeleteUserMessage,
    errorMessage,
    hrLineBottom,
    buttonRow,
  );

  return confirmAdminDeleteUserForm;
}
