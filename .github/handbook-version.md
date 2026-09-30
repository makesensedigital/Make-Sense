---
handbook_repo: makesensedigital/engineering-handbook
handbook_tag: v3.7.1
handbook_commit: de0216f7a6565ee031c2929538d100164125392d
synced_at: 2026-08-11
---

# Handbook Version

- **Source:** `makesensedigital/engineering-handbook` → `handbook.md` @ `v3.7.1` (`de0216f`)
- **Class:** static conversion site — governed by **§26 only**. The scope test holds: the artifact
  is static, there is no backend, no user is authenticated, business logic (scheduling) runs in a
  third-party platform, and deployment is the publication of files.

## What this repository received, and why not more

This is a **sync into an existing repository**, not a scaffold. It brought the rules and the
instrument that measures them. It changed no site code — `index.html` is byte-identical to the
commit before it.

The carrier for this class is `templates/landing/`, so that is what was copied, rather than the
application file set in §0. The application artifacts are **inapplicable here, recorded rather than
skipped** — see `docs/inapplicable.md`.

- `AGENTS.md` — §26 condensed. Copied verbatim; it carries its own `handbook-sync` manifest.
- `CLAUDE.md` — a pointer to `AGENTS.md`. It restates no rule (§24).
- `scripts/*.mjs` — the delivery gate's checks and the ratchet. **Six copied verbatim; `lib.mjs`
  carries one added token** in `walk()`'s skip list, without which the ratchet's own baseline is
  scanned as site content and the gate never converges. Reported in `docs/handbook-feedback.md` #1.
  All seven are digest-pinned in `.github/handbook-scripts.sha256`, which the gate verifies.
- `.github/workflows/gate.yml` — the delivery gate and, from now on, the publication origin.
  **One recorded deviation**, stated in the file's own header: `build-derived --check` is deferred
  while `facts.js` is absent. The header also records the hosting decision and what it puts out of
  reach.
- `.nojekyll` — GitHub Pages runs Jekyll over published files by default. §26: processing nobody
  asked for removes files nobody notices are missing.
- `CNAME` — the domain file must travel with the artifact, or moving the publication origin to a
  workflow unbinds the custom domain silently.
- `lighthouserc.json`, `.editorconfig`, `.gitattributes`, `.gitignore` — copied verbatim.
- `config.js` — the configuration module, filled with the identifiers the site already uses.
- `docs/technical-debt.md`, `docs/open-definitions.md`, `docs/inapplicable.md`,
  `docs/measurement-baseline.md` — the destinations for three of the four triage buckets, and the
  baseline itself.
- `.gate-baseline.json` — the ratchet baseline. Committed on purpose.
- `.github/handbook-scripts.sha256` — digests of the seven checks. **Local addition, not from the
  template.** It substitutes for `test-gate.mjs`, which cannot run in an adopting repository; see
  `docs/handbook-feedback.md` #2 and debt #5.
- `docs/handbook-feedback.md` — four pieces of friction this adoption found in the standard itself.
  §12 asks for these; none has been filed upstream yet.
- `brief.md` — the decisions, the measurement contract that has to be written, and the cutover
  steps. Filled in for this site rather than copied blank.

## The hosting decision

**2026-08-11, Juan Torresel: GitHub Pages.** Taken knowing what it puts out of reach — no custom
response headers, therefore no CSP and no protection against framing at all; no real redirect
status; no access logs; no cache purge. Recorded in `docs/inapplicable.md` as declared-absent
controls with the condition that would reopen the choice, not as debt: on this host they are not
fixable at all.

`_headers` and `_redirects` from the template are **deliberately not shipped**. They are
Netlify/Cloudflare conventions and are inert on Pages, and an inert control file reads as a control
that exists.

## What was NOT brought in, and why

- **The OpenSpec workspace (§19).** §26 does not suspend the spec-driven lifecycle, so this is a
  genuine gap rather than an inapplicable rule. It is **debt #7**, not a silent omission.
- **`.github/workflows/standards.yml`** (the Central Standards CI caller). §26 replaces §20's five
  stages with the delivery gate above, by name and with the reason. Recorded in
  `docs/inapplicable.md`.

## Checking whether this is stale

`handbook_commit` is the identity — a git ref, never a hash of the file's contents.

```bash
git ls-remote --tags https://github.com/makesensedigital/engineering-handbook
```

If the tag you intend to sync to resolves to a different SHA than the one above, re-generate the
files, update this manifest, and report what changed section by section.
