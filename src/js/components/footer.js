export function renderFooter() {
  const date = new Date();
  const year = date.getFullYear();

  const footerContainer = document.querySelector("footer");
  footerContainer.textContent = `Mad Muffin Man Design © ${year}`;
}
