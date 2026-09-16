# Standing rule: always end with a live link

Any response that touches this app ends with a clickable link to open it —
`http://127.0.0.1:8770/` — verified live (a quick `curl` check) before it's given, not
assumed. Don't make Mason ask "give me a link" after every change; hand it over by
default. If the sibling app Ultron Valley (`http://127.0.0.1:8765/`) was touched in the
same turn, link that too.

See `README.md` for what this app actually does and does not do, and
`../ultron-valley/vault/sop-no-fabrication.md` for the shared no-fabrication rule both
sibling apps follow.
