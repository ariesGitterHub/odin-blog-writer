import { 
  login,
   logout,
   } from "./auth.js";
import { updateProfile, deleteProfile } from "./user.js";

import { createNewBlogPost, deleteBlogPost } from "./posts.js";

import {
  createNewBlogComment,
  editBlogComment,
  deleteBlogComment,
} from "./comments.js";


import { renderHeader } from "./components/header.js";
import { getBlogPosts } from "../js/posts.js";
import { renderPosts } from "./components/posts-view.js";
import { state } from "./state.js";
import { loginSplash } from "./components/login-view.js";

export function registerEventListeners() {
  const app = document.querySelector("#app");

  const headerContainer = document.querySelector("header");
  const loginContainer = document.querySelector("#login");
  const modalContainer = document.querySelector("#modal");

  // Initial splash page
  const loginForm = document.querySelector(".login-form");

  // Modal forms
  const profileForm = document.querySelector(".profile-form");
  const confirmProfileDeleteForm = document.querySelector(
    ".confirm-profile-delete-form",
  );

  // Header form
  const createPostForm = document.querySelector(".create-post-form");

  // Post-view forms
  const deletePostForm = document.querySelector(".delete-post-form");
  const createCommentForm = document.querySelector(".create-comment-form");
  const updateCommentForm = document.querySelector(".update-comment-form");
  const deleteCommentForm = document.querySelector(".delete-comment-form");

  // Error message divs found on various forms
  const errorMessageLogin = document.querySelector(".error-login");
  const errorMessageProfile = document.querySelector(".error-profile");
  const errorMessageConfirmProfileDelete = document.querySelector(
    ".error-confirm-profile-delete",
  );
  const errorMessageHeader = document.querySelector(".error-header"); // TODO - fix this for delete, need a div that can be seen without a form...

  // Needed for show-password-button
  const passwordLogin = document.querySelector("#password-login");
  const passwordProfile = document.querySelector("#password-profile");

  // NOTE - I took the easy road and simply used the id for the DOM elements below rather than use closest or querySelectorAll
  const showPasswordButtonImageLogin = document.querySelector(
    "#show-password-button-image-login",
  );

  const showPasswordButtonImageProfile = document.querySelector(
    "#show-password-button-image-profile",
  );

  // Needed for case "open-modal-profile" so that known values are show in profile fields
  const firstNameProfileInput = profileForm.querySelector(
    "#first-name-profile",
  );
  const lastNameProfileInput = profileForm.querySelector("#last-name-profile");
  const emailProfileInput = profileForm.querySelector("#email-profile");
  const passwordProfileInput = profileForm.querySelector("#password-profile");

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
    const postId = "create-post";
    // Using a class for this rather than an id
    const createPostForm = document.querySelector(".create-post-form");
    
    // createPostForm.reset();
    createPostForm.style.display = "flex";

    // TODO - after a log in, clicking to open a "new post," writing it, then submitting the new post DOES NOT submit it, there is some sort of lag..."
    // TRYING THIS...
    // refreshPosts()

    // console.log("createPostForm", createPostForm);

    charCount(postId);
  }

  function cancelCreatePostForm(button) {
    // Using a class for this rather than an id
    const createPostForm = document.querySelector(".create-post-form");
    createPostForm.style.display = "none";
    createPostForm.reset();
  }

  function openCreateCommentForm(button) {
    const postId = button.dataset.postId;
    const createCommentForm = document.getElementById(postId);

    button.style.display = "none";
    createCommentForm.style.display = "block";

    // console.log("Log from openCreateCommentForm in events.js", state.currentUser);

    charCount(postId);
  }

  function closeCreateCommentForm(button) {
    const postId = button.dataset.postId;
    const createCommentForm = document.getElementById(postId);

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
    console.log("commentId ===", commentId);

    const existingComment = document.getElementById(commentId);
    const updateCommentForm = document.getElementById(
      `update-comment-form-${commentId}`,
    );

    existingComment.style.display = "block";
    updateCommentForm.style.display = "none";
  }

  function charCount(postOrCommentId) {
    const charCountTargetElement = document.getElementById(
      `textarea-${postOrCommentId}`,
    );
    const maxCharLimitMessage = document.getElementById(
      `max-char-limit-${postOrCommentId}`,
    );

    charCountTargetElement.addEventListener("input", () => {
      const charCount = charCountTargetElement.value.length;

      maxCharLimitMessage.textContent = `${charCount}/255 Characters`;
    });
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
        // Used to open the modal via the profile button after someone logs in, but this time only shows the profile form.
        modalContainer.style.display = "block";
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
        errorMessageProfile.textContent = "";
        errorMessageConfirmProfileDelete.textContent = "";
        // errorMessageHeader.textContent = ""; // TODO - check this to make sure it works
        break;

      case "clear-form":  // TODO - make sure these are all used
        // Clears all the error messages generically as a catch all button; there was an issue with errors persisting
        errorMessageProfile.textContent = "";
        errorMessageConfirmProfileDelete.textContent = "";
        errorMessageHeader.textContent = ""; // TODO - check this to make sure it works

        loginForm.reset(); // ???
        profileForm.reset();
        break;

      case "clear-login-form":
        // Clears all the error messages generically as a catch all button; there was an issue with errors persisting
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
        break;

      case "open-profile-delete-confirmation":
        confirmProfileDeleteForm.style.display = "block";
        break;

      case "close-profile-delete-confirmation":
        confirmProfileDeleteForm.style.display = "none";
        break;

      case "open-new-post-form":
        openCreatePostForm(button);
        // console.log(
        //   "Log from open-new-post-form in events.js",
        //   state.currentUser,
        // );
        break;
        
      case "cancel-new-post-form":
        cancelCreatePostForm(button);
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

      case "logout":
        try {
          await logout();
          // Reset the forms so no data lingers on a subsequent viewing          
          // loginForm.reset();

          console.log("Logout click");
          

          // Clear the states for posts and currentUser
          state.currentUser = null;
          state.posts = null
          
          // loginForm.reset();
          location.reload() // TODO - remove later
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
      form !== deletePostForm &&
      !form.matches(".delete-post-form") &&
      form !== createCommentForm &&
      !form.matches(".create-comment-form") &&
      form !== updateCommentForm &&
      !form.matches(".update-comment-form") &&
      form !== deleteCommentForm &&
      !form.matches(".delete-comment-form")
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

        console.log("Create post form - after login?: ", createPostForm)

        // loginForm.reset();
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

        // Refresh state.posts and posts
        await refreshPosts();

        modalContainer.style.display = "none";

        errorMessageProfile.textContent = "";

        // Reset all forms
        loginForm.reset();
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

        // Refresh state.posts and posts
        await refreshPosts();

        // Reset modalContainer and confirmProfileDeleteForm to display = none
        modalContainer.style.display = "none";
        confirmProfileDeleteForm.style.display = "none";
        errorMessageConfirmProfileDelete.textContent = "";

        // Reset all forms
        loginForm.reset();
        profileForm.reset();

        console.log("💀 User account deleted");
      } catch (err) {
        console.error("Profile account deletion failed:", err);
        errorMessageConfirmProfileDelete.textContent = err.message;
      }
    }

    // Create Post
    // if (form.matches(".create-post-form")) {
    // if (form === createPostForm) {
    if (form.matches(".create-post-form")) {
      // openCreatePostForm
      const postId = "create-post";
      const postTitleInput = form.querySelector("#create-post-title");
      const postTextArea = form.querySelector(`#textarea-${postId}`);

      console.log("Here 1...");

      const postTitle = postTitleInput.value;
      console.log("postDraftTitle", postTitle);

      const postMessage = postTextArea.value;
      console.log("postMessage", postMessage);

      console.log("Here 2...");

      try {
        console.log("createPostForm in form submit code", createPostForm);

        const postData = await createNewBlogPost(
          // userId, Not needed, backend handles this
          // postId,
          postTitle,
          postMessage,
        );

        // Refresh state.posts and posts
        await refreshPosts();
        // const createPostForm = document.querySelector(".create-post-form");
        // Use form!!!
        form.style.display = "none";
        // createPostForm.reset()
        form.reset()
        
        console.log("Post created", postData);
      } catch (err) {
        console.error("Post creation failed:", err);
        errorMessageHeader.textContent = err.message;
      }
    }

    // Delete Post
    // NOTE - these are hard deletes by design with no warning message
    if (form.matches(".delete-post-form")) {
      const postId = form.dataset.postId;

      try {
        const deletePostData = await deleteBlogPost(
          // userId, Not needed, backend handles this
          postId,
        );

        // Refresh state.posts and posts
        await refreshPosts();

        console.log("Post deleted", deletePostData);
      } catch (err) {
        console.error("Post deletion failed:", err);
        errorMessageHeader.textContent = err.message;
      }
    }

    // Create Comment
    if (form.matches(".create-comment-form")) {
      const postId = form.id;

      const commentTextArea = document.querySelector(`#textarea-${postId}`);

      const commentMessage = commentTextArea.value;

      try {
        const commentData = await createNewBlogComment(
          // userId, Not needed, backend handles this
          postId,
          commentMessage,
        );

        // Refresh state.posts and posts
        await refreshPosts();

        console.log("Comment created", commentData);
      } catch (err) {
        console.error("Comment creation failed:", err);
        errorMessageHeader.textContent = err.message;
      }
    }

    // Update Comment
    if (form.matches(".update-comment-form")) {
      const commentId = form.dataset.commentId;
      console.log("form.dataset.commentId === ", commentId);

      const commentUpdateTextArea = document.getElementById(
        `textarea-${commentId}`,
      );

      const commentUpdateMessage = commentUpdateTextArea.value;
      let commentUpdateMessageCount = commentUpdateMessage.length;

      try {
        const commentUpdateData = await editBlogComment(
          // userId, Not needed, backend handles this
          commentId,
          commentUpdateMessage,
        );

        // Refresh header
        renderHeader(state.currentUser);

        // Refresh state.posts and posts
        await refreshPosts();

        console.log("Comment update", commentUpdateData);
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
          // userId, Not needed, backend handles this
          commentId,
        );

        // Refresh state.posts and posts
        await refreshPosts();

        console.log("Comment deleted", deleteCommentData);
      } catch (err) {
        console.error("Comment deletion failed:", err);
        errorMessageHeader.textContent = err.message;
      }
    }
  })
}
