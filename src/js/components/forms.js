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
  const loginFormContainer = createElement("div", "", "login-form-container");

  const loginForm = createElement("form", "", "login-form");

  const titleRow = createDivRow("justify-content-start");

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

  // const oopsNeedSignupButton = createButton(
  //   "button",
  //   "*No account? Click to sign up!",
  //   "signup-instead", // This data-action triggers case of the same name in events.js
  //   "full-width",
  // );

  loginForm.append(
    titleRow,
    errorMessage,
    emailLabel,
    emailInput,
    passwordLabel,
    passwordRow,
    buttonRow,
    // oopsNeedSignupButton,
  );

  loginFormContainer.append(loginForm);

  // return loginForm;
  return loginFormContainer;
}

// export function renderSignupForm() {
//   const signupForm = createElement("form", "", "signup-form");

//   const titleRow = createDivRow("justify-content-start");

//   const appLogo = createImage("/favicon.svg", "Quill logo", "app-logo-image");

//   const title = createElement("h1", "Sign Up");

//   const errorMessage = createElement(
//     "div",
//     "",
//     "error-signup",
//     "error-message",
//   );

//   const firstNameLabel = createLabel("first-name-signup", "First Name");

//   const firstNameInput = createInput(
//     "first-name-signup",
//     "text",
//     "first_name",
//     "Enter first name",
//     true,
//   );

//   const lastNameLabel = createLabel("last-name-signup", "Last Name");

//   const lastNameInput = createInput(
//     "last-name-signup",
//     "text",
//     "last_name",
//     "Enter last name",
//     true,
//   );

//   const emailLabel = createLabel("email-signup", "Email");

//   const emailInput = createInput(
//     "email-signup",
//     "email",
//     "email",
//     "Enter email address",
//     true,
//   );
//   emailInput.setAttribute("autocomplete", "username");

//   const passwordLabel = createLabel("password-signup", "Password");

//   const passwordRow = createDivRow();

//   const passwordInput = createInput(
//     "password-signup",
//     "password",
//     "password",
//     "Enter password",
//     true,
//   );
//   passwordInput.setAttribute("autocomplete", "new-password");

//   const showPasswordButton = createShowPasswordButton();

//   const showPasswordButtonImage = createImage(
//     "/assets/eye-off.svg",
//     "an eye icon that toggles open and closed",
//     "show-password-button-image",
//   );

//   showPasswordButtonImage.setAttribute(
//     "id",
//     "show-password-button-image-signup",
//   );

//   const buttonRow = createDivRow("full-width", "gap", "margin-top-bottom");

//   const submitButton = createSubmitButton();
//   submitButton.classList.add("full-width");

//   const clearButton = createClearButton();

//   titleRow.append(appLogo, title);

//   showPasswordButton.append(showPasswordButtonImage);

//   passwordRow.append(passwordInput, showPasswordButton);

//   buttonRow.append(submitButton, clearButton);

//   const oopsNeedLoginButton = createButton(
//     "button",
//     "*Already have an account? Please click here to login.",
//     "login-instead", // This data-action triggers case of the same name in events.js
//     "full-width",
//   );

//   signupForm.append(
//     titleRow,
//     errorMessage,
//     firstNameLabel,
//     firstNameInput,
//     lastNameLabel,
//     lastNameInput,
//     emailLabel,
//     emailInput,
//     passwordLabel,
//     passwordRow,
//     buttonRow,
//     oopsNeedLoginButton,
//   );

//   return signupForm;
// }

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

export function renderCreateCommentForm(postId) {
  const createCommentForm = createElement("form", "", "create-comment-form");
  createCommentForm.id = postId;

  const createCommentDiv = createElement("div", "", "create-comment-div");

  const messageRow = createDivRow("gap", "justify-content-start");

  const maxCharLimitMessage = createElement(
    "p",
    "255 Character Limit",
    "max-char-limit",
  );
  maxCharLimitMessage.id = `max-char-limit-${postId}`;

  const textArea = createElement("textarea", "");
  textArea.id = `textarea-${postId}`;
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

  // const deleteCommentButton = createButton(
  //   "button",
  //   "Delete",
  //   // "delete-comment",
  //   "",
  //   "delete-comment-button",
  // );

  // Cont'd, instead I am just creating this button the regular way
  const deleteCommentButton = document.createElement("button");
  deleteCommentButton.textContent = "Delete";
  deleteCommentButton.classList.add("delete-comment-button");
  deleteCommentButton.dataset.commentId = commentId;

  deleteCommentForm.append(deleteCommentButton);

  return deleteCommentForm;
}
