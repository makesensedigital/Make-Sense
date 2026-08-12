# Open definitions — blocked on a decision

The rule applies, and complying needs a choice nobody has made yet: a provider, a budget, an owner,
a jurisdiction.

**An entry here means permitted-and-registered, not blocked.** What the standard does not govern is
permitted and reported: you decide, you proceed, and the decision lands here so the next person is
not deciding it from nothing. If an open row stopped work this file would become a list of stop
signs, and nobody writes those down — which loses the visibility that is the entire point.

Every row carries **the default that holds while it is open**. A row without one is a question
pretending to be a plan.

Keep it distinct from [`technical-debt.md`](technical-debt.md), which records what is *wrong*, and
from [`inapplicable.md`](inapplicable.md), which records what *cannot apply*. This records what is
*undecided*.

---

## Open

| # | Open question | Governing section | Default while open | Opened |
|---|---|---|---|---|
| 1 | **Whether the trust seal stays.** `index.html` injects a script from `trust-provider.com` with `document.write`, unpinned and without subresource integrity — which §26 prohibits outright. The engineering answer is to remove it. The business answer is that it is a visible trust signal somebody chose to display, and that is not an engineering call. Three ways out: remove it; replace it with a static image linking to the certificate page, which keeps the signal and drops the script; or keep it and accept an unreviewable third party with full page privileges. **The hosting decision narrows this to two.** The seal advertises a Sectigo certificate issued through DonWeb; once the site is served by GitHub Pages under a Let's Encrypt certificate, the seal is a false claim about the site's own certificate, not merely a prohibited script. Keeping it as-is stops being an option at cutover. | §26 (third parties enter through the tag container; no document-writing injection) | **None — this is fix-now item F3 and it is the one row here that is not safe to sit on.** Until it is answered the site executes arbitrary third-party script on every visit. Answer it, do not carry it. | 2026-08-11 |
| 2 | **The consent decision, and the privacy statement.** Jurisdiction, who decides, on what date. The tag container has fired unconditionally for eight months and no privacy statement is published, which is the state the site is in rather than a decision anybody took. §26 requires a privacy statement reachable from the site **in every case**, whatever is decided about tracking. Recorded in `config.js` as three unanswered fields, reported by the gate on purpose. | §26 (consent is an explicit recorded decision) | `mode: "notice-only"` — measurement on, no banner — which is what the site does today. It is the *default*, not the answer. **`revisitWhen` is already written** in `config.js` and is the load-bearing half: Make Sense sells or advertises into a jurisdiction requiring prior consent, the site handles special-category data, or profiling for advertising is introduced. | 2026-08-11 |
| 3 | **Who owns each piece, and how it transfers.** Registrar, DNS zone, domain verification, repository, hosting account, analytics property, tag container, scheduling links. §26 requires this from day one: a site whose pieces nobody can name is a site nobody can hand over, and the unclaimed pieces are the ones that end up as a DNS record pointing at a resource that no longer exists — which is how a domain becomes claimable by a stranger. | §26 (ownership and exit are recorded from the first day) | Assume **Juan Torresel** owns every account until each row is filled in. That is an assumption, not a record — the table is in [`../brief.md`](../brief.md) and it is empty. | 2026-08-11 |

---

## Closed

A closed row is kept, not deleted: the value is not only in the answer but in knowing what was
considered.

| # | Question | Decision | Who | When |
|---|---|---|---|---|
| 0 | **Which host.** The site ran on Apache (DonWeb), which can serve response headers and real redirects via `.htaccess`. §26 makes this a security decision taken before the markup, chosen against capability. | **GitHub Pages.** Taken knowing it serves no custom response headers and issues no real redirect — so no content security policy, **no protection against framing at all**, no access logs and no cache purge. Those six consequences are recorded in [`inapplicable.md`](inapplicable.md) as declared-absent controls with what would reopen the choice. What it buys: the publication origin becomes the delivery pipeline, with per-change previews and rollback. | Juan Torresel | 2026-08-11 |
