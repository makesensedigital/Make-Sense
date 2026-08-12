# Measurement baseline — the day this repository adopted the standard

**2026-08-11 · engineering-handbook@v3.7.1 · site live since ~December 2025 · Juan Torresel**

This is **a measurement, not a task list.** It is the number of violations, by rule, on the day the
standard arrived at a site that had already been in production for eight months. None of them were
mistakes when they were written — the rules did not exist yet.

Reading this as a task list is the thing to avoid. It invites either *we will fix all of this*,
which is the rewrite nobody funds, or *we will silence all of this*, which is the gate that lies.
The useful answer is neither: every finding below is in exactly one of four buckets, and the ratchet
stops the number going up while the fixing is funded at whatever rate it is funded.

**The gate is not green and is not supposed to be.** A green gate on day one is the thing to be
suspicious of.

---

## The instrument

`scripts/check-config.mjs`, `scripts/check-markup.mjs`, `scripts/check-assets.mjs` — the three
checks the ratchet counts — plus the gate's tracked-material step, run against the working tree at
commit `f718958`, the rules-only commit. Site code was byte-identical to production.

## The number

**21 findings across 7 keys**, recorded in `.gate-baseline.json`.

| Check | Key | Count |
|---|---|---|
| check-config | `index.html` | 3 |
| check-config | `config.js` | 3 |
| check-markup | `index.html` | 4 |
| check-markup | `(repository)` | 1 |
| check-assets | `index.html` | 2 |
| check-assets | `(repository)` | 7 |
| check-assets | `trustlogo/javascript/trustlogo.js` | 1 |

Plus **2 findings the ratchet does not carry**, because the gate's tracked-material step is not
ratchetable and neither is anything contract-sensitive: `Logos MK Sense/logo.ai` and
`Logos MK Sense.zip`, both confirmed publicly downloadable. Those are in the *fix now* bucket by
definition — a ratchet that offered to hold them would have inverted the point of having one.

## What the number does not include, and this matters more than the number

A baseline that is read as "21 things are wrong" is being read as a score. Three classes of finding
are missing from it, and all three are worse than what is in it.

**1 — Three of the four mobile render rules are unmeasured.** `check-markup` reads `.css` files.
This site has none: all 660 lines of CSS are inline in `index.html`. So the viewport-unit rule, the
safe-area rule and the form-control rule ran against an empty string and found nothing. They did not
pass. `index.html:64` sets `min-height: 100vh` on `body`, which is exactly the violation rule 1
exists to catch, and the gate cannot see it. Recorded as debt #8.

**2 — Everything §26 places outside the markup.** No check can see whether a domain is verified,
whether a provider identifier is origin-restricted, whether anybody owns the site, or whether a
scheduled check exists. Each was assessed by hand and each is in a bucket below.

**3 — Anything the external tools measure.** The three ratcheted checks run offline; the link
checker and the Lighthouse floors run against a served copy and are not in `.gate-baseline.json` at
all. Their first real-runner result arrived a day later and is recorded as debt #12: accessibility
0.94 against a floor of 0.95, best-practices 0.79 against 0.90, largest-contentful-paint over
2500 ms, with `color-contrast` and `heading-order` failing as specific audits. Links pass. The
floors themselves were left untouched — see `handbook-feedback.md` #6 for why there was nowhere
correct to put this.

**4 — The measurement history itself, which is the one that cannot be recovered.** The tag container
has been live for eight months with no measurement contract: no event names, no properties, no
statement of the question any of it answers. §26 is explicit that this class of finding is not
recoverable — instrumentation not present at launch is *absent data*, not late data. **The bucket
entry records the gap in the history rather than a plan to fill it, because there is nothing to fill
it with.** Eight months of this site's conversion behaviour cannot be reconstructed. Going forward
is debt #9.

## The four buckets

Every finding above is in exactly one. A finding with no bucket is the one that becomes an argument
later.

| Bucket | Where it lives | Count |
|---|---|---|
| **Fix now** — contract-sensitive and cheap; defects that were always defects | this file, §"Fix now" | 3 |
| **Debt** — real, expensive, safe to carry, with a trigger and an owner | [`technical-debt.md`](technical-debt.md) | 12 |
| **Inapplicable** — the rule genuinely cannot apply here | [`inapplicable.md`](inapplicable.md) | 6 |
| **Blocked on a decision** — complying needs a choice nobody has made | [`open-definitions.md`](open-definitions.md) | 3 |

---

## Fix now

Not debt. These are defects that were always defects; the rule only made them visible. §26 puts
security first because "later" means something different in this bucket.

| # | What | Evidence | Status |
|---|---|---|---|
| F1 | `Logos MK Sense/logo.ai` — a 434 KB Illustrator source is tracked, and in this architecture tracked means **published**. | `GET /Logos%20MK%20Sense/logo.ai` → **200, 444261 bytes** | **untracked 2026-08-12** · history open |
| F2 | `Logos MK Sense.zip` — 583 KB of brand archive, same. **No check caught this**: the gate's pattern covered `.ai/.psd/.sketch/.fig` but not an archive containing them. | `GET /Logos%20MK%20Sense.zip` → **200, 596597 bytes** | **untracked 2026-08-12**, and the check extended so it cannot recur · history open |
| F3 | A third-party script is injected with `document.write` from `trust-provider.com`, unpinned, with no subresource integrity and no `defer`. §26 prohibits document-writing script injection and requires third parties to enter through the tag container. It executed with full page privileges, and on plain HTTP it resolved to `http://www.trustlogo.com/...`. | `index.html:693-696`, `index.html:1031-1032` | **removed 2026-08-12** — see open decision #1, which the hosting choice closed |

**F1 and F2 are half fixed, and the half that remains is the one that matters most now.**

Untracked on 2026-08-12, moved to a brand archive outside the repository — nothing was deleted — and
`.gitignore` and the gate's pattern both extended so an archive cannot slip through again. From the
next publish those URLs stop resolving.

**The history is still open, and the repository became PUBLIC on 2026-08-12.** §26 is explicit:
deleting a file does not unpublish it — it stays in edge caches, in search indexes, and in history
where the repository is readable, which it now is by anyone. Both files remain retrievable from
commits `99de3de` and `fdae132`:

```bash
git show 99de3de:"Logos MK Sense/logo.ai" > logo.ai      # works today, for anyone
```

The remediation §26 names is **rewriting history and rotating whatever was exposed** — never a
deletion commit. Rewriting rewrites every commit in a public repository and force-pushes over the
default branch, which breaks every clone and every existing reference. That is destructive and
outward-facing, so it is the owner's call and it has not been done. The commands are in
[`../brief.md`](../brief.md).

What was exposed is the company's own brand artwork rather than a credential, so there is nothing to
rotate — which is the only reason this is a decision rather than an emergency.

---

## What "adopted" will mean here

Not zero violations — that definition guarantees no repository is ever adopted. **Adopted means
every violation is in exactly one of the four buckets and the ratchet holds.** By that definition
this repository is adopted as of this commit: 21 ratcheted, 2 held out of the ratchet on purpose,
and every one of the hand-assessed findings placed.

A repository with eleven debt entries and a ratchet is adopted. One with a green gate and eleven
blanket suppressions is not, whatever its badge says. There are **two** deferrals in this
repository's gate, both named, both scoped to a single check, both self-removing, and both owned by
a numbered debt entry: `build-derived --check` (debt #4) and `test-gate` (debt #5).

## Re-measuring

```bash
node scripts/ratchet.mjs            # fails only if something rose
node scripts/check-config.mjs; node scripts/check-markup.mjs; node scripts/check-assets.mjs
```

Fixing something lowers the baseline with `node scripts/ratchet.mjs --update`, **in the same commit
as the fix**. A baseline left high keeps headroom, and the violation just removed can come back for
free.
