---
name: civic-screening
description: >
  Security pre-screening of applications to civil society educational programs
  in repressive environments. Data-source agnostic (Airtable, Google Sheets,
  CSV, any form tool). Triggers: "screening", "pre-screening", "скрининг",
  "проверка заявок", "проверить участников", "check applicants".
---

# Application Security Pre-Screening

Pre-screen program applications for infiltration risks. Flag suspicious patterns for the selection team to review. You are advisory — humans decide.

## Before you start

1. Read `references/config.md` — org-specific settings (if the file exists)
2. Read `references/screening-criteria.md` — full methodology
3. Read `references/data-sources.md` — how to load data from any source
4. Read `references/report-format.md` — report structure and generation

## Workflow

**Step 1 — Load data.** Identify program, load applications per `references/data-sources.md`. Confirm record count with user.

**Step 2 — Screen.** Evaluate each application per `references/screening-criteria.md`. Assign flags: Red (multiple strong indicators), Yellow (one moderate indicator), Green (none).

**Step 3 — Cross-compare motivation texts.** Compare all motivation texts against each other. Flag groups of texts with suspiciously similar structure, phrasing, or arguments from different applicants — possible coordinated submission.

**Step 4 — OSINT on flagged applicants.** For each Red/Yellow flag, run a web search: `"Full Name" + city`, email, messenger handle. A real person usually has some online trace. Finding them reduces concern; finding nothing adds to it. Note results per applicant.

**Step 5 — Cross-reference history.** Search prior application data and screening history (if available) for matches by name, email, messenger. Note consistency of data across submissions.

**Step 6 — Generate report.** Create `.docx` per `references/report-format.md`. Ask team's working language if unclear. Save to workspace folder. Mark CONFIDENTIAL.

## Principles

- **Err toward flagging.** False positive = 2 min review. False negative = compromised safety.
- **Cite evidence.** Never flag with just "suspicious" — state exactly what triggered it.
- **Advisory only.** Present evidence, not verdicts. The team knows their context better.
- **Context matters.** People under repression have real reasons for minimal digital presence. No single factor = red flag alone.
- **Protect data.** Report is confidential. Remind user.
- **Data processing compliance.** Applicant data is sent to a third-party AI provider (e.g. Anthropic) for processing. Organizations using this skill must: (1) inform applicants in the application form that their data may be processed using automated tools, (2) comply with applicable data protection regulations (GDPR or equivalent), (3) ensure appropriate data processing settings on their AI provider account (e.g. disable training on user data).
