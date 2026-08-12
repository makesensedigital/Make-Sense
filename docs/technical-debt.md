<!-- Copied from the Platform Engineering Handbook — templates/app/docs/technical-debt.md -->
<!-- Governed by Handbook §22 ("The repository is the agent's memory"). -->

# Technical debt — known and accepted

What is knowingly wrong in this site, why it was accepted, and what would trigger fixing it.

**This file exists for the agent as much as for the reader.** An agent has no memory between
sessions beyond what this repository holds, and a deliberate compromise that is not written down is
indistinguishable from a mistake. An agent that meets one either "fixes" it — undoing a decision
nobody recorded — or copies it, believing it is intended. Both outcomes are worse than the debt
itself, and the second one spreads.

Four fields are mandatory, and each exists because its absence turns this into something else.
**Without a trigger** it is a complaint. **Without an owner** it is nobody's. **Without a reason**
the next reader cannot tell whether it is safe to remove. **Without a cost** it cannot be
prioritised against anything.

Keep it distinct from the open-definitions register: that records what has not been *decided*, which
is permitted. This records what is *wrong*, which is not.

> Every entry here dates from **2026-08-11**, the day this repository adopted the standard eight
> months after the site went live. None of them were mistakes when they were written. See
> [`measurement-baseline.md`](measurement-baseline.md) for why that framing matters.

---

## Open

| # | What is wrong | Why it was accepted | Cost of leaving it | Trigger to fix | Owner | Since |
|---|---|---|---|---|---|---|
| 1 | **`config.js` is the destination, not the source.** The container id, the mailbox and the scheduling link are each still written as a literal in `index.html`. §26 requires one configuration module and nothing else holding an identifier. | Wiring it means `index.html` reads its identifiers from a script, which means restructuring the markup — code work, and adoption deliberately changed no code. | Low today at one page and one of each identifier; the cost is a step function. The moment a second control or a second page repeats one, a change becomes several edits and by the third one has been missed. | The second occurrence of **any** identifier, or the second page — whichever comes first. | Juan Torresel | 2026-08-11 |
| 4 | **No `facts.js`, so business facts are not declared once.** Every fact — name, offerings, contact — is inline in `index.html` and written twice more inside the two language dictionaries in the same file. The footer contradicted the rest of the page — `© 2023 MakeSense Consulting` against `Make Sense Digital` everywhere else — **corrected 2026-08-12**, though correcting it by hand is exactly the mechanism this entry exists to replace. **This is what the `build-derived --check` deferral in `gate.yml` defers.** | The fix is a facts module, generated blocks in the markup, and the derived artifacts — a genuine restructuring. | Already being paid: the footer contradiction is live. On this class of site a contradiction is not a stale comment — an assistant answering a question about the business states whichever it read, and nobody knows who received that answer. | Any change to a business fact, or the addition of a second page. **Creating `facts.js` turns the deferred gate check on automatically.** | Juan Torresel | 2026-08-11 |
| 5 | **The gate's own test cannot run here.** `test-gate.mjs` builds its known-good fixture by copying the repository root and editing the *template's* placeholders out of it; in an adopted site the fixture setup aborts. So the checks are not tested *in this repository*. **This is what the `test-gate` deferral in `gate.yml` defers.** | Six of the seven files in `scripts/` are byte-identical to engineering-handbook@v3.7.1, where this test runs and passes on every pull request. `.github/handbook-scripts.sha256` pins all seven and the gate verifies them, so any further edit fails immediately. | Nil for the six. **Real for `lib.mjs`**, which carries a one-line local fix (`.gate-baseline.json` added to `walk()`'s skip list) that no test covers — see [`handbook-feedback.md`](handbook-feedback.md) #1. A modified check with no test is a check nobody knows works. | **Already fired, and paid only partially.** Any further modification to any file in `scripts/` fails the digest check by design. The full fix is to vendor the pristine template into `scripts/fixtures/landing/` and make `test-gate.mjs` run for real — before the next change to a check, not after. | Juan Torresel | 2026-08-11 |
| 7 | **No OpenSpec workspace.** §26 does not suspend the spec-driven lifecycle (§19); this site simply never had one. | Scaffolding it during adoption would have been a second change in a commit whose whole point was changing nothing. | Changes arrive without proposals, so the reasoning behind them lives only in commit messages. | The first change to this site that is not a one-line correction. | Juan Torresel | 2026-08-11 |
| 9 | **No measurement contract**, and the site has been publishing events for eight months without one. Going forward only — see the note below. | The container was installed before the standard existed. | Every number the container has produced answers no stated question, and intent cannot be told from outcome. The scheduling link is a *departure*, not a conversion, and nothing currently says so. | Before the next change that touches the conversion path. Write the contract in `brief.md` first — §26: before the code that emits it. | Juan Torresel | 2026-08-11 |
| 10 | **The English copy exists only in JavaScript.** `toggleLanguage()` swaps `textContent` from a dictionary, so the entire English version of the site is invisible to crawlers that do not execute script — which is most generative-retrieval crawlers. §26: nothing that must be found is generated in the browser. | It is how the page was built. | The Spanish page is discoverable and the English one is not. If English discovery is wanted, this is total, not partial. | Deciding that English traffic matters. The fix is a second URL, which implies redirects — **and this host cannot issue them** (see `inapplicable.md` I3). Take it with the hosting decision, not after. | Juan Torresel | 2026-08-11 |
| 11 | **No named owner in the repository, no review cadence, and no scheduled check.** (`404.html` was the fourth item and **was added 2026-08-12**, with `noindex` so it stays out of search results.) §26 requires all four after launch: nothing in this architecture announces a failure — no logs, no alerts, no health endpoint. | The site was handed over without them. | A broken conversion control lives until somebody notices by chance. That is the entire failure mode. | Before this site is handed to anyone else, or immediately if it already has been. A scheduled workflow against the public URL is an afternoon. | Juan Torresel | 2026-08-11 |
| 12 | **The Lighthouse floors are not met**, measured on the first real runner run 2026-08-12: accessibility **0.94** against a floor of 0.95, best-practices **0.79** against 0.90, and largest-contentful-paint **over 2500 ms**. Two specific audits fail rather than the score merely being low: `color-contrast` — insufficient contrast between foreground and background, which is §6c and is not suspended by §26 — and `heading-order`, which `check-markup` independently reports as h1 → h3. Performance and SEO pass. | Meeting them is markup, colour and asset work on a live page, and adoption changed no code. The alternative — lowering the floors — is forbidden outright: a loosened floor reads exactly like a considered one. | Real and mostly invisible to the people paying it. Contrast is a legibility failure for anyone with low vision, in bright sun, or on a cheap panel; LCP over 2500 ms on mobile is the interval before the page appears to exist. | `color-contrast` first, because it is a §6c accessibility defect rather than a score. Then LCP, which the Google Fonts round trip (debt #2) is a direct contributor to — self-hosting is likely to move both at once. `heading-order` is shared with the check-markup finding and is one tag. | Juan Torresel | 2026-08-12 |
| 12a | **Partially addressed 2026-08-12, awaiting re-measurement.** `heading-order` fixed (the hero card's `h3` became an `h2`); `color-contrast` addressed at the two failing pairs — `--muted-grey` `#7a7a7a` → `#6a6a6a` (4.2:1 → 4.9:1 on the section background) and the footer `#555` on `#0a0a0a` → `#a8a8a8` (2.6:1 → 8.3:1); a `main` landmark added for `landmark-one-main`; and the decorative card numbers marked `aria-hidden` so axe stops scoring them as text. LCP should move on the self-hosted fonts alone. | The numbers came from one run; contrast was computed by hand, not measured. | Unknown until the gate re-runs — that is the point of the entry. | The next gate run reports it. Close this row or restate it with the new numbers. | Juan Torresel | 2026-08-12 |

---

## Paid down

An entry moves here rather than being deleted, so the reasoning survives its resolution.

| # | What it was | How it was resolved | Closed |
|---|---|---|---|
| 2 | **Google Fonts fetched from two third-party origins on first render.** | Self-hosted, 2026-08-12. `assets/fonts.css` with the `latin` and `latin-ext` subsets only — 220 KB of woff2 replacing two origins that received every visitor's address before any consent choice. §26 names this remedy in as many words. The two heaviest faces are preloaded. | 2026-08-12 |
| 3 | **No canonical link, and `og:image` relative with an unencoded space.** | Fixed, 2026-08-12. Canonical added; `og:image` absolute. The space is gone at the root rather than escaped: `Logos MK Sense/` is now `assets/`, which also removes the percent-encoding the reference checks could not resolve. | 2026-08-12 |
| 8 | **Three of the four mobile render rules were unmeasurable**, all CSS being inline. | Fixed, 2026-08-12. `styles.css` extracted, so `check-markup` has something to read — and it immediately caught the `100vh` that had been invisible, now `100dvh`. A 44px `--tap-min` is declared and applied to every interactive element. All four rules now measured, all four pass. | 2026-08-12 |
| 6 | **Seven brand PNGs committed and referenced from nowhere**, published at their URLs and downloaded by nobody. | Moved to the brand archive outside the repository on 2026-08-12, alongside F1 and F2 — the same mistake in a cheaper form. Nothing was deleted; `git show` recovers any of them, and the originals sit in `../Make Sense - brand archive/`. | 2026-08-12 |
| — | **Publication was manual, outside CI.** §26 requires the delivery pipeline, not a branch, to be the publication origin, and it publishes only when the gate passes. | The hosting decision of 2026-08-11 moved the origin to `.github/workflows/gate.yml`. **Not closed until GitHub Pages is enabled with `GitHub Actions` as the source and DNS is cut over** — both human actions, listed in `brief.md`. | pending cutover |

---

## What does not belong here

- **A bug.** Fixed, or tracked as work — not accepted as debt.
- **A rule you disagree with.** That is handbook feedback (§12): surface the friction, do not work
  around it.
- **An undecided question.** That belongs in [`open-definitions.md`](open-definitions.md), and it is
  permitted while open.
- **A rule that cannot apply here.** That belongs in [`inapplicable.md`](inapplicable.md).
- **Anything contract-sensitive.** A credential, an exposed internal file, arbitrary third-party
  script execution — carrying one of those is not a slower fix, it is an open hole. Those are *fix
  now* by definition and the ratchet does not offer to hold them.
- **An entry with no trigger.** Debt with no condition for repayment is a decision nobody wants to
  defend.
