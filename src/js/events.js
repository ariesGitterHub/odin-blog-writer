import { login, logout, getCurrentUser } from "./auth.js";
import { updateProfile, deleteProfile } from "./user.js";

import {
  createNewBlogPost,
  editBlogPost,
  togglePublishedBlogPost,
  deleteBlogPost,
} from "./posts.js";

import {
  createNewBlogComment,
  editBlogComment,
  deleteBlogComment,
} from "./comments.js";

import {
  getUsersForAdmin,
  getOneUserForAdmin,
  updateUserByAdmin,
  deleteUserByAdmin,
} from "./admin.js";

import { renderHeader } from "./components/header.js";
import { renderAdminUsers } from "./components/admin-view.js";
import { getBlogPosts } from "../js/posts.js";
import { renderPosts } from "./components/posts-view.js";
import { state } from "./state.js";

export function registerEventListeners() {
  const app = document.querySelector("#app");

  const loginContainer = document.querySelector("#login");
  const postsContainer = document.querySelector("#posts");
  const adminContainer = document.querySelector("#admin");
  const modalContainer = document.querySelector("#modal");

  // Initial splash page with login form
  const loginForm = document.querySelector(".login-form");

  // Modal forms
  const profileForm = document.querySelector(".profile-form");
  const confirmProfileDeleteForm = document.querySelector(
    ".confirm-profile-delete-form",
  );
  const adminEditUserForm = document.querySelector(".admin-edit-user-form");
  const confirmAdminDeleteUserForm = document.querySelector(
    ".confirm-admin-delete-user-form",
  );

  // Header form
  const createPostForm = document.querySelector(".create-post-form");

  // Post-view forms
  const updatePostForm = document.querySelector(".update-post-form");
  const togglePublishedPostForm = document.querySelector(
    ".toggle-published-post-form",
  );
  const deletePostForm = document.querySelector(".delete-post-form");
  const createCommentForm = document.querySelector(".create-comment-form");
  const updateCommentForm = document.querySelector(".update-comment-form");
  const deleteCommentForm = document.querySelector(".delete-comment-form");

  // Error message divs found on various forms
  // --Found on login
  const errorMessageLogin = document.querySelector(".error-login");
  // --Both found on modal
  const errorMessageProfile = document.querySelector(".error-profile");
  const errorMessageAdminEditUser = document.querySelector(
    ".error-admin-edit-user",
  );
  // --Found in header
  const errorMessageHeader = document.querySelector(".error-header");

  // Needed for show-password-button
  const passwordLogin = document.getElementById("password-login");
  const passwordProfile = document.getElementById("password-profile");
  const passwordAdminEditUser = document.getElementById(
    "password-admin-edit-user",
  );

  // NOTE - I took the easy way and simply used the id for the DOM elements below rather than use closest or querySelectorAll
  const showPasswordButtonImageLogin = document.getElementById(
    "show-password-button-image-login",
  );
  const showPasswordButtonImageProfile = document.getElementById(
    "show-password-button-image-profile",
  );
  const showPasswordButtonImageAdminEditUser = document.getElementById(
    "show-password-button-image-admin-edit-user",
  );

  // Needed for case "open-modal-profile" so that known values are show in profile fields
  const firstNameProfileInput = profileForm.querySelector(
    "#first-name-profile",
  );
  const lastNameProfileInput = profileForm.querySelector("#last-name-profile");
  const emailProfileInput = profileForm.querySelector("#email-profile");
  const passwordProfileInput = profileForm.querySelector("#password-profile");

  // Needed for case "open-modal-admin-edit-user" so that known values are show in profile fields
  const firstNameAdminEditUserInput = adminEditUserForm.querySelector(
    "#first-name-admin-edit-user",
  );
  const lastNameAdminEditUserInput = adminEditUserForm.querySelector(
    "#last-name-admin-edit-user",
  );
  const roleAdminEditUserInput = adminEditUserForm.querySelector(
    "#role-admin-edit-user",
  );
  const emailAdminEditUserInput = adminEditUserForm.querySelector(
    "#email-admin-edit-user",
  );
  const emailVerifiedAdminEditUserInput = adminEditUserForm.querySelector(
    "#email-verified-admin-edit-user",
  );
  const passwordAdminEditUserInput = adminEditUserForm.querySelector(
    "#password-admin-edit-user",
  );

  // Helper function for showing password in login and profile update forms; allows me to delete confirm password fields and reduce coding baggage
  function togglePasswordVisibility(passwordInput, eyeImage) {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeImage.src = "/assets/eye.svg";
    } else {
      passwordInput.type = "password";
      eyeImage.src = "/assets/eye-off.svg";
    }
  }

  function openCreatePostForm(button) {
    // NOTE - using "create-post" as the postId since this is a creation form and no existing db postId exists yet
    const postId = "create-post";

    // Using a class for this rather than an id
    const createPostForm = document.querySelector(".create-post-form");

    createPostForm.style.display = "flex";

    charCount(postId);
  }

  function cancelCreatePostForm(button) {
    // NOTE - using the class for this rather than the id of "create-post", the class is singular anyway
    const createPostForm = document.querySelector(".create-post-form");

    createPostForm.style.display = "none";
    createPostForm.reset();
  }

  function openUpdatePostForm(button) {
    const postId = button.dataset.postId;

    const updatePostForm = document.getElementById(
      `update-post-form-${postId}`,
    );
    const existingPost = document.getElementById(postId);

    updatePostForm.style.display = "block";
    existingPost.style.display = "none";

    charCount(postId);
  }

  function closeUpdatePostForm(button) {
    const postId = button.dataset.postId;

    const updatePostForm = document.getElementById(
      `update-post-form-${postId}`,
    );
    const existingPost = document.getElementById(postId);

    updatePostForm.style.display = "none";
    existingPost.style.display = "block";
  }

  function openCreateCommentForm(button) {
    const postId = button.dataset.postId;

    const createComment = "create-comment";

    const createCommentForm = document.getElementById(
      `create-comment-form-${postId}`,
    );

    button.style.display = "none";
    createCommentForm.style.display = "block";

    charCount(postId, createComment);
  }

  function closeCreateCommentForm(button) {
    const postId = button.dataset.postId;

    const createCommentForm = document.getElementById(
      `create-comment-form-${postId}`,
    );

    const articleContainer = button.closest(".post-article");
    const commentButton = articleContainer.querySelector(".comment-button");

    commentButton.style.display = "block";
    createCommentForm.style.display = "none";
  }

  function openUpdateCommentForm(button) {
    const commentId = button.dataset.commentId;

    const existingComment = document.getElementById(commentId);
    const updateCommentForm = document.getElementById(
      `update-comment-form-${commentId}`,
    );

    existingComment.style.display = "none";
    updateCommentForm.style.display = "block";

    charCount(commentId);
  }

  function closeUpdateCommentForm(button) {
    const commentId = button.dataset.commentId;

    const existingComment = document.getElementById(commentId);
    const updateCommentForm = document.getElementById(
      `update-comment-form-${commentId}`,
    );

    existingComment.style.display = "block";
    updateCommentForm.style.display = "none";
  }

  function charCount(postOrCommentId, createComment) {
    // Determine which ID to use based on your condition
    const targetId =
      createComment === "create-comment"
        ? `${createComment}-${postOrCommentId}`
        : postOrCommentId;

    // Select the elements using the determined ID
    const charCountTargetElement = document.getElementById(
      `textarea-${targetId}`,
    );
    const maxCharLimitMessage = document.getElementById(
      `max-char-limit-${targetId}`,
    );

    // NOTE - safety check to prevent errors if elements don't exist on the page
    if (!charCountTargetElement || !maxCharLimitMessage) {
      console.warn(`Elements not found for ID: ${targetId}`);
      return;
    }

    charCountTargetElement.addEventListener("input", () => {
      const currentCount = charCountTargetElement.value.length;
      maxCharLimitMessage.textContent = `${currentCount}/255 Characters`;
    });
  }

  // NOTE - use after user profile edit or admin user edit
  async function refreshCurrentUserAndHeader() {
    const currentUseData = await getCurrentUser();
    state.currentUser = currentUseData.user;
    renderHeader(state.currentUser);
  }

  async function refreshAdmin() {
    const usersData = await getUsersForAdmin();
    state.users = usersData.users;
    renderAdminUsers(state.users, state.currentUser);
  }

  async function refreshPosts() {
    const postData = await getBlogPosts();
    state.posts = postData.posts;
    renderPosts(state.posts, state.currentUser);
  }

  app.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-action]");

    if (!button) return;

    const action = button.dataset.action;

    switch (action) {
      case "open-modal-profile":
        // Used to open the modal via the profile button after someone logs in
        modalContainer.style.display = "block";
        adminEditUserForm.style.display = "none";
        profileForm.style.display = "flex";
        confirmProfileDeleteForm.style.display = "none";
        passwordProfile.type = "password";
        showPasswordButtonImageProfile.src = "/assets/eye-off.svg";

        // Populates the profile form fields
        firstNameProfileInput.value = state.currentUser.firstName;
        lastNameProfileInput.value = state.currentUser.lastName;
        emailProfileInput.value = state.currentUser.email;
        passwordProfileInput.value = "";
        break;

      case "close-modal":
        modalContainer.style.display = "none";
        confirmProfileDeleteForm.style.display = "none";
        confirmAdminDeleteUserForm.style.display = "none";

        errorMessageProfile.textContent = "";
        errorMessageAdminEditUser.textContent = "";
        break;

      case "clear-form":
        errorMessageProfile.textContent = "";
        errorMessageAdminEditUser.textContent = "";

        profileForm.reset();
        adminEditUserForm.reset();
        break;

      case "clear-login-form":
        errorMessageLogin.textContent = "";
        loginForm.reset();
        break;

      case "show-password-toggle":
        if (loginForm) {
          togglePasswordVisibility(passwordLogin, showPasswordButtonImageLogin);
        }

        if (profileForm.style.display === "flex") {
          togglePasswordVisibility(
            passwordProfile,
            showPasswordButtonImageProfile,
          );
        }

        if (adminEditUserForm.style.display === "flex") {
          togglePasswordVisibility(
            passwordAdminEditUser,
            showPasswordButtonImageAdminEditUser,
          );
        }
        break;

      case "open-profile-delete-confirmation":
        confirmProfileDeleteForm.style.display = "block";
        break;

      case "cancel-profile-delete-confirmation":
        confirmProfileDeleteForm.style.display = "none";
        confirmAdminDeleteUserForm.style.display = "none";
        break;

      case "open-admin-edit-user-delete-confirmation":
        const targetUserId = button.dataset.userId;

        confirmAdminDeleteUserForm.style.display = "block";
        confirmAdminDeleteUserForm.dataset.userId = targetUserId;
        break;

      case "cancel-admin-delete-user-confirmation":
        confirmProfileDeleteForm.style.display = "none";
        confirmAdminDeleteUserForm.style.display = "none";
        break;

      case "open-new-post-form":
        openCreatePostForm(button);
        break;

      case "cancel-new-post-form":
        cancelCreatePostForm(button);
        break;

      case "open-update-post-form":
        openUpdatePostForm(button);
        break;

      case "cancel-update-post-form":
        closeUpdatePostForm(button);
        break;

      case "open-create-comment-form":
        openCreateCommentForm(button);
        break;

      case "cancel-create-comment-form":
        closeCreateCommentForm(button);
        break;

      case "open-update-comment-form":
        openUpdateCommentForm(button);
        break;

      case "cancel-update-comment-form":
        closeUpdateCommentForm(button);
        break;

      case "open-admin-page":
        const adminButton = document.querySelector(".admin-button");

        if (postsContainer.style.display === "flex") {
          postsContainer.style.display = "none";
          adminContainer.style.display = "flex";
          adminButton.style.backgroundColor = "var(--red)";
        } else {
          postsContainer.style.display = "flex";
          adminContainer.style.display = "none";
          adminButton.style.backgroundColor = "var(--gray)";
        }
        break;

      case "open-modal-admin-edit-user-form":
        const userId = button.dataset.userId;

        // Pass state userId for later actions
        adminEditUserForm.dataset.userId = userId;

        const adminEditUserDeleteButton = document.querySelector(
          ".admin-edit-user-delete-button",
        );
        adminEditUserDeleteButton.dataset.userId = userId;

        modalContainer.style.display = "block";
        profileForm.style.display = "none";
        adminEditUserForm.style.display = "flex";

        passwordAdminEditUser.type = "password";
        showPasswordButtonImageAdminEditUser.src = "/assets/eye-off.svg";

        const adminEditUserData = await getOneUserForAdmin(userId);

        // Populates the admin edit user form fields
        firstNameAdminEditUserInput.value = adminEditUserData.user.firstName;
        lastNameAdminEditUserInput.value = adminEditUserData.user.lastName;
        roleAdminEditUserInput.value = adminEditUserData.user.role;
        emailAdminEditUserInput.value = adminEditUserData.user.email;
        emailVerifiedAdminEditUserInput.value = adminEditUserData.user.emailVerified;
        passwordAdminEditUserInput.value = "";
        break;

      case "logout":
        try {
          await logout();

          // Clear the states for posts and currentUser
          state.currentUser = null;
          state.posts = null;

          // loginForm.reset(); // NOTE - if using location.reload() below, then this reset is not needed
          location.reload();

          console.log("✋ Logged out, goodbye!");
        } catch (err) {
          console.error("Logout failed:", err);
          errorMessageHeader.textContent = err.message;
        }
        break;
    }
  });

  app.addEventListener("submit", async (event) => {
    const form = event.target;

    // NOTE - leave below commented out as a reminder for later that I can also use below to target datasets or submit in general
    // const submitButton = event.submitter

    // Multiple forms used in this app
    if (
      form !== loginForm &&
      form !== profileForm &&
      form !== confirmProfileDeleteForm &&
      form !== createPostForm &&
      !form.matches(".create-post-form") &&
      form !== updatePostForm &&
      !form.matches(".update-post-form") &&
      form !== togglePublishedPostForm &&
      !form.matches(".toggle-published-post-form") &&
      form !== deletePostForm &&
      !form.matches(".delete-post-form") &&
      form !== createCommentForm &&
      !form.matches(".create-comment-form") &&
      form !== updateCommentForm &&
      !form.matches(".update-comment-form") &&
      form !== deleteCommentForm &&
      !form.matches(".delete-comment-form") &&
      form !== adminEditUserForm &&
      !form.matches(".admin-edit-user-form") &&
      form !== confirmAdminDeleteUserForm &&
      !form.matches(".confirm-admin-delete-user-form")
    )
      return;

    event.preventDefault();

    if (form === loginForm) {
      const emailLogin = form.querySelector("#email-login").value;
      const passwordLogin = form.querySelector("#password-login").value;

      try {
        const loginData = await login(emailLogin, passwordLogin);
        state.currentUser = loginData.user;

        const postData = await getBlogPosts();
        state.posts = postData.posts;

        renderHeader(state.currentUser);

        renderPosts(state.posts, state.currentUser);

        if (state.currentUser.role === "ADMIN") {
          const usersData = await getUsersForAdmin();
          state.users = usersData.users;
          renderAdminUsers(state.users, state.currentUser);
        }

        errorMessageLogin.textContent = "";
        loginContainer.style.display = "none";

        console.log("🎈 Login successful:", state.currentUser);
      } catch (err) {
        console.error("Login failed:", err);
        errorMessageLogin.textContent = err.message;
      }
    }

    if (form === profileForm) {
      try {
        // NOTE - this is the correct data object shape that the backend needs AND expects
        const profileData = await updateProfile({
          first_name: firstNameProfileInput.value,
          last_name: lastNameProfileInput.value,
          email: emailProfileInput.value,
          password: passwordProfileInput.value,
        });

        // Update the state.currentUser
        state.currentUser = profileData.user;

        // Refresh header
        renderHeader(state.currentUser);

        // Refresh state.users and admin
        await refreshAdmin();

        // Refresh state.posts and posts
        await refreshPosts();

        modalContainer.style.display = "none";

        errorMessageProfile.textContent = "";

        // Reset form
        profileForm.reset();

        console.log("😀 Profile update successful:", state.currentUser);
      } catch (err) {
        console.error("Profile update failed:", err);
        errorMessageProfile.textContent = err.message;
      }
    }

    if (form === confirmProfileDeleteForm) {
      try {
        const confirmDeletion = await deleteProfile();

        // Reset the state.currentUser
        state.currentUser = null;
        renderHeader(state.currentUser);

        // Refresh state.users and admin
        await refreshAdmin();

        // Refresh state.posts and posts
        await refreshPosts();

        // Reset modalContainer and confirmProfileDeleteForm to display = none
        modalContainer.style.display = "none";
        confirmProfileDeleteForm.style.display = "none";

        // Reset forms
        loginForm.reset();
        profileForm.reset();

        console.log("💀 User account deleted");
      } catch (err) {
        console.error("Profile account deletion failed:", err);
        errorMessageProfile.textContent = err.message;
      }
    }

    // Create Post
    if (form.matches(".create-post-form")) {
      const postId = "create-post";

      const createPostTitleInput = form.querySelector("#create-post-title");
      const createPostTextArea = form.querySelector(`#textarea-${postId}`);

      const createPostTitle = createPostTitleInput.value;
      const createPostMessage = createPostTextArea.value;

      try {
        const postData = await createNewBlogPost(
          // userId, // Not needed, backend handles this
          // postId, // Not needed, it's a new post
          createPostTitle,
          createPostMessage,
        );

        // Refresh state.posts and posts
        await refreshPosts();

        form.style.display = "none";

        form.reset(); // Same as createPostForm.reset()
      } catch (err) {
        console.error("Post creation failed:", err);
        errorMessageHeader.textContent = err.message;
      }
    }

    // Update Post
    if (form.matches(".update-post-form")) {
      const postId = form.dataset.postId;

      const updatePostTitleInput = form.querySelector(
        `#update-post-title-${postId}`,
      );
      const updatePostTitle = updatePostTitleInput.value;

      const updatePostTextArea = form.querySelector(`#textarea-${postId}`);
      const updatePostMessage = updatePostTextArea.value;

      try {
        const updatePostData = await editBlogPost(
          // userId, Not needed, backend handles this
          postId,
          updatePostTitle,
          updatePostMessage,
        );

        // Refresh header
        renderHeader(state.currentUser);

        // Refresh state.posts and posts
        await refreshPosts();
      } catch (err) {
        console.error("Post update failed:", err);
        errorMessageHeader.textContent = err.message;
      }
    }

    // Toggle Post Publish Status
    if (form.matches(".toggle-published-post-form")) {
      const postId = form.dataset.postId;

      const publishPostButton = form.querySelector(
        `#publish-post-button-${postId}`,
      );
      let publishPostButtonDataset = publishPostButton.dataset.published;

      const publishedInput = form.querySelector(`#published-${postId}`);
      let togglePublishValue = publishedInput.checked;

      try {
        if (publishPostButtonDataset === "true") {
          publishPostButtonDataset = "false";
          publishPostButton.textContent = "Publish";
          publishPostButton.style.backgroundColor = "var(--red)";
          togglePublishValue = publishedInput.checked = false;
        } else if (publishPostButtonDataset === "false") {
          publishPostButton.dataset.published = "true";
          publishPostButton.textContent = "Unpublish";
          publishPostButton.style.backgroundColor = "var(--black)";
          togglePublishValue = publishedInput.checked = true;
        }

        const updatePostData = await togglePublishedBlogPost(
          // userId, Not needed, backend handles this
          postId,
          togglePublishValue,
        );

        // Refresh header
        renderHeader(state.currentUser);

        // Refresh state.posts and posts
        await refreshPosts();
      } catch (err) {
        console.error("Published post update failed:", err);
        errorMessageHeader.textContent = err.message;
      }
    }

    // Delete Post
    if (form.matches(".delete-post-form")) {
      // NOTE - these are hard deletes by design with no warning message
      const postId = form.dataset.postId;

      try {
        const deletePostData = await deleteBlogPost(
          // userId, // Not needed, backend handles this
          postId,
        );

        // Refresh state.posts and posts
        await refreshPosts();
      } catch (err) {
        console.error("Post deletion failed:", err);
        errorMessageHeader.textContent = err.message;
      }
    }

    // Create Comment
    if (form.matches(".create-comment-form")) {
      const postId = form.dataset.postId;
      const createComment = "create-comment"; // NOTE - this was added to avoid collisions that were occurring with updatePostForm textarea and one other, see renderCreateCommentForm()

      const createCommentTextArea = form.querySelector(
        `#textarea-${createComment}-${postId}`,
      );

      const createCommentMessage = createCommentTextArea.value;

      try {
        const createCommentData = await createNewBlogComment(
          // userId, // Not needed, backend handles this
          postId,
          createCommentMessage,
        );

        // Refresh state.posts and posts
        await refreshPosts();
      } catch (err) {
        console.error("Comment creation failed:", err);
        errorMessageHeader.textContent = err.message;
      }
    }

    // Update Comment
    if (form.matches(".update-comment-form")) {
      const commentId = form.dataset.commentId;

      const updateCommentTextArea = form.querySelector(
        `#textarea-${commentId}`,
      );

      const updateCommentMessage = updateCommentTextArea.value;

      try {
        const updateCommentData = await editBlogComment(
          // userId, // Not needed, backend handles this
          commentId,
          updateCommentMessage,
        );

        // Refresh header
        renderHeader(state.currentUser);

        // Refresh state.posts and posts
        await refreshPosts();
      } catch (err) {
        console.error("Comment update failed:", err);
        errorMessageHeader.textContent = err.message;
      }
    }

    // Delete Comment
    // NOTE - these are hard deletes by design with no warning message
    if (form.matches(".delete-comment-form")) {
      const commentId = form.dataset.commentId;

      try {
        const deleteCommentData = await deleteBlogComment(
          // userId, // Not needed, backend handles this
          commentId,
        );

        // Refresh state.posts and posts
        await refreshPosts();
      } catch (err) {
        console.error("Comment deletion failed:", err);
        errorMessageHeader.textContent = err.message;
      }
    }

    // Admin Update User
    if (form.matches(".admin-edit-user-form")) {
      const userId = form.dataset.userId;

      try {
        // NOTE - this is the correct data object shape that the backend needs AND expects
        const adminEditUserData = await updateUserByAdmin(userId, {
          first_name: firstNameAdminEditUserInput.value,
          last_name: lastNameAdminEditUserInput.value,
          role: roleAdminEditUserInput.value,
          email: emailAdminEditUserInput.value,
          email_verified: emailVerifiedAdminEditUserInput.value,
          password: passwordAdminEditUserInput.value,
        });
      
        // Refresh state.currentUser and the header
        await refreshCurrentUserAndHeader();

        // Refresh state.users and admin
        await refreshAdmin();

        modalContainer.style.display = "none";
        adminEditUserForm.style.display = "none";
        confirmAdminDeleteUserForm.style.display = "none";
        errorMessageAdminEditUser.textContent = "";

        // Reset form
        adminEditUserForm.reset();

        console.log("😀 Admin user edit successful:", adminEditUserData);
      } catch (err) {
        console.error("Admin user edit failed:", err);
        errorMessageAdminEditUser.textContent = err.message;
      }
    }

    // Admin Delete User
    if (form.matches(".confirm-admin-delete-user-form")) {
      const userId = form.dataset.userId;

      try {
        const confirmDeletion = await deleteUserByAdmin(userId);

        // Refresh state.users and admin
        await refreshAdmin();

        // Reset modalContainer and confirmProfileDeleteForm to display = none
        modalContainer.style.display = "none";
        confirmAdminDeleteUserForm.style.display = "none";
        errorMessageAdminEditUser.textContent = "";

        // Reset form
        adminEditUserForm.reset();

        console.log("💀 User deleted by admin", confirmDeletion);
      } catch (err) {
        console.error("User deletion by admin failed:", err);
        errorMessageAdminEditUser.textContent = err.message;
      }
    }
  });
}
