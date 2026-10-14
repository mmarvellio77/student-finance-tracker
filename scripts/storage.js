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

const defaults = { base: "USD", eur: "0.92", rwf: "1300" };
export function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem("finance:settings")) || defaults;
  } catch {
    return defaults;
  }
}

export function saveSettings(settings) {
  localStorage.setItem("finance:settings", JSON.stringify(settings));
}
