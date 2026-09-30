# Brief — Make Sense Digital

**Version 0.1 · 2026-08-11 · Owner: Juan Torresel**

The specification is source code, not documentation. This file was written on the day the site
adopted the standard, eight months after it went live, so it records decisions **already taken and
discovered by reading the site** as well as decisions still open. Rows marked *reconstructed* were
never decided — they are what the site does, written down for the first time.

---

## 1. Decided — do not re-litigate

| Decision | What was decided | Who | When |
|---|---|---|---|
| Canonical domain | `makesense.digital` | *reconstructed from `og:url`* | ~2025-12 |
| Hosting, and what it puts out of reach | **GitHub Pages.** No response headers, therefore no CSP and **no framing protection at all**; no real redirects; no access logs; no cache purge. Six consequences recorded in [`docs/inapplicable.md`](docs/inapplicable.md). | Juan Torresel | 2026-08-11 |
| Primary conversion | *Undecided as a contract.* The site's controls point at a Calendly link, a mailto and two social profiles. **The Calendly click is a departure, not a conversion** — the site can observe leaving and never arriving. See the measurement contract below. | — | — |
| Copy language and register | Spanish (Argentina) as served; English available only through an in-page script swap — see debt #10. | *reconstructed* | ~2025-12 |

### The six irreversibles

| # | Decision | Answer | Owner |
|---|---|---|---|
| 1 | Measurement contract and container | Container `GTM-P6JV5J3T`, live ~8 months. **No contract exists.** The history it produced cannot be reconstructed — §26 is explicit that this class of gap is absent data, not late data. Debt #9 covers going forward only. | Juan Torresel |
| 2 | Consent — jurisdiction, decision, **and what would change it** | **Open decision #2.** Default while open: `notice-only`, which is what the site does. No privacy statement is published, and §26 requires one in every case. | Juan Torresel |
| 3 | Canonical identity: domain, mailbox, brand | `makesense.digital` · `contacto@makesense.digital` · Make Sense Digital. **The footer contradicts the brand** — `© 2023 MakeSense Consulting`. Debt #4. | Juan Torresel |
| 4 | Retired URLs and the redirect plan | None retired; the site is one URL. **This host cannot redirect**, so this must be settled before a second URL exists — not after. [`docs/inapplicable.md`](docs/inapplicable.md) I3. | Juan Torresel |
| 5 | Sender authentication (if there will be email) | Not applicable — the site sends no mail. The mailbox is a `mailto:` handoff to the visitor's own client. | — |
| 6 | Conversion receiver, with a tested reply | **None, and that is legitimate here**: the site presents no form. `config.receiver.endpoint` is `null` for that reason, not as a placeholder. If a form is ever added, the receiver is chosen *first*. | Juan Torresel |

### The measurement contract

**Not yet written.** §26 requires it before the code that emits it, and the code has been emitting
for eight months. What follows is the shape it has to take, not a record of what exists.

| Event | Type | Properties | The question it answers |
|---|---|---|---|
| `scheduling_intent` | **intent** | `event_label` (which control) | Which control sends people to Calendly? **Never the primary conversion** — the site sees the departure and nothing after it. |
| `mailto_intent` | **intent** | `event_label` | Same, for the mailbox. |
| *(the outcome event)* | outcome | — | **There is currently no observable outcome on this site.** A booking completes inside Calendly. Naming an intent as the conversion would produce a headline number inflated by a margin nobody can estimate. |

**Known bias to record beside every number** (§26): traffic arriving through an embedded browser —
LinkedIn and Instagram both use one, and both are in the site's own contact section — has
partitioned storage, so returning-visitor and attribution figures are wrong in a known direction.
Access logs are unavailable on this host, so client-side telemetry is the only source and every
figure is a lower bound.

---

## 2. Pending — with an owner and what it blocks

| Item | What it blocks | Owner | Due |
|---|---|---|---|
| **Verify `makesense.digital` in the `makesensedigital` GitHub organization settings** | **The DNS cutover. Do this first.** Verification is what prevents another GitHub account claiming the domain (§26, mandatory). | Juan Torresel | before cutover |
| **Enable Pages with `GitHub Actions` as the source** (Settings → Pages) | Publication. Until then the `publish` job fails and the live site is unaffected. | Juan Torresel | before cutover |
| **Cut DNS over to GitHub Pages** | Nothing yet — the site keeps serving from Apache until this happens. | Juan Torresel | after the two above |
| Answer open decision #1 — the trust seal | Nothing, and that is the problem: it is fix-now item F3. | Juan Torresel | now |
| Answer open decision #2 — consent and privacy statement | Nothing — build around it | Juan Torresel | — |
| Fill the ownership table below | Handover of this site to anyone | Juan Torresel | — |

**The cutover is irreversible in the way that matters** and routes to a human under §22. Nothing in
this repository performs it. §26's rule holds without exception: *a DNS record never outlives the
resource it names* — creating and destroying the record and the hosting resource are one operation.

### The cutover runbook

Current state, measured 2026-08-11: `makesense.digital` resolves to `200.58.111.96` /
`2800:6c0:2::c:271` (DonWeb, Apache), and `www` is an alias of the apex.

**The order is the safety.** Verification before assignment is not a preference — an unverified
domain pointed at a hosting provider can be claimed by another account there, and the loss is the
domain, not the page.

1. **Verify the domain.** GitHub → organization `makesensedigital` → Settings → Pages →
   *Verified and approved domains* → add `makesense.digital`. It issues a `TXT` record for
   `_github-pages-challenge-makesensedigital`. Add it at the registrar and confirm. **Do this
   first, and confirm it says verified before step 3.**
2. **Merge the adoption pull request**, so `.github/workflows/gate.yml`, `CNAME` and `.nojekyll`
   are on the default branch. Nothing publishes yet.
3. **Enable Pages.** Repository → Settings → Pages → Source: **GitHub Actions**. The next push to
   `main` runs the gate and, only if it passes, publishes. The live site is still Apache at this
   point — Pages is serving the same content at its own URL, which is the moment to check it.
4. **Cut DNS**, replacing the DonWeb records:

   | Name | Type | Value |
   |---|---|---|
   | `@` | A | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
   | `@` | AAAA | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
   | `www` | CNAME | `makesensedigital.github.io` |

   Remove the `A`/`AAAA` records pointing at `200.58.111.96` / `2800:6c0:2::c:271` in the same
   operation. Leave `MX` and any mail records alone — this move does not touch mail.
5. **Wait for the certificate, then tick *Enforce HTTPS*.** GitHub issues a Let's Encrypt
   certificate once DNS resolves; there is a window of minutes to an hour where HTTPS fails. Do not
   announce the move until this is green.
6. **Decommission the DonWeb hosting resource** — and not before step 5. A DNS record must never
   outlive the resource it names, and the reverse is just as true during a cutover.

### What the cutover changes about fix-now item F3

The trust seal advertises a **Sectigo certificate issued through DonWeb**. After step 5 the site is
served under a Let's Encrypt certificate issued by GitHub, and that seal is no longer merely a
prohibited script — **it is a false claim about the site's own certificate**. The hosting decision
therefore settles the business half of open decision #1: the seal has to go, or be replaced with
something that is true. It cannot stay as it is.

---

## 3. Assumed — nobody validated these

The most dangerous section, because an assumption reads exactly like a decision six weeks later.

| Assumption | Who would confirm it | What breaks if it is wrong |
|---|---|---|
| The GTM container `GTM-P6JV5J3T` is restricted at the provider to this origin | Juan Torresel, in the GTM console | An identifier delivered to the browser is public from the moment it ships; unrestricted, anyone can fire events into the property |
| The Calendly link is owned by an account Make Sense controls and its reply has been tested | Juan Torresel | The primary conversion path terminates somewhere nobody reads |
| Nobody links to a URL on this site other than `/` | Juan Torresel | The host cannot redirect, so any such URL breaks permanently at cutover |
| The seven unreferenced brand PNGs are not linked from anywhere off-site | Juan Torresel | Deleting them 404s a link somebody else owns |

---

## 4. Do not do

The specific mistakes already identified for *this* site.

- **Do not make the gate green.** It is not supposed to be. Read
  [`docs/measurement-baseline.md`](docs/measurement-baseline.md) before touching a check.
- **Do not add an origin to `config.allowedOriginsOnFirstRender` to quiet a failure.** That list is
  the *approved* set, not an inventory of what happens today. Google Fonts and the trust-seal host
  are excluded on purpose.
- **Do not re-run `ratchet.mjs --init`.** It refuses when a baseline exists, and working around that
  silently accepts everything added since.
- **Do not fix a violation without `ratchet.mjs --update` in the same commit.** A baseline left high
  keeps headroom and the violation can come back for free.
- **Do not ship a `_headers` or `_redirects` file.** They are inert on this host, and an inert
  control file reads as a control that exists.
- **Do not treat a Calendly click as a conversion.**
- **Do not "fix" F1/F2 with a deletion commit.** Deleting does not unpublish — caches, indexes and
  history all keep the file.

---

## Corrections

| Initial conclusion | Correction | What triggered it |
|---|---|---|
| Adoption should leave the publication origin alone, since changing the deploy of a production site is not a gate change | Reversed the same day: the owner chose GitHub Pages explicitly, so the `publish` job is present and the origin moves | Owner's decision, 2026-08-11 |
| GitHub Pages is a lateral move from Apache | Wrong — it is a **downgrade in capability**. Apache could have served headers and redirects via `.htaccess`; Pages cannot do either. The choice was still taken, with the losses recorded rather than discovered later | Reading §26's capability table against the live response headers |

---

## External configuration inventory

Parts of this system live in a provider's web interface and are invisible to version control. This
inventory is the only record.

| Provider | Object | Identifier | What it does | Restricted to our origin? |
|---|---|---|---|---|
| Google Tag Manager | Container | `GTM-P6JV5J3T` | All measurement | **unverified — see Assumed** |
| Calendly | Scheduling link | `calendly.com/juan-torresel` | The primary conversion path | n/a |
| Sectigo / DonWeb | Trust seal script | `trust-provider.com` | Displays an SSL seal | **no — open decision #1** |
| Google Fonts | Poppins, Open Sans | — | Brand typefaces | n/a — debt #2 |
| GitHub | Pages site + domain verification | `makesensedigital/Make-Sense` | Hosting, from cutover | pending |

---

## Ownership and the exit path

Fill this in. A site whose pieces nobody can name is a site nobody can hand over.

| Piece | Who owns the account | How it transfers |
|---|---|---|
| Domain registrar | | |
| DNS zone | | |
| Domain verification | | |
| Repository | | |
| Hosting account | | |
| Analytics property | | |
| Tag container | | |
| Scheduling links | | |

---

## Verification before publication

The gate covers what a machine can see; these are the rest.

- [ ] The gate passes, and publication came from the pipeline rather than a branch
- [ ] Every conversion path walked end to end, on a real phone, on mobile data
- [ ] Opened **from a link in the channel the traffic actually comes from** — LinkedIn and Instagram
      both use an embedded browser, and it is not the browser you tested in
- [ ] The URL pasted into the messaging app and the social network the site is promoted on, and the
      preview card looked at — **it is currently broken; see debt #3**
- [ ] Events seen arriving in the measurement tool's live view, with intent and outcome distinct
- [ ] Sitemap submitted; structured data validated
- [ ] Keyboard-only walkthrough of every interactive element — roughly half of the accessibility
      requirement is invisible to any automated pass

## After launch

- **Owner:** Juan Torresel · **Cadence:** not set — debt #11
- **Scheduled check:** none. Nothing in this architecture announces a failure: no logs, no alerts,
  no health endpoint. Debt #11.
