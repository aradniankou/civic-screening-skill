# civic-screening

AI skill for pre-screening applications to civil society educational programs in repressive environments. Flags potential infiltration risks for the selection team to review.

Built for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) / [Cowork](https://claude.ai).

## What it does

1. Loads applicant data from any source (Airtable, Google Sheets, CSV, Google Forms export, etc.)
2. Screens each application against risk criteria (digital footprint, cross-field consistency, motivation analysis, duplicates)
3. Cross-compares motivation texts to detect coordinated submissions
4. Runs OSINT checks on flagged applicants (web search for name, email, messenger)
5. Cross-references against historical application data
6. Generates a confidential `.docx` report with flagged applicants and evidence

Reports are available in English, Russian, Belarusian, and Ukrainian.

## Setup

### 1. Install as a skill

Copy the `civic-screening-skill` folder into your Claude Code skills directory, or add it as a custom skill in Cowork.

### 2. Configure for your org (optional)

Edit `references/config.md` — set your org name, working language, trusted email domains, partner organizations, and default data source. The skill works without config, but config reduces false positives.

### 3. Connect your data

The skill needs access to your application data. Options:

| Data source | What to connect |
|---|---|
| Airtable | Airtable MCP connector |
| Google Sheets | Google Sheets MCP connector |
| CSV / Excel | Upload the file directly |
| Google Forms | Export responses to Sheets or CSV |

### 4. Run

Say: **"screen applications for [program name]"** or **"проверь заявки на [программа]"**

## File structure

```
civic-screening-skill/
  SKILL.md                        — main skill (thin router, ~40 lines)
  references/
    screening-criteria.md         — full screening methodology
    data-sources.md               — how to load data from any source  
    report-format.md              — report structure + history template
    config.md                     — org-specific settings (edit this)
  scripts/
    create-report.js              — .docx report generator (4 languages)
```

## Important

- The skill is **advisory only**. It flags applications — humans decide.
- No single criterion triggers a red flag alone. The skill evaluates the full picture.
- People in repressive environments have legitimate reasons for minimal digital presence. The methodology accounts for this.
- Screening reports are **confidential**. Handle accordingly.

## License

MIT
