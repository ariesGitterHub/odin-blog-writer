import { 
  login,
   logout,
   } from "./auth.js";
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

import { getUsersForAdmin, deleteUserByAdmin } from "./admin.js";
import { renderAdminUsers } from "./components/admin-view.js";


import { renderHeader } from "./components/header.js";
import { getBlogPosts } from "../js/posts.js";
import { renderPosts } from "./components/posts-view.js";
import { state } from "./state.js";
import { loginSplash } from "./components/login-view.js";

export function registerEventListeners() {
  const app = document.querySelector("#app");

  const headerContainer = document.querySelector("header");
  const loginContainer = document.querySelector("#login");
  const postsContainer = document.querySelector("#posts");
  const adminContainer = document.querySelector("#admin");
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
  const updatePostForm = document.querySelector(".update-post-form");
  const togglePublishedPostForm = document.querySelector(".toggle-published-post-form");
  const deletePostForm = document.querySelector(".delete-post-form");
  const createCommentForm = document.querySelector(".create-comment-form");
  const updateCommentForm = document.querySelector(".update-comment-form");
  const deleteCommentForm = document.querySelector(".delete-comment-form");
  const adminDeleteUserForm = document.querySelector(".delete-user-form");

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

    charCount(postId);
  }

  function cancelCreatePostForm(button) {
    // Using a class for this rather than an id
    const createPostForm = document.querySelector(".create-post-form");
    createPostForm.style.display = "none";
    createPostForm.reset();
  }

  function openUpdatePostForm(button) {
    const postId = button.dataset.postId;
    console.log(postId);
    
    const updatePostForm = document.querySelector(`#update-post-form-${postId}`);
    console.log("updatePostForm: ", updatePostForm);
    
    const existingPost = document.getElementById(postId);
    
    updatePostForm.style.display = "block"; 
    existingPost.style.display = "none"
  
    charCount(postId);
  }

  function closeUpdatePostForm(button) {
    const postId = button.dataset.postId;
    const updatePostForm = document.querySelector(`#update-post-form-${postId}`);
  
    const existingPost = document.querySelector(`#${postId}`);

    updatePostForm.style.display = "none"; 
    existingPost.style.display = "block"
    // updatePostForm.reset();
  }

  function openCreateCommentForm(button) {
    const postId = button.dataset.postId;
    const createComment = "create-comment";

    // const createCommentForm = document.getElementById(postId);
    const createCommentForm = document.getElementById(`create-comment-form-${postId}`);

    button.style.display = "none";
    createCommentForm.style.display = "block";

    // console.log("Log from openCreateCommentForm in events.js", state.currentUser);

    // charCount(postId);
    charCount(postId, createComment);
  }

  function closeCreateCommentForm(button) {
    const postId = button.dataset.postId;
    // const createCommentForm = document.getElementById(postId);
    const createCommentForm = document.getElementById(`create-comment-form-${postId}`);

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

  // function charCount(postOrCommentId) {
  //   // const charCountTargetElement = document.getElementById(
  //   //   `textarea-${postOrCommentId}`,
  //   // );
  //   const charCountTargetElement = document.querySelector(
  //     `#textarea-${postOrCommentId}`);
  //   // const maxCharLimitMessage = document.getElementById(
  //   //   `max-char-limit-${postOrCommentId}`,
  //   // );

  //   console.log("charCountTargetElement", charCountTargetElement);

  //   const maxCharLimitMessage = document.querySelector(
  //     `#max-char-limit-${postOrCommentId}`);

  //     console.log("maxCharLimitMessage", maxCharLimitMessage);

  //   charCountTargetElement.addEventListener("input", () => {
  //     const charCount = charCountTargetElement.value.length;
  //     console.log("charCount === ", charCount);
      
  //     maxCharLimitMessage.textContent = `${charCount}/255 Characters`;
  //   });
  // }

  function charCount(postOrCommentId, createComment) {
    // 1. Determine which ID to use based on your condition
    const targetId =
      createComment === "create-comment" ? `${createComment}-${postOrCommentId}` : postOrCommentId;

    // 2. Select the elements using the determined ID
    const charCountTargetElement = document.querySelector(
      `#textarea-${targetId}`,
    );
    const maxCharLimitMessage = document.querySelector(
      `#max-char-limit-${targetId}`,
    );

    // 3. Optional: Add a safety check to prevent errors if elements don't exist on the page
    if (!charCountTargetElement || !maxCharLimitMessage) {
      console.warn(`Elements not found for ID: ${targetId}`);
      // console.error(`Elements not found for ID: ${targetId}`);
      return;
    }

    // 4. Log and attach the event listener once
    console.log("charCountTargetElement", charCountTargetElement);
    console.log("maxCharLimitMessage", maxCharLimitMessage);

    charCountTargetElement.addEventListener("input", () => {
      const currentCount = charCountTargetElement.value.length;
      console.log("charCount === ", currentCount);

      maxCharLimitMessage.textContent = `${currentCount}/255 Characters`;
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

      case "clear-form": // TODO - make sure these are all used
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
        console.log("open admin...");
      // if (currentUser && currentUser.role === "ADMIN") {
      //   adminContainer.style.display = "flex";
      //   postsContainer.style.display = "none";
      // } else {
      //   adminContainer.style.display = "none";
      //   postsContainer.style.display = "flex";
      // }

      if (postsContainer.style.display === "flex") {
        postsContainer.style.display = "none";
        adminContainer.style.display = "flex";
      } else {
        postsContainer.style.display = "flex";
        adminContainer.style.display = "none";
      }
        break;

      case "logout":
        try {
          await logout();
          // Reset the forms so no data lingers on a subsequent viewing
          // loginForm.reset();

          console.log("Logout click");

          // Clear the states for posts and currentUser
          state.currentUser = null;
          state.posts = null;

          // loginForm.reset();
          location.reload(); // TODO - remove later
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
      form !== adminDeleteUserForm &&
      !form.matches(".delete-user-form")
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

        console.log("Create post form - after login?: ", createPostForm);

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
        // loginForm.reset();
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
      const postId = "create-post";

      const createPostTitleInput = form.querySelector("#create-post-title");
      const createPostTextArea = form.querySelector(`#textarea-${postId}`);

      const createPostTitle = createPostTitleInput.value;
      const createPostMessage = createPostTextArea.value;

      try {
        const postData = await createNewBlogPost(
          // userId, Not needed, backend handles this
          // postId,
          createPostTitle,
          createPostMessage,
        );

        // Refresh state.posts and posts
        await refreshPosts();

        form.style.display = "none";
        // createPostForm.reset()
        form.reset();

        console.log("Post created", postData);
      } catch (err) {
        console.error("Post creation failed:", err);
        errorMessageHeader.textContent = err.message;
      }
    }

    // Update Post 
    if (form.matches(".update-post-form")) {
      const postId = form.dataset.postId;
      console.log("This form's postId should be === ", postId);

      // const updatePostTitleInput = document.getElementById(
      //   `update-post-title-${postId}`,
      // );
      const updatePostTitleInput = form.querySelector(`#update-post-title-${postId}`);
      const updatePostTitle = updatePostTitleInput.value;
    

      // const updatePostTextArea = document.getElementById(
      //   `textarea-${postId}`,
      // );
      const updatePostTextArea = form.querySelector(`#textarea-${postId}`);

      const updatePostMessage = updatePostTextArea.value;
      // console.log("updatePostMessage........", updatePostMessage);

      // let updatePostMessageCount = updatePostMessage.length; // TODO - what is this for???

      try {
        const updatePostData = await editBlogPost(
          // userId, Not needed, backend handles this
          postId,
          // updatePostTitleInput,
          updatePostTitle,
          updatePostMessage,
        );

        // Refresh header
        renderHeader(state.currentUser);

        // Refresh state.posts and posts
        await refreshPosts();

        console.log("Post update", updatePostData);
      } catch (err) {
        console.error("Post update failed:", err);
        errorMessageHeader.textContent = err.message;
      }
    }

    // Toggle Post Publish Status
    if (form.matches(".toggle-published-post-form")) {
      const postId = form.dataset.postId;
      console.log("This form's postId should be === ", postId);
;
      const publishPostButton = form.querySelector(
        `#publish-post-button-${postId}`,
      );
      let publishPostButtonDataset = publishPostButton.dataset.published;
      console.log("publishPostButtonDataset", publishPostButtonDataset);

      const publishedInput = form.querySelector(`#published-${postId}`);
      let togglePublishValue = publishedInput.checked;
      console.log("publishedInput value", publishedInput.checked);

      try {
        // let togglePublishValue;

        if (publishPostButtonDataset === "true") {
          publishPostButtonDataset = "false";
          publishPostButton.textContent = "Publish";
          publishPostButton.style.backgroundColor = "var(--red)";
          // togglePublishValue = "false";
          togglePublishValue = publishedInput.checked = false;
        } else if (publishPostButtonDataset === "false") {
          publishPostButton.dataset.published = "true";
          publishPostButton.textContent = "Unpublish";
          publishPostButton.style.backgroundColor = "var(--black)";
          // togglePublishValue = "true";
          togglePublishValue = publishedInput.checked = true;
        }

        const updatePostData = await togglePublishedBlogPost(
          // userId, Not needed, backend handles this
          postId,
          // published,
          togglePublishValue,
        );

        // Refresh header
        renderHeader(state.currentUser);

        // Refresh state.posts and posts
        await refreshPosts();

        console.log("Published post update", updatePostData);
      } catch (err) {
        console.error("Published post update failed:", err);
        errorMessageHeader.textContent = err.message;
      }
    }

    // Delete Post
    if (form.matches(".delete-post-form")) {
      // Delete Post
      // NOTE - these are hard deletes by design with no warning message
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
      // const postId = form.id;
      const postId = form.dataset.postId;
      const createComment = "create-comment"; // NOTE - this was added to avoid collisions that were occurring with updatePostForm textarea and one other, see renderCreateCommentForm()

      // const createCommentTextArea = document.querySelector(`#textarea-${postId}`);
      const createCommentTextArea = form.querySelector(
        `#textarea-${createComment}-${postId}`,
      );

      const createCommentMessage = createCommentTextArea.value;

      try {
        const createCommentData = await createNewBlogComment(
          // userId, Not needed, backend handles this
          postId,
          createCommentMessage,
        );

        // Refresh state.posts and posts
        await refreshPosts();

        console.log("Comment created", createCommentData);
      } catch (err) {
        console.error("Comment creation failed:", err);
        errorMessageHeader.textContent = err.message;
      }
    }

    // Update Comment
    if (form.matches(".update-comment-form")) {
      const commentId = form.dataset.commentId;
      console.log("form.dataset.commentId === ", commentId);

      // const updateCommentTextArea = document.getElementById(
      //   `textarea-${commentId}`,
      // );
      const updateCommentTextArea = form.querySelector(`#textarea-${commentId}`);

      const updateCommentMessage = updateCommentTextArea.value;
      // let updateCommentMessageCount = updateCommentMessage.length;

      try {
        const updateCommentData = await editBlogComment(
          // userId, Not needed, backend handles this
          commentId,
          updateCommentMessage,
        );

        // Refresh header
        renderHeader(state.currentUser);

        // Refresh state.posts and posts
        await refreshPosts();

        console.log("Comment update", updateCommentData);
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

    if (form.matches(".delete-user-form")) {
      const userId = form.dataset.userId;

      try {
        const adminDeleteUserData = await deleteUserByAdmin(
          userId,
        );

        // Refresh state.posts and posts
        // await refreshPosts();

            const usersData = await getUsersForAdmin();
            console.log("usersData!!!!", usersData);
            state.users = usersData.users;
            // state.currentUser is working here
            console.log("This is sort of vital...state.currentUser is...", state.currentUser.role);
            
            renderAdminUsers(state.users, state.currentUser);


        console.log("User deleted by admin", adminDeleteUserData);
      } catch (err) {
        console.error("User deletion by admin failed:", err);
        errorMessageHeader.textContent = err.message;
      }
    }
  })
}
