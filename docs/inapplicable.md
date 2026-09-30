# Inapplicable — rules that genuinely cannot apply here

A rule that does not apply is **recorded with the reason, never deleted and never silently
skipped** (§24). Deleting it loses the fact that it was considered, so the next person re-derives it
from nothing — and an absent control looks exactly like a site that did not need one (§26).

Two kinds of row live here, and the difference is worth keeping straight:

- **Out of scope** — the rule governs a shape of software this repository is not.
- **Out of reach** — the rule governs this shape, and the *host* cannot implement it. §26 permits a
  control to be **declared absent**; it does not permit one to be left implied. These are not debt:
  debt is what is expensive to fix, and these are not fixable at all on this host. The row therefore
  carries **what would reopen it** instead of a trigger to fix it.

---

## Out of scope — §26's own suspensions

§26 governs this repository and suspends the following **by name**, having established that all five
scope conditions hold: the artifact is static, there is no backend, no user is authenticated,
business logic runs in third-party platforms, and deployment is the publication of files.

| # | Rule | Why it cannot apply |
|---|---|---|
| S1 | **§1 — the prescribed stack** | There is no application. One HTML document, no build, no dependency manifest. |
| S2 | **§5, §5b, §5c — authorization** | No user is authenticated. There are no sessions, roles or permissions to gate. |
| S3 | **§7, §7b — the data layer, schema semantics, migrations** | No database is owned by this repository. |
| S4 | **§8, §8b — the HTTP contract** | This repository serves no endpoints. |
| S5 | **§9 — structured server logging** | There is no server. Request logs are `inapplicable.md` I4 below, not this row. |
| S6 | **§20 — the five-stage quality gate**, and with it `.github/workflows/standards.yml`, the Central Standards CI caller | There is nothing to format-check across a toolchain, no type system, no unit suite and no dependency tree to audit. **Replaced, not dropped**: `.github/workflows/gate.yml` is §26's eleven-point delivery gate, and this is the substitution stated by name that §26 requires. |

**The scope test is re-run on every change** (`AGENTS.md`, PR checklist). The moment a session, a
role, a database or an endpoint of this repository's own is needed, the test fails, this file's
first section is void, and the rest of the handbook governs.

---

## Out of reach — what the hosting decision put beyond us

**Decision: GitHub Pages. 2026-08-11, Juan Torresel.** Taken with the capability table in front of
us, replacing an Apache host that could have served headers and redirects via `.htaccess`. §26
requires the choice to be recorded *and* what it puts out of reach to be recorded with it. This is
that record.

| # | Control §26 requires | Status | Why, and what would reopen it |
|---|---|---|---|
| I1 | **Custom response headers** — and therefore no content security policy, no transport policy of our own, and no permissions policy | **absent** | GitHub Pages serves no custom response headers. `_headers` is a Netlify/Cloudflare convention and is inert here, which is why this repository deliberately ships no such file — an inert control file reads as a control that exists. **Reopen when** the site handles anything beyond public marketing copy, or a client requires a security-header attestation. |
| I2 | **Framing control** | **absent, and this one cannot be mitigated at all** | It is delivered only by a response header. A policy expressed in markup cannot express it. So there is **no protection against framing on this site**, stated plainly rather than left implied. This was true on the previous host too, which served no headers either — the decision makes it permanent rather than accidental. **Reopen with I1.** |
| I3 | **Real redirect status for retired URLs** | **absent** | GitHub Pages issues no real redirect. `_redirects` is inert and is not shipped. A markup page that refreshes the browser is not a redirect: it carries no authority signal and does not work for non-markup resources. **Today this costs nothing** — the site is one URL and has retired none. **It becomes a blocker the moment a second URL exists or the first one moves**, which is precisely why §26 makes hosting a decision taken *before* the markup. Debt #10 (English on its own URL) is already waiting behind it. |
| I4 | **Access logs** | **absent** | Not offered. The only remaining traffic record is client-side telemetry, which is blind to anyone blocking script — so every traffic number this site produces is a lower bound, and §26 requires that known bias to be recorded beside the number. |
| I5 | **Cache purge** | **absent** | Not offered. A wrong price, phone number or claim stays live for the cache lifetime with no way to shorten it. Mitigation available in-architecture: markup revalidates, and assets are versioned in the URL from `config.assetVersion` (not yet used — debt #1). |
| I6 | **Server-side validation, rate limiting, abuse control, runtime secrets** | **absent by architecture, not by host** | §26 places these at the receiver or declares them absent. This site presents no form and holds no runtime secret, so there is nothing to validate or protect. `config.receiver.endpoint` is `null` for that reason and not as a placeholder. **Reopen the moment a form is added** — at which point the receiver is chosen first, before the field. |

**What is available and is being used:** per-change previews via pull request, rollback to a
previous deployment, and a delivery pipeline that refuses to publish when the gate fails. Those are
the three the choice keeps.
