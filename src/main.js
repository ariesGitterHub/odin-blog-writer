// import "./css/styles.css"; // This only works in dev or in Vite based apps
import { state } from "./js/state.js";
import { getCsrfToken } from "./js/api.js";
import { registerEventListeners } from "./js/events.js";
import { getCurrentUser } from "./js/auth.js";
import { getBlogPosts } from "./js/posts.js";
import { getUsersForAdmin } from "./js/admin.js";
import { renderHeader } from "./js/components/header.js";
import { renderPosts } from "./js/components/posts-view.js";
import { renderFooter } from "./js/components/footer.js";
import { renderModal } from "./js/components/modal.js";
import { loginSplash } from "./js/components/login-view.js";
import { renderAdminUsers } from "./js/components/admin-view.js";

async function init() {
  // NEW, add CSRF Token... await getCsrfToken() executes before users can submit login, signup, comment, or other state-changing requests.
  await getCsrfToken();

  // NOTE - as per state.js, state.currentUser starts as null, and both state.posts and state.users starts as = []

  const userData = await getCurrentUser();
  state.currentUser = userData.user;

  if (!state.currentUser) {
    renderHeader(state.currentUser);

    loginSplash();

    renderPosts((state.posts = []), (state.currentUser = null));
  } else if (state.currentUser && state.currentUser.role === "USER") {
    // Added for USER role contingency
    renderHeader(state.currentUser);

    const postsContainer = document.querySelector("#posts");
    postsContainer.style.border = "none";
  } else if (state.currentUser && state.currentUser.role === "WRITER") {
    renderHeader(state.currentUser);

    const postData = await getBlogPosts();
    state.posts = postData.posts;
    renderPosts(state.posts, state.currentUser);
  } else if (state.currentUser && state.currentUser.role === "ADMIN") {
    renderHeader(state.currentUser);

    const postData = await getBlogPosts();
    state.posts = postData.posts;
    renderPosts(state.posts, state.currentUser);

    const usersData = await getUsersForAdmin();
    state.users = usersData.users;
    renderAdminUsers(state.users, state.currentUser);
  }

  renderModal();
  renderFooter();
  registerEventListeners();
}

init();
