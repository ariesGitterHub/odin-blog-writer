import { createButton, createElement } from "../templates.js";

// NOTE - only use for those generic elements that occur repeatedly

// Buttons
export function createClearButton() {
  return createButton(
    "button",
    "Clear",
    "clear-form", // This data-action triggers case of the same name in events.js
    "full-width",
  );
}

export function createShowPasswordButton() {
  return createButton(
    "button",
    "",
    "show-password-toggle", // This data-action triggers case of the same name in events.js
    "show-password-button",
  );
}

export function createSubmitButton() {
  return createButton("submit", "Submit", "");
}

// Divs
export function createDivRow(...additionalClasses) {
  return createElement("div", "", "row-container", ...additionalClasses);
}
