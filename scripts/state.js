export let state = {
  records: [],
  search: '',
  sort: 'date-desc',
  currency: 'USD',
  budgetCap: 500,
  rates: { USD: 1, EUR: 0.92, GBP: 0.79 },
  categories: ['Food', 'Books', 'Transport', 'Entertainment', 'Fees', 'Other'],
  caseInsensitive: true
};

export function addRecord(record) {
  state.records.push(record);
}

export function updateRecord(id, updates) {
  const record = state.records.find(r => r.id === id);
  if (record) {
    Object.assign(record, updates, { updatedAt: new Date().toISOString() });
  }
}

export function deleteRecord(id) {
  state.records = state.records.filter(r => r.id !== id);
}

export function setState(updates) {
  Object.assign(state, updates);
}
