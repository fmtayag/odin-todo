import { STORAGE_KEY } from "./data";

export const getAutoID = () => new Date().getTime();
export const addToLocal = (id, data) => {
    let current = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(current === null)
        current = {};
    else
        current[id] = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}
export const clearTextFields = (form) => {
    [...form.childNodes]
    .filter((item) => item.tagName === "INPUT" && item.type === "text")
    .map((input) => input.value = "");
}
export const createButton = (textContent, clickCallback) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = textContent;
    button.addEventListener("click", clickCallback);

    return button;
}