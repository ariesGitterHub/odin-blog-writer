import { createButton, createElement, createImage } from "../templates.js";
import { createDivRow } from "./reusables.js";
import { renderCreatePostForm } from "./forms.js";

export function renderHeader(currentUser) {
  const headerContainer = document.querySelector("header");
  headerContainer.classList.add("sticky-header");

  currentUser
    ? (headerContainer.style.display = "flex")
    : (headerContainer.style.display = "none");

  // Clear the previous children
  headerContainer.replaceChildren();

  const titleRow = createDivRow("justify-content-start", "margin-bottom");
  const appLogo = createImage("/favicon.svg", "Quill logo", "app-logo-image");
  const title = createElement("h1", "Bloggie Writer");

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
    "open-new-post-form",
    "new-post-button",
    "full-width",
  );

  const profileButton = createButton(
    "button",
    "Profile",
    "open-modal-profile", // NOTE - this data-action triggers case of the same name in events.js; I use this set up throughout blog-reader and blog-writer
    "profile-button",
    "full-width",
  );

  const adminButton = createButton(
    "button",
    "",
    "open-admin-page",
    "admin-button",
  );

  const adminButtonImage = createImage(
    "/assets/gear.svg",
    "Gear icon to open admin page",
    "admin-button-image",
  );

  adminButton.append(adminButtonImage);

  // Below selects the appropriate authentication controls based on whether currentUser is logged in
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

  // NOTE - I changed the backend to prevent "USER" role from logging in, keep below as a guard
  if (currentUser && currentUser.role === "USER") {
    buttonContainer.append(logoutButton, profileButton);
  }

  // NOTE - I am using errorMessage and errorMessageParagraph below as catch all error message UI elements due to their noticeable location in the sticky header; this is so that the user will always be able to see it; this also lets me use a single location, making it easier to code :-)
  const errorMessage = createElement("div", "", "error-message");

  const errorMessageParagraph = createElement("p", "", "error-header");

  titleRow.append(appLogo, title);

  // Create the logged in status message.
  const bottomRow = createElement("div", "", "row-container", "logged-in");

  const loginMessage = createElement(
    "p",
    currentUser
      ? `Welcome back ${currentUser.firstName}!`
      : "Please log in to comment.",
  );

  // Below is the for that creates new posts
  const createPostForm = renderCreatePostForm("create-post");

  bottomRow.append(loginMessage);

  errorMessage.append(errorMessageParagraph);

  if (currentUser) {
    headerContainer.append(
      titleRow,
      buttonContainer,
      bottomRow,
      errorMessage,
      createPostForm,
    );
  }
}
