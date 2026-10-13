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
