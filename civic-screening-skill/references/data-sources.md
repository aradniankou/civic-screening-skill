# Data Sources

This skill is data-source agnostic. Detect what's available and adapt.

## Required data points per applicant

| Data point | Common field names |
|---|---|
| Full name | Name, Імя, ФИО, Имя Фамилия |
| Email | Email, Электронная пошта, E-mail |
| Messenger handle | Telegram, Signal, WhatsApp |
| Social media | Social links, Сацсеткі, Соцсети |
| Age | Age, Узрост, Возраст |
| Location | City, Геаграфія, Город |
| Motivation text | Motivation, Мотивация, Why do you want to participate |
| Referral source | How they found us, Откуда узнали |
| Submission date | Created, Timestamp, Дата |

Optional: professional background, organization, prior participation, portfolio/website links.

## Loading strategies

**Airtable MCP connected** → ask base + table, list tables to understand structure, fetch records filtered by program.

**Google Sheets MCP connected** → ask spreadsheet name/URL, read sheet for headers + data.

**User uploads CSV/XLSX** → parse, display columns, ask user to confirm field mapping.

**Other system** → ask user to export as CSV, or check if an MCP connector exists.

**If field names don't match** → show detected columns and ask user to map them to the required data points. Store mapping for the session.

## Historical data for cross-reference

Ask the user: "Do you have data from previous programs in the same system?" If yes, identify which table/sheet/file contains it. This enables the cross-reference step.

## Screening history

Ask: "Do you maintain a screening history (prior flags and team decisions)?" If yes, read it. If no, offer to create a template after the screening is done — see `references/report-format.md` for the template structure.
