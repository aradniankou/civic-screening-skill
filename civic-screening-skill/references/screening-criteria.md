# Screening Criteria — Full Methodology

## Flag Level Decision Logic

**RED** — TWO OR MORE of these present:
- Minimal digital footprint (no messenger, no social media, generic email)
- Motivation text with institutional/report-like quality and no personal voice
- Cross-field inconsistencies (name, age, location don't add up)
- Duplicate submission pattern
- Previously flagged and rejected by team
- OSINT search returns zero results for name + email + messenger
- Motivation text closely mirrors another applicant's text

**YELLOW** — ONE of these present:
- Single significant risk indicator from list above
- The "too perfect" pattern (even without other flags)
- Duplicate submission (single instance, could be innocent resubmission)
- Previously flagged but not yet decided
- Minimal footprint + in-country location (but motivation seems genuine)

**GREEN** — no risk indicators, or only trivial observations (generic email but everything else checks out).

When in doubt between yellow and green → yellow. Cost of review is negligible.

---

## 1. Digital Footprint Analysis

**Check:** Messenger handle present and real-looking? Social media links provided and plausible? Email generic (gmail, mail.ru, yandex) vs organizational? Does name + email + messenger suggest a real person?

**Risk indicators:**
- No messenger AND no social media AND generic email = moderate concern
- Messenger handle that doesn't match name pattern = mild concern
- Social media field = "нет", "-", blank = note but not automatic flag

**Nuance:** Legitimate applicants in repressive environments minimize their footprint for safety. This alone never produces a red flag — only contributes to the picture.

## 2. Cross-Field Validation

**Check:** Age aligns with career/education claims? Location matches context clues? Name consistent across fields (including email, messenger)? Encoding issues or name variations suggesting copy-paste from different sources?

**Risk indicators:**
- Name in email doesn't match stated name = moderate concern
- Age inconsistent with described experience = mild concern
- Location contradicts references in motivation = mild concern

## 3. Motivation Text Analysis

**Check:** Personal voice present? Specific anecdotes and own experience? Or suspiciously polished, committee-drafted? Uses program terminology that isn't public? Phrases resembling intelligence objectives ("establish contacts with participants", "gain access to materials") vs learning goals? Generic enough to apply to any program?

**Risk indicators:**
- Reads like a formal report rather than personal text = moderate concern
- Extremely short (1-2 sentences) with no substance = mild concern
- Focuses on "networking" and "accessing" people/resources over learning = moderate concern
- Perfect structure + zero personal voice + no specific details = moderate concern

**Nuance:** Some people write formally. Look for formal + absence of personal details + other factors. Formal style alone is not a flag.

## 4. Cross-Comparison of Motivation Texts

**New criterion.** Compare all motivation texts in the batch against each other.

**What to look for:**
- Two or more texts with the same structure (intro → background → why this program → what I'll contribute)
- Shared unusual phrases or arguments that don't appear organically
- Same factual errors or identical misspellings across different texts
- Texts that seem to "answer the same brief"

**Risk indicators:**
- Two texts from different applicants with >60% structural/lexical similarity = red flag for coordinated submission
- Shared rare phrases across 2-3 texts = yellow flag, investigate

**How to do it efficiently:** Read all motivations in a single pass. Group by similarity. Only flag groups, not individual texts.

## 5. Duplicate Detection

**Check:** Multiple applications from same email for same program? Same messenger handle but different names? Very similar names but different contact details?

**Risk indicators:**
- Same email, same program, different names = red (testing/probing)
- Same person, same program, multiple submissions with changes = yellow
- Same contacts across different programs = not a flag by itself, see cross-reference

## 6. Location Context

**Check:** In-country or abroad? Capital vs small town? Matches program target audience?

**Risk indicators:**
- Location alone is never a flag
- Location + minimal footprint + generic motivation = contributes to concern

## 7. OSINT Verification

**For each Red/Yellow flagged applicant**, run web searches:
- `"First Last" city` (in appropriate language/script)
- Email address
- Messenger handle (e.g., telegram username)

**Interpreting results:**
- Person found on LinkedIn, in media, in org publications → reduces concern, note as positive signal
- Person found in public databases, professional registries → reduces concern
- Zero results across all searches → adds to concern (especially combined with minimal footprint)
- Contradictory information found (different city, different profession) → adds to concern

**Token efficiency:** Only search for flagged applicants, not the entire batch. 2-3 searches per person. If first search finds solid confirmation, skip remaining searches.

## 8. The "Too Perfect" Pattern

Institutional applications tend to: hit every expected criterion without going beyond, demonstrate insider knowledge of what's expected, lack "roughness" (typos, tangents, personal stories), present a plausible but unverifiable biography, use correct but impersonal language.

**How to evaluate:** Compare against the batch. If most applications have personality quirks and this one is smooth, competent, but flat — flag yellow.

Inherently subjective. Note as pattern observation, not definitive finding.

## 9. Cross-Reference Interpretation

**Prior application, no screening record:** Note program and date. Consistent data = could be genuine repeat interest OR persistent attempt. Inconsistent data = higher concern.

**Prior application + screening record:** Read prior flag level, reasoning, team decision. Previously admitted ≠ guaranteed safe. Previously rejected + applying again = significant concern.

**No prior history:** First-time applicant. Neither increases nor decreases risk. But combined with other flags, absence of any prior interaction makes "how did they find us?" more relevant.
