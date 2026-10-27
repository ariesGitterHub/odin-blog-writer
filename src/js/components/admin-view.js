import { createButton, createElement } from "../templates.js";
import { createDivRow, createDivCol } from "./reusables.js";
import { formatExactDate } from "../../utils/format-date.utils.js";
// import { renderAdminDeleteUserForm } from "./forms.js";

// export function loginSplash(currentUser) {
export function renderAdminUsers(users, currentUser) {
  const adminContainer = document.querySelector("#admin");

  // if (currentUser && currentUser.role === "ADMIN") {
  //   adminContainer.style.display = "flex";
  //   postsContainer.style.display = "none";
  // } else {
  //   adminContainer.style.display = "none";
  //   postsContainer.style.display = "flex";
  // }

  // Clear the previous children
  adminContainer.replaceChildren();

  users.forEach((user) => {
    // postsContainer.style.border = "var(--border-basic)";
    const userArticle = renderUser(user);
    // const updateUserArticle = renderUpdateUserForm(
    //   user.id,
    //   user.firstName,
    //   user.lastName,
    //   user.email,
    //   user.emailVerified,
    //   user.role
    // );
    // TODO - do i need both below?
    userArticle.dataset.userId = user.id;
    userArticle.id = user.id;
    adminContainer.append(
      userArticle,
      //  updateUserArticle,
    ); 

    // if (currentUser && currentUser.role !== "ADMIN") {
    //   return
    // } else  {
    //   adminContainer.append(
    //     userArticle,
    //     //  updateUserArticle,
    //     );      
    // }

  });
}

function renderUser(user) {
  // This is shown normally
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
  const userEmailVerified = createElement("p", `Verified Email: ${user.emailVerified}`);
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

  // const userTimestamp = renderTimestamp(createdAt, updatedAt, lastLoginAt);

    userArticle.append(
      userName,
      //  userEmail,
      //   userEmailVerified,
      //    userRole,
      //    createdAt,
      //     updatedAt,
      //      lastLoginAt,

      emailRow,
      roleRow,
      datesRow,
    );

  const editButtonRow = createDivRow(
    "justify-content-end",
    "margin-post-button-rows",
  );

  

  const editUserButton = createButton(
    "button",
    "Edit",
    "open-modal-admin-edit-user-form", // This data-action triggers case of the same name in events.js
    // "admin-edit-user-button",
    "open-modal-admin-edit-user",
  );
  editUserButton.dataset.userId = user.id;

  // const deleteUserButton = renderAdminDeleteUserForm(user.id); 

  editButtonRow.append(
    editUserButton,
    //  deleteUserButton,
    );
  userArticle.append(editButtonRow);

 return userArticle;
}
