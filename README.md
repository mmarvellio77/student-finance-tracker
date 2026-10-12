#Student Finance Tracker

Vanilla HTML/CSS/JS app to track student spending. Theme: **Student Finance Tracker**

##M1: Spec

## Data model
'''json
{
  "id": "txn_0001",
  "description": "Lunch at cafeteria",
  "amount": 12.50,
  "category": "Food",
  "date": "2025-09-29",
  "createdAt": "2025-09-29T10:00:00.000Z",
  "updatedAt": "2025-09-29T10:00:00.000Z"
}
'''


### Regex catalog
| Field | Pattern | Valid | Invalid |
|---|---|---|---|
| Description | ' /^\S(?:.*\S)?$/' | 'Lunch at cafeteria' | ' Lunch ' |
| Amount | '/^(0\|[1-9]/d*)(\.\d{1,2})?$/' | '12.50', '0' | '012', '1.234' |
| Date | '/^\d{4}-(0[1-9]\|1[0-2]_-90[1-9]\|[12]\d\|3[01])$/' | '2025-09-29' | '2025-13-01'|
| Category | '/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/' | 'Food', 'Self-care' | 'Food2', '\-Food' |
| Advanced (back-reference) | /\b(\w+)\s+\1\b/' | flags 'coffee coffee' | 'coffee and tea' |


### Accessibility plan
-Semantic landmarks: 'header', 'nav', 'main', 'section', 'footer'; one 'h1', logical 'h2'/'h3'
-Skip-to-content lnk, visible ':focus-visible' styles, full keyboard flow
-Every input has abound  '<label>'; errors shown inline and announced via 'role="status"' / 'aria-live'
-Budget cap message: 'aria-live="polite"' when under, '"assertive"' when exceeded
-Colour contrast at least 4.5:1
-Mobile-first breakpoints: ~360px, 768px, 1024px

##Wireframes
See 'assets/wireframes/'.
