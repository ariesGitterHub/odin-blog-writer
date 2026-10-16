// Reusable templates
export function createButton(type, textContent, action, ...classes) {
  const button = document.createElement("button");

  button.type = type;
  button.textContent = textContent;
  button.dataset.action = action;

  if (classes.length) {
    button.classList.add(...classes);
  }

  return button;
}

export function createLabel(labelFor, textContent, ...classes) {
  const label = document.createElement("label");

  label.htmlFor = labelFor;
  label.textContent = textContent;

  if (classes.length) {
    label.classList.add(...classes);
  }

  return label;
}

export function createInput(
  id,
  type,
  name,
  placeholder,
  required = false,
  ...classes
) {
  const input = document.createElement("input");
  input.id = id;
  input.type = type;
  input.name = name;
  input.placeholder = placeholder;
  input.required = required;

  if (classes.length) {
    input.classList.add(...classes);
  }

  return input;
}

export function createElement(tagName, textContent, ...classes) {
  const element = document.createElement(tagName);
  element.textContent = textContent;

  if (classes.length) {
    element.classList.add(...classes);
  }

  return element;
}

export function createImage(src, alt, ...classes) {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;

  if (classes.length) {
    image.classList.add(...classes);
  }

  return image;
}
