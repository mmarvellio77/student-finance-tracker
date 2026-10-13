import { highlightIntro } from "./search.js";
export function renderRecords(records, re) {
  const body = document.getElementById("records-body");
  body.innerHTML = "";
  records.forEach((record) => {
    const row = document.createElement("tr");
    const values = [
      record.date,
      record.description,
      record.category,
      record.amount.toFixed(2),
    ];
    values.forEach((text) => {
      const cell = document.createElement("td");
      highlightIntro(cell, text, re);
      row.appendChild(cell);
    });

    //Actions column (edit/delete come later)
    row.appendChild(document.createElement("td"));

    body.appendChild(row);
  });
}
