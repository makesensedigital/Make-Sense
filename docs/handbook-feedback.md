# Handbook feedback — friction found while adopting

§12 and the handbook's own contribution rules ask for this: a rule that does not survive contact
with a real repository is a defect in the rule, and there is no other way for the standard to find
out. **This file is the durable copy.** Filing the issues upstream is a separate, outward-facing
action and has not been done — see *Status* on each entry.

Adoption date: **2026-08-11** · Handbook: **v3.7.1** · Repository: `makesensedigital/Make-Sense`

---

## 1. The ratchet's baseline feeds itself through `check-assets` — defect, not friction

**Where:** `templates/landing/scripts/lib.mjs` (`walk()`) interacting with
`templates/landing/scripts/ratchet.mjs` and `check-assets.mjs`.

**What happens.** `ratchet.mjs --init` writes `.gate-baseline.json` keyed by `check|file`, so the
file contains quoted strings such as:

```json
"check-assets|trustlogo/javascript/trustlogo.js": 1
```

`walk()` skips `.git`, `node_modules`, `scripts` and `.github`, but not the baseline. `check-assets`
scans every `.json` with its `REFERENCE` regex, which matches any quoted string ending in a code or
image extension. It reads that key as a local path, finds no such file on disk, and reports:

```
FAIL  check-assets|trustlogo/javascript/trustlogo.js — referenced but not committed
```

That is a **new** finding, so the ratchet fails. The ratchet's own remediation text — *"raise it
deliberately"* — does not terminate here: recording the new key writes a longer quoted path into the
same file, which produces another finding on the next run, and so on.

**Why upstream has not seen it.** It cannot happen in a site built from the template, because a
compliant site has no baseline — which the ratchet says in as many words. It reproduces on the first
run of the first repository that actually adopts, and only when at least one finding's key ends in a
scanned extension. Ours did, via a `document.write` script URL.

**What we did.** Added `.gate-baseline.json` to `walk()`'s default skip list — one token, in the same
category as the three entries already there: gate machinery, not site content. Fixing it in `walk()`
rather than in `check-assets` also covers `check-config`, whose placeholder scan reads every file and
would fire on any baseline key containing a sentinel string.

**Suggested upstream fix.** The same one line. Alternatively `ratchet.mjs` could write its keys in a
form that cannot be read as a path, but the skip list is smaller and matches the existing intent.

**Status:** not yet filed.

---

## 2. `test-gate.mjs` cannot run in an adopting repository — gap in the adoption path

**Where:** `templates/landing/scripts/test-gate.mjs`, and the
`adopt-an-existing-repository` skill.

**What happens.** `TEMPLATE = resolve(HERE, "..")` — the fixture is built by copying the
**repository root** and editing the template's placeholders out of it. In a repository that adopted
the standard afterwards, none of those strings exist, and the run aborts on the first one:

```
Error: fixture setup: "canonicalOrigin: "https://example.com"" not found in config.js   # check-config: allow — this is the verbatim error text, and reporting a placeholder-detector requires naming the placeholder it detects
```

So the first step of the delivery gate — the one asserting that the checks are known to work — is
the one step an adopting repository cannot run. The skill is explicit that for a static site *"the
mechanism exists"*, and the ratchet does; the self-test does not travel with it.

**Why it matters more than it looks.** §20 and `AGENTS.md` both say a check that has never failed on
purpose is not known to work. An adopting repository is exactly where a check is most likely to be
edited under pressure to quiet a red gate — and it is the one place with no test to notice.

**What we did.** Deferred the step, named, with the rule and the reason at the point of use, and
pinned every file in `scripts/` by SHA-256 in `.github/handbook-scripts.sha256` so that editing a
check fails the gate immediately. Carried as debt #5 with that as the trigger.

**Suggested upstream fix.** Ship the pristine fixture under `scripts/fixtures/landing/` and resolve
`TEMPLATE` to it when it exists, falling back to the repository root. `test-gate.mjs` already
excludes `scripts/fixtures` from its copy filter, so the shape was anticipated.

**Status:** not yet filed.

---

## 3. `check-markup` cannot see a stylesheet that is inline — blind spot, not a defect

**Where:** `templates/landing/scripts/check-markup.mjs`, the four mobile render rules.

**What happens.** The render rules read `.css` files. This site has none — all of its CSS is inline
in `index.html`. Three of the four rules therefore ran against an empty string and reported nothing,
and `index.html:64` carries `min-height: 100vh` on `body`, which is precisely what rule 1 exists to
catch. The fourth rule did fire, on `(no stylesheet)`, which is the only reason we noticed.

**Why this is worth reporting even though the site is at fault.** A pre-standard static site with
inline styles is not unusual — it is close to the default shape of the thing §26 governs. The check
silently covering nothing reads exactly like the check passing, which is the failure mode §20 warns
about, arriving from the opposite direction.

**Suggested upstream fix.** Extract `<style>` blocks from the HTML and run the render rules over
them too; or, at minimum, report `(no stylesheet)` as a finding in its own right when documents
contain inline `<style>`.

**What we did.** Recorded as debt #8 with extraction of `styles.css` as the trigger, and named it in
the baseline as an explicit measurement blind spot so nobody reads the number as coverage.

**Status:** not yet filed.

---

## 4. The gate's internal-material pattern does not cover archives — small, real

**Where:** `templates/landing/.github/workflows/gate.yml`, the *No tracked secret or internal
material* step.

The pattern covers `.ai`, `.psd`, `.sketch`, `.fig`, `.env`, `.pem`, `.key`, `.p12`, `.pfx`. This
repository publishes `Logos MK Sense.zip` — 583 KB containing the brand set, confirmed downloadable
at its URL — and the step passes it. `.gitignore` has the same gap.

An archive is the most likely form for exactly the material this rule exists to keep out, because
"send me the logos" produces a zip.

**Suggested upstream fix.** Add `zip|rar|7z|tar|tgz` to both the workflow pattern and the template
`.gitignore`.

**Status:** not yet filed. Locally this is fix-now item F2 and the check extension is part of the
fix.

---

## 5. The landing gate cannot ratchet as shipped — defect in the adoption path

**Where:** `templates/landing/.github/workflows/gate.yml`, interacting with the
`adopt-an-existing-repository` skill, step 4.

**What happens.** The workflow runs `check-config`, `check-markup` and `check-assets` as ordinary
steps, and each exits non-zero when it has findings. It also runs `ratchet.mjs`, whose entire
purpose is to make the gate fail *only on what is new*.

In a site built from the template the three checks pass, so nothing surfaces. In a repository that
**adopts** the standard they do not pass and never will until the baseline reaches zero — so the
`gate` job is red on every run from the first day, and the ratchet decides nothing. Both mechanisms
are present and the stricter one wins, which makes the ratchet inert exactly where it was designed
to be used.

The skill is unambiguous about the intended behaviour:

> Set the gate to ratchet, not to pass. **The gate fails on a violation that is new, not on one that
> already existed.**

And equally unambiguous about the cost of getting it wrong: *"A gate that fails on everything → red
forever, switched off within a week."* As shipped, the adoption path produces precisely that.

**What we did.** Marked those three steps `continue-on-error: true`, with the reasoning at the point
of use. Nothing is silenced — every finding still prints in full on every run. What moves is the
gating authority, to the ratchet step, which stays a hard failure.

**What we deliberately did NOT make report-only**, because the skill forbids it: the ratchet itself,
and the tracked-internal-material step. Contract-sensitive findings are not ratchetable — carrying
one is not a slower fix, it is an open hole. Our gate is consequently red on day one, on a published
`.ai` file, and that is the correct outcome rather than a problem to route around.

**Suggested upstream fix.** Have the gate detect `.gate-baseline.json` and, when it exists, run the
three ratcheted checks in report-only mode automatically — the same conditional shape `ratchet.mjs`
already uses in the other direction when no baseline is present. The information is already there;
only the workflow does not read it.

**Status:** not yet filed. This is the one of the five worth filing first: the other four cost an
afternoon each, and this one quietly disables the mechanism the whole skill is built around.
