# Organization Config (example — customize for your org)

Delete this file or edit it to match your organization's specifics.
If this file is absent, the skill uses generic defaults.

## Organization name
<!-- Used in report headers -->
name: "Your Organization Name"

## Working language
<!-- Report language: be, ru, uk, en -->
language: "ru"

## Trusted email domains
<!-- Emails from these domains are a positive signal (not generic) -->
trusted_domains:
  - yourorg.org
  - partnerorg.com

## Known partner organizations
<!-- Mention of these in motivation = positive signal -->
partners:
  - "Partner Org One"
  - "Partner Org Two"

## High-attention regions
<!-- Applicants from these locations get extra cross-reference (not auto-flagged) -->
high_attention_regions:
  - "City A"
  - "City B"

## Data source defaults
<!-- Where your applications typically live -->
default_source: "airtable"  # or "google_sheets", "csv"
# airtable_base_id: "appXXXXXXXXXXXXXX"
# airtable_table_name: "Applications"
# google_sheet_id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"

## Custom field mapping
<!-- Map your actual field names to expected data points -->
# field_map:
#   full_name: "Participant Name"
#   email: "Email Address"
#   messenger: "Telegram"
#   social_media: "Social Media Links"
#   age: "Age"
#   location: "City"
#   motivation: "Why do you want to participate?"
#   referral: "How did you hear about us?"
