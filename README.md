# IngredientIQ

A real, honest product-ingredient scanner — built as a sibling project to
[Ultron Valley](../ultron-valley), through the same process and the same rules.

## What it actually does

- **Scans a real barcode** using your browser's own built-in `BarcodeDetector`
  API (Chrome/Edge) — no camera library, no download, no account. Falls back
  to manual barcode entry or a name search when that API isn't available.
- **Looks up the real product** in [Open Beauty Facts](https://world.openbeautyfacts.org),
  a free, open, crowdsourced product database (same organization as Open Food
  Facts) — verified CORS-open, no API key needed.
- **Scores it 0–100 with a fully transparent, published rule list**
  (`data/ingredient-rules.json`): every point lost is shown, with the exact
  ingredient that caused it, a plain-language reason, and a version explained
  simply enough for a five-year-old. Nothing is a black box.
- **Hair type (the standard 1–4 system) and color profile**, with original
  illustrations (`art/hair-types.svg` — hand-authored, not traced from any
  photo).
- **Category-browsable recommendations** — real products from Open Beauty
  Facts, scored with the exact same rules, sorted best to worst.

## What it does not do

- It is **not** a medical, dermatological, or regulatory judgment — it's one
  transparent way of reading a label, built from well-documented, widely-cited
  consumer ingredient concerns.
- It does **not** know your personal allergies or sensitivities.
- The score is a heuristic, not a lab test. The full methodology is shown in
  the app itself ("How scoring works") — always, not hidden behind a paywall
  or a vague "our proprietary algorithm."

## Running it

```
./run-local.sh        # or run-local.bat on Windows
```

Needs to be served over real HTTP (not opened as a `file://` path) so the
Open Beauty Facts `fetch()` calls work under the page's own origin.

## Why this exists

Built in response to a request for an app "like Yuka, but for hair" —
scan in-store, understand what's actually in a product, in plain language.
Everything here is real: real barcode scanning, real product data, a real
and fully-shown scoring method. Where the honest answer was "this can't
actually do X" (watch a video, run a lab test), the app says so instead of
faking it.
