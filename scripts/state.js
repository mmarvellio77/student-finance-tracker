import { loadRecords, saveRecords } from "./storage.js";
let records = loadRecords();

export function getRecords() {
  return records;
}

export function addRecord(data) {
  const now = new Date().toISOString();
  const record = {
    id: "txn_" + Date.now(),
    description: data.description,
    amount: Number(data.amount),
    category: data.category,
    date: data.date,
    createdAt: now,
    updatedAt: now,
  };
  records.push(record);
  saveRecords(records);
}
export function sortRecords(records, mode) {
  const sorted = [...records];
  if (mode === "date-desc") sorted.sort((a, b) => b.date.localeCompare(a.date));
  if (mode === "date-asc") sorted.sort((a, b) => a.date.localeCompare(b.date));
  if (mode === "desc-asc")
    sorted.sort((a, b) => a.description.localeCompare(b.description));
  if (mode === "desc-desc")
    sorted.sort((a, b) => b.description.localeCompare(a.description));
  if (mode === "amount-asc") sorted.sort((a, b) => a.amount - b.amount);
  if (mode === "amount-desc") sorted.sort((a, b) => b.amount - a.amount);
  return sorted;
}

export function getStats(records) {
  const count = records.length;
  const sum = records.reduce((total, r) => total + r.amount, 0);

  const totals = {};
  records.forEach((r) => {
    totals[r.category] = (totals[r.category] || 0) + r.amount;
  });
  let top = "None";
  let topAmount = 0;
  for (const category in totals) {
    if (totals[category] > topAmount) {
      top = category;
      topAmount = totals[category];
    }
  }
  return { count, sum, top };
}

export function getLast7Days(records) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key =
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0");
    days.push({ date: key, total: 0 });
  }
  records.forEach((r) => {
    const day = days.find((d) => d.date === r.date);
    if (day) day.total += r.amount;
  });
  return days;
}
export function deleteRecord(id) {
  records = records.filter((r) => r.id !== id);
  saveRecords(records);
}

export function replaceRecords(newRecords) {
  records = newRecords;
  saveRecords(records);
}

export function updateRecord(id, data) {
  const record = records.find((r) => r.id === id);
  if (!record) return;

  record.description = data.description;
  record.amount = Number(data.amount);

  record.category = data.category;
  record.date = data.date;
  record.updatedAt = new Date().toISOString();
  saveRecords(records);
}
