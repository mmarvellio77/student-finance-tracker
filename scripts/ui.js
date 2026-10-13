export function renderRecords(records) {
  const body = document.getElementById("records-body");
  body.innerHTML = "";

  records.forEach((record) => {
    const row = document.createElement("tr");
    const values = [
      record.date,
      record.description,
      record.category,
      record.amount.toFixed(2),
      "", //actions (edit/delete) come later
    ];

    values.forEach((text) => {
      const cell = document.createElement("td");
      cell.textContent = text;
      row.appendChild(cell);
    });

    body.appendChild(row);
  });
}
