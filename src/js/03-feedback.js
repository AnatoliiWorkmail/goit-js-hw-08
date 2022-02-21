// import throttle from "lodash.throttle";

const formData = {};
let inputData;
let textareaData;
const KEY = "feedback-form-state";
const refs = {
  form: document.querySelector(".feedback-form"),
  input: document.querySelector(".feedback-form input"),
  textarea: document.querySelector(".feedback-form textarea"),
};

refs.form.addEventListener("submit", onFormSubmit);
refs.form.addEventListener("input", onInputForm);
refs.input.addEventListener("input", onInput);
refs.textarea.addEventListener("input", onTextareaInput);
// ----запись в память------
function onInput(evt) {
  inputData = evt.target.value;
}
function onTextareaInput(evt) {
  textareaData = evt.target.value;
}
function onInputForm() {
  if (formData) {
    formData.email = inputData;
    formData.message = textareaData;
    localStorage.setItem(KEY, JSON.stringify(formData));
    console.log(localStorage);
  }
}
// ----update-input------
function updateInput() {
  const savedMessage = JSON.parse(localStorage.getItem(KEY));
  if (savedMessage) {
    refs.textarea.value = savedMessage.message;
    refs.input.value = savedMessage.email;
    console.log(savedMessage);
  }
}
updateInput();
// ----submitForm-------------
function onFormSubmit(evt) {
  evt.preventDefault();

  console.log("Отправляем форму");
  evt.currentTarget.reset();
  localStorage.removeItem(KEY);
}
