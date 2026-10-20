import "./css/styles.css";
import { state } from "./js/state.js";
import { loginSplash } from "./js/components/login-view.js";
import { registerEventListeners } from "./js/events.js";
import { getCurrentUser } from "./js/auth.js";
import { getBlogPosts } from "./js/posts.js";
import { renderHeader } from "./js/components/header.js";
import { renderPosts } from "./js/components/posts-view.js";
import { renderFooter } from "./js/components/footer.js";
import { renderModal } from "./js/components/modal.js";

async function init() {
  const userData = await getCurrentUser();  // userData starts as null
  state.currentUser = userData.user;
  state.posts = [];

  console.log("Is this null?? ==> ", state.currentUser);

  

  if (!state.currentUser) {
    renderHeader(state.currentUser);
    loginSplash();
    renderPosts(state.posts = [], state.currentUser = null);
  }

  if (state.currentUser) {
    renderHeader(state.currentUser);
    const postData = await getBlogPosts();
    state.posts = postData.posts;
    renderPosts(state.posts, state.currentUser);   
  } 

  renderModal();
  renderFooter();

  registerEventListeners();
}

init();
