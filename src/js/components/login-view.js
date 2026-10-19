import { renderLoginForm } from "./forms.js";

// export function loginSplash(currentUser) {
export function loginSplash() {
  const loginContainer = document.querySelector("#login");
  
  // Clear the previous children
  loginContainer.replaceChildren();

  const loginForm = renderLoginForm();
  loginContainer.append(loginForm);
}
