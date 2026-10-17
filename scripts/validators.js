//The 4 required regex rules
const descriptionRule = /^\S(?:.*\S)?$/;
const amountRule = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
const dateRule = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const categoryRule = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

//Advanced rule: back-reference to catch repeated words("coffeee coffee")
const duplicateWordRule = /\b(\w+)\s+\1\b/i;

//Each function returns an error message, or "" if the value is valid

export function validateDescription(value) {
  if (!descriptionRule.test(value)) {
    return "Required. No spaces at the start or end.";
  }
  if (/\s{2,}/.test(value)) {
    return "No double spaces.";
  }
  return "";
}
export function validateDate(value) {
  if (!dateRule.test(value)) {
    return "Use the format YYYY-MM-DD.";
  }
  return "";
}
export function validateAmount(value) {
  if (!amountRule.test(value)) {
    return "Use a number like 12 or 12.50 (max 2 decimals).";
  }
  return "";
}
export function validateCategory(value) {
  if (!categoryRule.test(value)) {
    return "Letters, spaces and hyphens only.";
  }
  return "";
}
export function hasDuplicateWord(value) {
  return duplicateWordRule.test(value);
}

export function isValidRecord(r) {
  return (
    r !== null &&
    typeof r === "object" &&
    typeof r.id === "string" &&
    typeof r.description === "string" &&
    validateDescription(r.description) === "" &&
    typeof r.amount === "number" &&
    validateAmount(String(r.amount)) === "" &&
    typeof r.category === "string" &&
    validateCategory(r.category) === "" &&
    typeof r.date === "string" &&
    validateDate(r.date) === "" &&
    typeof r.createdAt === "string" &&
    typeof r.updatedAt === "string"
  );
}

export function validateCurrency(value) {
  if (!/^[A-Z]{3}$/.test(value)) {
    return "The currency code must be 3 capital letters, like USD.";
  }
  return "";
}
export function validateRate(value) {
  if (!/^\d+(\.\d{1,6})?$/.test(value) || Number(value) === 0) {
    return "The rate must be a number above 0, like 0.92.";
  }
  return "";
}
