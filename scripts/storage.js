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
