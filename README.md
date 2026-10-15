# Student Finance Tracker

A responsive, accessible, vanilla HTML/CSS/JS app for tracking student spending.
No frameworks. Data is stored in localStorage.

- **Theme:** Student Finance Tracker
- **Live site:** https://mmarvellio77.github.io/student-finance-tracker/
- **Demo video:** add link here!
- **Author:** Munezero Marvella: [Github](https://github.com/mmarvellio77) | m.munezero@alustudent.com

## Features

- Dashboard: total records, total spent, top category, last-7-days bar chart
- Spending cap with a live message (polite when under, assertive when over)
- Records table with sorting by date, description (A-Z) and amount
- Live regex search with a case-insensitive toggle and `<mark>` highlighting
- Add, edit and delete records (delete asks for confirmation)
- Inline validation with error messages under each field
- Settings: base currency plus EUR and RWF with manual rates, and a converted total
- JSON export and import (validated before loading)
- Auto-save to localStorage, `seed.json` with 12 sample records
- Fade-in animation(disabled when the user prefers reduced motion)

## Data model

```json
{
  "id": "txn_0001",
  "description": "Lunch at cafeteria",
  "amount": 12.5,
  "category": "Food",
  "date": "2025-09-29",
  "createdAt": "2025-09-29T10:00:00.000Z",
  "updatedAt": "2025-09-29T10:00:00.000Z"
}
```

### Regex catalog

| Where                    | Pattern                                              | Valid Example            | Invalid Example  |
| ------------------------ | ---------------------------------------------------- | ------------------------ | ---------------- |
| Description              | ` /^\S(?:.\*\S)?$/`                                  | `Lunch at cafeteria`     | `Lunch`          |
| Amount (and cap)         | `/^(0\|[1-9]\d\*)(\.\d{1,2})?$/`                     | `12.50`, `0`             | `012`, `1.234`   |
| Date                     | `/^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$/` | `2025-09-29`             | `2025-13-01`     |
| Category                 | `/^[A-Za-z]+(?:[ -][A-Za-z]+)\*$/`                   | `Self-care`              | `Food2`          |
| Advanced: back-reference | `/\b(\w+)\s+\1\b/i`                                  | warns on `coffee coffee` | `coffee and tea` |
| Currency code            | `/^[A-Z]{3}$/`                                       | `USD`                    | `usd1`           |
| Exchange rate            | `/^\d+(\.\d{1,6})?$/` (and above 0)                  | `0.92`                   | `abc`            |

### Search examples

| Type in search   | Finds                            |
| ---------------- | -------------------------------- |
| `(coffee\|tea)`  | rows containing coffee or tea    |
| `\.\d{2}\b`      | amounts with cents               |
| `\b(\w+)\s+\1\b` | repeated words                   |
| `^Lunch`         | descriptions starting with Lunch |

Invalid patterns do not crash the app. A safe compiler returns `null` and the status line says "Invalid pattern".

### Keyboard map

| Key                            | Action                         |
| ------------------------------ | ------------------------------ |
| `Tab` / `Shift+Tab`            | Move forward / backward        |
| `Tab` (first press)            | Shows "Skip to main content"   |
| `Enter` on skip link           | Jumps to main content          |
| `Enter` in a form field        | Submits the form               |
| `Enter` / `space` on a button  | Edit, Delete, Save, Export     |
| `Up` / `Down` on the sort menu | Change sort order              |
| `Space` on the checkbox        | Toggle case-insensitive search |

### Accessibility notes

- Semantic landmarks: `header`, `nav`, `main`, `section`, `footer`, with proper heading order
- Every input has a bound `<label>`
- Visible focus outline on all interactive elements
- Skip-to-content link
- Status messages use `roles="status"` / `aria-live`; the cap message switches between `polite` and `assertive`
- Invalid fields set `aria-invalid`; buttons have descriptive `aria-label`s
- The chart has a text alternative(`role="img"` with `aria-label`)
- The colours chosen for strong contrast; animations respect `prefers-reduced-motion`
- Responsive breakpoints at about 360px, 768px and 1024px (mobile first)

## How to run

ES modules need a local server:

```bash
python3 -m http.server8000
```

Open http://localhost:8000/index.html

## How to run tests

With the server running, open http://localhost:8000/tests.html. All 14 assertions should show `PASS`.

## Import / export

- **Export JSON** downloads `finance-records.json`
- **Import JSON** checks that the file is a list and every record has a valid structure; otherwise it shows an error and keeps your current data
- Use `seed.json` to load 12 sample records

## Project Structure

```

index.html tests.html seed.json
styles/main.css
scripts/ main.js state.js storage.js ui.js validators.js search.js

```

## Credits

The starter snippets for the safe regex compiler, highlighter and localStorage helpers come from the course brief and were adapted.
