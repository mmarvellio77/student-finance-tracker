import {
  validateDescription,
  validateAmount,
  validateDate,
  validateCategory,
  hasDuplicateWord,
} from "./validators.js";
import { getRecords, addRecord, sortRecords } from "./state.js";
import { renderRecords } from "./ui.js";

const form = document.getElementById("record-form");
const status = document.getElementById("form-status");
const sortSelect = document.getElementById("sort");
function refresh() {
  renderRecords(sortRecords(getRecords(), sortSelect.value));
}
sortSelect.addEventListener("change", refresh);

const fields = [
  { id: "description", check: validateDescription },
  { id: "amount", check: validateAmount },
  { id: "category", check: validateCategory },
  { id: "date", check: validateDate },
];
function showError(field) {
  const input = document.getElementById(field.id);
  const error = document.getElementById(field.id + "-error");
  const message = field.check(input.value);

  error.textContent = message;
  input.setAttribute("aria-invalid", message !== "");
  return message === "";
}
fields.forEach((field) => {
  document.getElementById(field.id).addEventListener("input", () => {
    showError(field);
  });
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let allValid = true;
  fields.forEach((field) => {
    if (!showError(field)) {
      allValid = false;
    }
  });
  if (!allValid) {
    status.textContent = "please fix the errors above";
    return;
  }
  const data = {
    description: document.getElementById("description").value,
    amount: document.getElementById("amount").value,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
  };
  addRecord(data);
  refresh();
  form.reset();
  if (hasDuplicateWord(data.description)) {
    status.textContent = "Record saved,but the description repeats a word.";
  } else {
    status.textContent = "Record saved.";
  }
});

//Show saved records when the page loads
refresh();
