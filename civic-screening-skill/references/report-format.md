# Report Format

Generate a `.docx` report using `scripts/create-report.js`.

## Report structure

1. **Header**: "CONFIDENTIAL" / "КАНФІДЭНЦЫЙНА" (match team language)
2. **Title**: "Application Screening: [Program Name]"
3. **Stats**: Screening date, total applications, red flags count, yellow flags count
4. **Summary table**: Flag level (color-coded) | Name | Key risk factors
5. **Detailed analysis** per flagged applicant:
   - Name, contact info, location
   - Flag level + reasoning (specific evidence per criterion)
   - OSINT results (what was / wasn't found online)
   - Motivation cross-comparison results (if applicable)
   - Cross-reference results (prior applications, prior screening)
6. **Methodology note**: What criteria were applied, limitations of automated screening
7. **Disclaimer**: "This is a pre-screening aid. Final decisions rest with the selection team."

## Script usage

```bash
node scripts/create-report.js input.json output.docx
```

Input JSON schema — see `scripts/create-report.js` header comment.

## Language

Ask the user for the team's working language. Common: Belarusian, Russian, Ukrainian, English. Generate report in that language.

## Screening history template

If the org doesn't have a screening history yet, offer to create a simple table (CSV, Google Sheet, or Airtable — match their tool) with columns:

| Column | Purpose |
|---|---|
| Name | Applicant full name |
| Program | Program name |
| Date | Screening date |
| Flag level | Red / Yellow / Green |
| Reasons | Flag reasoning |
| OSINT results | What was found/not found |
| Cross-reference | Prior applications info |
| Team decision | Admitted / Rejected / Needs review / Pending |
| Team notes | Free text |
