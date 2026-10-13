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
