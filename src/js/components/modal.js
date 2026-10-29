import { createButton, createElement } from "../templates.js";

import {
  // renderLoginForm,
  renderProfileForm,
  renderConfirmProfileDeleteForm,
  renderAdminEditUserForm,
  renderConfirmAdminDeleteUserForm,
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
    "close-modal",
    "close-modal-button",
  );

  buttonRow.append(closeModalButton);

  const profileForm = renderProfileForm();
  const confirmProfileDeleteForm = renderConfirmProfileDeleteForm();
  const adminEditUserForm = renderAdminEditUserForm();
  const confirmAdminDeleteUserForm = renderConfirmAdminDeleteUserForm();

  modalContent.append(
    buttonRow,
    profileForm,
    confirmProfileDeleteForm,
    adminEditUserForm,
    confirmAdminDeleteUserForm,
  );

  modalContainer.append(modalContent);
}
