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
  const userData = await getCurrentUser();  // userData starts as null
  state.currentUser = userData.user;
  state.posts = [];
  state.users = [];

  console.log("Is this null?? ==> ", state.currentUser);

  if (!state.currentUser) {
    renderHeader(state.currentUser);
    loginSplash();
    renderPosts(state.posts = [], state.currentUser = null);
    console.log("NO! ---> state.currentUser");
  // } else {
  //   // if (state.currentUser) {
  //   renderHeader(state.currentUser);
  //   // renderAdminUsers();
  //   const postData = await getBlogPosts();
  //   state.posts = postData.posts;
  //   renderPosts(state.posts, state.currentUser);   
  //   console.log("Yes...state.currentUser")
  // } 
  // } else if (state.currentUser && state.currentUser.role === "WRITER") {
  //   renderHeader(state.currentUser);

  //   const postData = await getBlogPosts();
  //   state.posts = postData.posts;
  //   renderPosts(state.posts, state.currentUser);

  //   console.log("Yes...state.currentUser");
  } 
  // else {
  //   renderHeader(state.currentUser);

  //   const postData = await getBlogPosts();
  //   state.posts = postData.posts;
  //   renderPosts(state.posts, state.currentUser);
  //   console.log("HERE$$$");
    
  //   const usersData = await getUsersForAdmin();
  //   console.log("usersData!!!!", usersData);
  //   state.users = usersData.users;
  //   renderAdminUsers(state.users, state.currentUser);
  //   console.log("Yes...state.currentUser is ", state.currentUser.role);
  // }
  else if (state.currentUser && state.currentUser.role === "WRITER") {
    renderHeader(state.currentUser);

    const postData = await getBlogPosts();
    state.posts = postData.posts;
    renderPosts(state.posts, state.currentUser);
    console.log("HERE$$$");

    // const usersData = await getUsersForAdmin();
    // console.log("usersData!!!!", usersData);
    // state.users = usersData.users;
    // renderAdminUsers(state.users, state.currentUser);
    console.log("Yes...state.currentUser is ", state.currentUser.role);
  }
  else if (state.currentUser && state.currentUser.role === "ADMIN") {
    renderHeader(state.currentUser);

    const postData = await getBlogPosts();
    state.posts = postData.posts;
    renderPosts(state.posts, state.currentUser);
    console.log("HERE$$$");

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
