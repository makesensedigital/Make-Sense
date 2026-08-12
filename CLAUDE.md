# Claude Code — rules in force here

**The rules are in [`AGENTS.md`](AGENTS.md). Read it before the task.**

This file deliberately restates none of them. Two texts saying the same thing leave the reader to
pick, and they pick the one they understand — so a paraphrase that goes stale is *believed*, not
merely out of date (Handbook §24). `AGENTS.md` is generated from Handbook §26 and carries its own
drift manifest; a copy here would have neither.

What is specific to this repository and not in `AGENTS.md`:

- This repository **adopted the standard on 2026-08-11, eight months after the site went live**.
  The rules arrived after the code, so the code violates them — that is expected and it is
  measured, not hidden.
- **The gate is not green, and making it green is not the goal.** Read
  [`docs/measurement-baseline.md`](docs/measurement-baseline.md) before you touch a check. Every
  finding is in exactly one bucket: fixed, [debt](docs/technical-debt.md),
  [inapplicable](docs/inapplicable.md), or [blocked on a decision](docs/open-definitions.md).
- **The ratchet is what gates.** `.gate-baseline.json` carries what already existed; anything *new*
  fails. Fixing something lowers the baseline with `node scripts/ratchet.mjs --update`, **in the
  same commit as the fix**.
- **Never reach for a suppression when the code resists.** A blanket disable removes the rule for
  tomorrow's code too. Where one is genuinely needed it names the specific rule, is scoped as
  narrowly as possible, and states why (§20). There are two in this repository and both are
  documented at the point of use.
