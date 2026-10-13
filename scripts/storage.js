const KEY = "finance:records";
export function loadRecords() {
  try {
    return JSON.parse(locslStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}
export function saveRecords(records) {
  localStorage.setItem(KEY, JSON.stringify(records));
}
export function loadCap() {
  return Number(localStorage.getItem("finance:cap")) || 0;
}
export function saveCap(value) {
  localStorage.setItem("finance:cap", String(value));
}
