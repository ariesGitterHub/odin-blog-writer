import { createButton, createElement, createImage } from "../templates.js";
import { createDivRow } from "./reusables.js";

export function renderHeader(currentUser) {
  const headerContainer = document.querySelector("header");
  headerContainer.classList.add("sticky-header");

  currentUser
    ? (headerContainer.style.display = "flex")
    : (headerContainer.style.display = "none");

  // Clear the previous children
  headerContainer.replaceChildren();

  const topRow = createElement(
    "div",
    "",
    "row-container",
    "justify-content-space-between",
  );

  const titleRow = createDivRow("justify-content-start");
  const appLogo = createImage("/favicon.svg", "Quill logo", "app-logo-image");
  const title = createElement("h1", "Bloggie Writer");

  // const buttonContainer = createElement("div", "", "basic-container");

  const buttonContainer = createDivRow(
    "justify-content-space-between",
    "margin-bottom",
  );

  const logoutButton = createButton(
    "button",
    "Logout",
    "logout",
    "logout-button",
    "full-width",
  );

  const newPostButton = createButton(
    "button",
    "New Post",
    "open-new-post",
    "new-post-button",
    "full-width",
  );

  const profileButton = createButton(
    "button",
    "Profile",
    "open-modal-profile", // This data-action triggers case of the same name in events.js
    "profile-button",
    "full-width",
  );

  const adminButton = createButton(
    "button",
    "Admin",
    "open-admin-page", // This data-action triggers case of the same name in events.js
    "admin-button",
    "full-width",
  );

  // Below selects the appropriate authentication controls based on whether currentUser is logged in
  // TODO - reconfigure this later for ADMIN vs WRITER
  // function authControls(currentUser) {
  if (currentUser && currentUser.role === "ADMIN") {
    buttonContainer.append(
      newPostButton,
      logoutButton,
      profileButton,
      adminButton,
    );
  }

  if (currentUser && currentUser.role === "WRITER") {
    buttonContainer.append(newPostButton, logoutButton, profileButton);
  }

  if (currentUser && currentUser.role === "USER") {
    buttonContainer.append(logoutButton, profileButton);
  }

  // NOTE - I am using errorMessage and errorMessageParagraph below as catch all error message UI elements due to their noticeable location in the sticky header; this is so that the user will always be able to see it; this also lets me use a single location, making it easier to code :-)
  const errorMessage = createElement("div", "", "error-message");

  const errorMessageParagraph = createElement("p", "", "error-header");

  // buttonContainer.append(...authControls);
  // const buttonAuthControls = authControls(state.currentUser);

  titleRow.append(appLogo, title);
  topRow.append(
    titleRow,
    //  buttonContainer,
    // buttonAuthControls,
  );

  // Create the logged in status message.
  const bottomRow = createElement("div", "", "row-container", "logged-in");

  const loginMessage = createElement(
    "p",
    currentUser
      ? `Welcome back ${currentUser.firstName}!`
      : "Please log in to comment.",
  );

  bottomRow.append(loginMessage);

  errorMessage.append(errorMessageParagraph);

  if (currentUser) {
    headerContainer.append(topRow, buttonContainer, bottomRow, errorMessage);
  }
}
