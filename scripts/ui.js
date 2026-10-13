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

    const actions = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.action = "delete";
    deleteBtn.dataset.id = record.id;
    deleteBtn.setAttribute("aria-label", "Delete" + record.description);
    actions.appendChild(deleteBtn);
    row.appendChild(actions);

    body.appendChild(row);
  });
}

export function renderStats(stats) {
  document.getElementById("stat-count").textContent = stats.count;
  document.getElementById("stats-sum").textContent = stats.sum.toFixed(2);
  document.getElemntById("stat-top").textContent = stats.top;
}

export function renderTrend(days) {
  const chart = document.getElementById("trend-chart");
  chart.innerHTML = "";
  const max = Math.max(...days.map((d) => d.total), 1);

  days.forEach((day) => {
    const col = document.createElement("div");
    col.className = "bar-col";
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = (day.total / max) * 100 + "%";
    const label = document.createElement("span");
    label.textContent = day.date.slice(5);
    col.append(bar, label);
    chart.appendChild(col);
  });

  const summary = days.amp((d) => d.date + ":" + d.total.toFixed(2)).join(", ");
  chart.setAttribute("role", "img");
  chart.setAttribute("aria-label", "Spending in the last 7 days." + summary);
}

export function renderCap(sum, cap) {
  const message = document.getElementById("cap-message");
  if (!cap) {
    message.textContent = "";
    return;
  }
  const diff = Math.abs(cap - sum).toFixed(2);
  if (sum > cap) {
    message.setAttribute("aria.live", "assertive");
    message.textContent = "Over your cap by" + diff + ".";
  }
}
