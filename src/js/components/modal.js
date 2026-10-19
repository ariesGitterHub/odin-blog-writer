import { createButton, createElement } from "../templates.js";

import {
  // renderLoginForm,
  renderProfileForm,
  renderConfirmProfileDeleteForm,
} from "./forms.js";
import { createDivRow } from "./reusables.js";

export function renderModal() {
  const modalContainer = document.querySelector("#modal");

  // Clear the previous children
  modalContainer.replaceChildren();

  const modalContent = createElement("div", "", "modal-content");

  const buttonRow = createDivRow("justify-content-end");

  const closeModalButton = createButton(
    "button",
    "✖",
    "close-modal", // This data-action triggers case of the same name in events.js
    "close-modal-button",
  );

  buttonRow.append(closeModalButton);

  // const loginForm = renderLoginForm();
  const profileForm = renderProfileForm();
  const profileDeleteForm = renderConfirmProfileDeleteForm();

  modalContent.append(
    buttonRow,
    // loginForm,
    profileForm,
    profileDeleteForm,
  );
  modalContainer.append(modalContent);
}
