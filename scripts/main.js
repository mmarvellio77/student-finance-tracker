import {
  validateDescription,
  validateAmount,
  validateDate,
  validateCategory,
  hasDuplicateWord,
} from "./validators.js";
import {
  getRecords,
  addRecord,
  sortRecords,
  getStats,
  getLast7Days,
  deleteRecord,
} from "./state.js";
import { renderRecords, renderStats, renderTrend, renderCap } from "./ui.js";
import { compileRegex, matchesRecord } from "./search.js";
import { loadCap, saveCap } from "./storage.js";

const form = document.getElementById("record-form");
const status = document.getElementById("form-status");

const sortSelect = document.getElementById("sort");
const searchInput = document.getElementById("search");
const caseToggle = document.getElementById("case-toggle");
const searchStatus = document.getElementById("search-status");

function updateDashboard() {
  const records = getRecords();
  const stats = getStats(records);
  renderStats(stats);
  renderTrend(getLast7Days(records));
  renderCap(stats.sum, loadCap());
}

function refresh() {
  const pattern = searchInput.value;
  const re = compileRegex(pattern, caseToggle.checked ? "gi" : "g");

  const all = sortRecords(getRecords(), sortSelect.value);
  const shown = re ? all.filter((record) => matchesRecord(record, re)) : all;

  renderRecords(shown, re);

  if (pattern && !re) {
    searchStatus.textContent = "invalid pattern. Showing all records.";
  } else if (re) {
    searchStatus.textContent =
      shown.length + "of" + all.length + "records match.";
  } else {
    searchStatus.textContent = "";
  }
  updateDashboard();
}

sortSelect.addEventListener("change", refresh);
searchInput.addEventListener("input", refresh);
caseToggle.addEventListener("change", refresh);

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
const capInput = document.getElementById("cap");
const settingStatus = document.getElementById("settings-status");
capInput.value = loadCap() || "";

capInput.addEventListener("INput", () => {
  const value = capInput.value;
  if (value === "") {
    saveCap(0);
    settingsStatus.textContent = "";
  } else if (validateAmount(value) === "") {
    saveCap(Number(value));
    settingsStatus.textContent = "Cap saved.";
  } else {
    settingsStatus.textContent = validateAmount(value);
    return;
  }
  updateDashboard();
});

document.getElementById("records-body").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action='delete']");
  if (!button) return;

  if (confirm("Delete this record?")) {
    deleteRecord(button.dataset.id);
    refresh();
    status.textContent = "Record deeleted.";
  }
});

document.getElementById("export-btn").addEventListener("click", () => {
  const text = JSON.stringify; ////////9getRecords), null, 2);
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "finance-records.json";
  link.click();
  URL.revokeObjectURL(url);
  settingsStatus.textContent = "Exported" + getRecords().length + "records.";
  const file = event.target.files[0];
  if (!file) return;
  const reader = new File() / reader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!Array.isArray(data)) {
        throw new Error("the file must contain a list of records.");
      }
      replaceRecords(data);
      refresh();
      const bad = data.findIndex((r) => !isvalidRecord(r));
      if (bad !== -1) {
        throw new error("reord" + (bad + 1) + "is ivalid.");
      }

      settingsStatus.textContent = "Imported" + data.length + "records.";
    } catch (error) {
      settingsStatus.textContent = "Import failed:" + error.message;
    }

    event.target.value = "";
  };
  reader.readAstext(file);
});
refresh();
