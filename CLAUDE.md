# Standing rule: always end with a live link

Any response that touches this app ends with a clickable link to open it. Two real
deployments exist:
- **Permanent, works with the laptop off**: `https://propreflight-source.github.io/ingredient-iq/`
  — deployed via GitHub Pages (`gh api repos/propreflight-source/ingredient-iq/pages`,
  deploying from `main`/`/`). This is the one to hand Mason for actual phone use, since
  it's real HTTPS (required for iOS Safari camera access) and doesn't depend on this PC
  being on. To ship a change here: `git push origin main`, then GitHub rebuilds
  automatically (usually <60s) — verify with a `curl` before calling it done, don't
  assume the build finished.
- **Local dev**: `http://127.0.0.1:8770/` — for iterating before pushing.

Verify whichever you link with a quick `curl` first, not assumed. Don't make Mason ask
"give me a link" after every change; hand it over by default. If the sibling app Ultron
Valley (`http://127.0.0.1:8765/`) was touched in the same turn, link that too.

See `README.md` for what this app actually does and does not do, and
`../ultron-valley/vault/sop-no-fabrication.md` for the shared no-fabrication rule both
sibling apps follow.

## Standing rule: hand off every edit to gabbys-builder

The orchestrating session reads and decides here freely, but every actual file
change goes through the `gabbys-builder` subagent (`.claude/agents/gabbys-builder.md`),
scoped strictly to this repo. If it hits friction, let it retry with its own
judgment before stepping in directly — only intervene when it's genuinely stuck
(a real dead end, or a decision only Mason can make), not for convenience or speed.
Keep every change as small as the task actually needs — this is a deliberately
plain static site, not a place to reach for a rewrite. Every UI change must hold
up at the iPhone 14 viewport (390×844) with no issues, verified live, not assumed.
