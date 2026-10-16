import { createButton, createElement, createImage } from "../templates.js";
import { createDivRow } from "./reusables.js";

export function renderHeader(currentUser) {
  const headerContainer = document.querySelector("header");
  headerContainer.classList.add("sticky-header");

  // Clear the previous #header.
  headerContainer.replaceChildren();

  const topRow = createElement(
    "div",
    "",
    "row-container",
    "justify-content-space-between",
  );

  const titleRow = createDivRow("justify-content-start");
  const appLogo = createImage("/favicon.svg", "Quill logo", "app-logo-image");
  const title = createElement("h1", "Bloggie");

  const buttonContainer = createElement("div", "", "basic-container");

  // Below selects the appropriate authentication controls based on whether currentUser is logged in
  const authControls = currentUser
    ? [
        createButton("button", "Logout", "logout", "logout-button"),
        createButton(
          "button",
          "Profile",
          "open-modal-profile", // This data-action triggers case of the same name in events.js
          "profile-button",
        ),
      ]
    : [
        createButton(
          "button",
          "Login",
          "open-modal-login", // This data-action triggers case of the same name in events.js
          "login-button",
        ),
      ];

  // NOTE - I am using errorMessage and errorMessageParagraph below as catch all error message UI elements due to their noticeable location in the sticky header; this is so that the user will always be able to see it; this also lets me use a single location, making it easier to code :-)
  const errorMessage = createElement("div", "", "error-message");

  const errorMessageParagraph = createElement("p", "", "error-header");

  buttonContainer.append(...authControls);
  titleRow.append(appLogo, title);
  topRow.append(titleRow, buttonContainer);

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

  headerContainer.append(topRow, bottomRow, errorMessage);
}
