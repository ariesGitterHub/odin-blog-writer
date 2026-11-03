import { createButton, createElement } from "../templates.js";
import { createDivRow, createDivCol } from "./reusables.js";
import { formatExactDate } from "../../utils/format-date.utils.js";

export function renderAdminUsers(users, currentUser) {
  const adminContainer = document.querySelector("#admin");

  // Clear the previous children
  adminContainer.replaceChildren();

  users.forEach((user) => {
    const userArticle = renderUser(user);

    // TODO - do i need both below?
    userArticle.dataset.userId = user.id;
    // userArticle.id = user.id; // TODO - Looks like this is the one I don't need
    adminContainer.append(userArticle);
  });
}

function renderUser(user) {
  const userArticle = createElement("article", "", "user-article");

  const userName = createElement("h2", `${user.firstName} ${user.lastName}`);

  const roleRow = createDivCol();
  const userRole = createElement("p", "User Role: ");
  const userRoleSpan = createElement("span", user.role);
  if (userRoleSpan.textContent === "ADMIN") {
    userRoleSpan.style.color = "var(--yellow)";
  }

  if (userRoleSpan.textContent === "WRITER") {
    userRoleSpan.style.color = "var(--red)";
  }
  userRole.append(userRoleSpan);
  roleRow.append(userRole);

  const emailRow = createDivCol();
  const userEmail = createElement("p", `Email: ${user.email}`);
  const userEmailVerified = createElement(
    "p",
    `Verified Email: ${user.emailVerified}`,
  );
  emailRow.append(userEmail, userEmailVerified);

  const datesRow = createDivCol();
  const createdAt = createElement(
    "p",
    `Created: ${formatExactDate(user.createdAt)}`,
  );
  const updatedAt = createElement(
    "p",
    `Updated: ${formatExactDate(user.updatedAt)}`,
  );
  const lastLoginAt = createElement(
    "p",
    `Last Login: ${formatExactDate(user.lastLoginAt)}`,
  );
  datesRow.append(createdAt, updatedAt, lastLoginAt);

  userArticle.append(userName, emailRow, roleRow, datesRow);

  const editButtonRow = createDivRow(
    "justify-content-end",
    "margin-post-button-rows",
  );

  const editUserButton = createButton(
    "button",
    "Edit",
    "open-modal-admin-edit-user-form",
    "open-modal-admin-edit-user",
  );
  editUserButton.dataset.userId = user.id;

  editButtonRow.append(editUserButton);
  userArticle.append(editButtonRow);

  return userArticle;
}
