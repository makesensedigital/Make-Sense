// The configuration module — Handbook §26.
//
// EVERY external identifier this site uses lives here and nowhere else: the messaging number, the
// canonical domain, container ids, form ids, scheduling URLs, the contact mailbox, the asset version.
// `scripts/check-config.mjs` fails the gate on a literal for any of them found anywhere else.
//
// The rule is not tidiness. An identifier repeated across a page is a search-and-replace waiting to
// go wrong, and the cost is paid in production: a wrong number on one of eleven buttons looks exactly
// like a right one.
//
// NOTHING HERE IS A SECRET. Everything in this file is delivered to the visitor's browser and is
// readable there. These are PUBLIC IDENTIFIERS, and they are protected at the provider — restricted
// by origin or domain in each provider's own console. An identifier that cannot be restricted that
// way does not belong in a static site at all (§26; §4 is sharpened here, not relaxed).
//
// ADOPTION NOTE — READ THIS BEFORE TRUSTING THE FILE.
//
// This module was written on the day this repository adopted the standard, and it records the
// identifiers the site ALREADY uses. `index.html` does not load it yet, so every value below is
// still ALSO written as a literal in the markup. That duplication is a real violation, it is
// reported by `check-config`, it is carried by the ratchet, and it is debt #1 in
// `docs/technical-debt.md`. The file is the destination, not yet the source.
//
// Loaded before analytics.js, because the consent default has to execute before the tag container.

(function (root) {
  const CONFIG = {
    // -------------------------------------------------------------------- identity
    // The canonical origin, with protocol and no trailing slash. Absolute URLs in the head, the
    // sitemap and the structured data are all derived from this.
    canonicalOrigin: "https://makesense.digital",

    // -------------------------------------------------------------------- contact
    // DECLARED ABSENT, not forgotten (§26: a control is never left implied). This site has no
    // messaging handoff — no WhatsApp control exists in the markup. If one is ever added, the
    // number goes here in international format, digits only, and its message template goes in
    // `messages` below — never inline in the markup.
    messagingNumber: null,
    contactMailbox: "contacto@makesense.digital",

    // The scheduling link behind the two "book a call" controls. Today it is written as a literal
    // in the markup as well; see the adoption note above.
    schedulingUrl: "https://calendly.com/juan-torresel?hide_landing_page_details=1&hide_gdpr_banner=1", // check-config: allow — this module is the one place the scheduling link is allowed to appear

    // One template per conversion control. The key is the control's analytics label, so the visible
    // control, the event it emits and the text it composes cannot drift apart.
    // Empty because no messaging control exists — see `messagingNumber`.
    messages: {},

    // -------------------------------------------------------------------- measurement
    // The tag container that is live on the site today.
    tagContainerId: "GTM-P6JV5J3T", // check-config: allow — this module is the one place the container id is allowed to appear

    // -------------------------------------------------------------------- consent
    // The recorded decision. §26 requires the jurisdiction, the owner, the date and — the
    // load-bearing half — THE CONDITION THAT WOULD CHANGE THE ANSWER, because whoever revisits
    // this will not have the context.
    //
    // NOT DECIDED. The site has been measuring for eight months with the tag container firing
    // unconditionally and no privacy statement published, which is the state below rather than a
    // decision anybody took. The three TBDs are reported by `check-config` on purpose and are
    // open decision #2 in `docs/open-definitions.md`. Do not fill them in to make the gate quiet —
    // they are filled in by the person who takes the decision.
    //
    // NOTE THE LIMITATION, which is architectural and not a setting: a static site CANNOT produce
    // auditable PROOF of consent. The record lives in the visitor's browser — that is state, not
    // evidence. Where proof is required, an external receiver is needed (§26).
    consent: {
      mode: "notice-only",
      jurisdiction: "TBD — name the country or bloc whose law this answers",
      decidedBy: "TBD — a person, not a team",
      decidedOn: "TBD — YYYY-MM-DD",
      revisitWhen:
        "Make Sense sells or advertises into a jurisdiction requiring prior consent, the site handles special-category data, or profiling for advertising is introduced",
      // DECLARED ABSENT. §26 requires a privacy statement reachable from the site in every case,
      // whatever was decided about tracking. There is none. Open decision #2.
      privacyUrl: null,
    },

    // -------------------------------------------------------------------- conversion receiver
    // Where a submitted form is PERSISTED. §26: every conversion path terminates in a system the
    // business controls, and the record is written BEFORE any handoff to an external channel.
    //
    // `endpoint: null` is legitimate here because the site presents NO form: the conversion paths
    // are the scheduling link, the mailbox and the social profiles. It does not mean "hand off and
    // hope" — if a form is ever added, this is filled in first.
    receiver: {
      endpoint: null,
      owner: "Juan Torresel",
      originRestricted: false,
    },

    // -------------------------------------------------------------------- third parties
    // Every origin this page is ALLOWED to contact on first render, before any interaction.
    // `scripts/check-assets.mjs` compares the markup against this list.
    //
    // THIS LIST IS THE APPROVED SET, NOT AN INVENTORY OF WHAT HAPPENS TODAY. The page currently
    // also contacts `fonts.googleapis.com`, `fonts.gstatic.com` and `secure.trust-provider.com`.
    // Adding those here would make the gate green on a rule that is genuinely violated, which is
    // the failure the adoption procedure exists to prevent. They are reported, carried by the
    // ratchet, and recorded as debt #2 and debt #3.
    allowedOriginsOnFirstRender: ["https://www.googletagmanager.com"],

    // -------------------------------------------------------------------- assets
    // No build means no content-addressed filenames, so cache invalidation is manual. Bump this on
    // any change to a style, script or image; `?v=` is appended from here and nowhere else.
    // Bumped to 2 on 2026-08-12 when `styles.css` was extracted from the markup. `check-config`
    // fails if this and the `?v=` in the markup disagree.
    assetVersion: 2,
  };

  root.SITE_CONFIG = CONFIG;
})(typeof globalThis !== "undefined" ? globalThis : this);
