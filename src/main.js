import "./css/styles.css";
import { state } from "./js/state.js";

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
  // NOTE - as per state.js, state.currentUser starts as null, and both state.posts and state.users starts as = []
  const userData = await getCurrentUser();
  state.currentUser = userData.user;
  // state.posts = []; // TODO - delete if nothing breaks
  // state.users = []; // TODO - delete if nothing breaks

  console.log("CHECK YO SELF...");
  console.log("Is state.currentUser null?? ==> ", state.currentUser);
  console.log("Is state.posts empty?? ==> ", state.posts);
  console.log("Is state.users empty?? ==> ", state.users);

  if (!state.currentUser) {
    renderHeader(state.currentUser);
    loginSplash();
    renderPosts((state.posts = []), (state.currentUser = null));
  } else if (state.currentUser && state.currentUser.role === "WRITER") {
    renderHeader(state.currentUser);

    const postData = await getBlogPosts();
    state.posts = postData.posts;
    renderPosts(state.posts, state.currentUser);

    console.log("Yes...state.currentUser is ", state.currentUser.role);
  } else if (state.currentUser && state.currentUser.role === "ADMIN") {
    renderHeader(state.currentUser);

    const postData = await getBlogPosts();
    state.posts = postData.posts;
    renderPosts(state.posts, state.currentUser);

    const usersData = await getUsersForAdmin();
    console.log("usersData!!!!", usersData);
    state.users = usersData.users;
    renderAdminUsers(state.users, state.currentUser);

    console.log("Yes...state.currentUser is ", state.currentUser.role);
  }

  renderModal();
  renderFooter();
  registerEventListeners();
}

init();
