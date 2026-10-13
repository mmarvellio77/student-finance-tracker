//Returns a RegExp, or null f the input is empty or invalid
export function compileRegex(input, flags = "gi") {
  try {
    return input ? new RegExp(input, flags) : null;
  } catch {
    return null;
  }
}

//True if the pattern matches any visible any visible field of the record
export function matchesRecord(record, re) {
  const fields = [
    record.date,
    record.description,
    record.category,
    record.amount.toFixed(2),
  ];
  return fields.some((text) => text.search(re) !== -1);
}

//Puts text into an element and wraps matches in <mark>.
//Uses textContent, so user input can never inject HTML.
export function highlightIntro(element, text, re) {
  element.textContent = "";
  if (!re) {
    element.textContent = text;
    return;
  }
  let last = 0;
  for (const match of text.matchAll(re)) {
    if (match[0] === "") continue; //ignore empty matches
    element.append(text.slice(last, match.index));
    const mark = document.createElement("mark");
    mark.textContent = match[0];
    element.append(mark);
    last = match.index + match[0].length;
  }
  element.append(text.slice(last));
}
