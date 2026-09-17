# Gabby's

A real, honest product-ingredient scanner — built as a sibling project to
[Ultron Valley](../ultron-valley), through the same process and the same rules.

## Using it on an iPhone

The app itself is mobile-first now: touch-sized buttons, no iOS zoom-on-focus,
safe-area padding for the notch, and "Add to Home Screen" support (real
manifest + icon, opens full-screen like an app once added).

**Camera scanning works in Safari** — iOS Safari has never implemented the
`BarcodeDetector` API that Chrome/Edge have, so without a fallback, scanning
would silently fail on every iPhone. This app now loads
[ZXing](https://github.com/zxing-js/library) (a real, widely-used open-source
barcode decoder, MIT licensed) on demand for browsers that need it, so camera
scanning is real on Safari too, not just manual entry.

**The one real constraint you can't route around**: iOS Safari only grants
camera access on a *secure context* — `https://` or `localhost`. If you run
`run-local.sh`/`.bat` on your computer and open its LAN address
(`http://192.168.x.x:8770`) from your iPhone, the camera button will be
denied every time — that's Apple's own security rule, not a bug here. To
actually scan from your phone, either:
- **Deploy it somewhere with real HTTPS** (GitHub Pages, Netlify, Vercel —
  all free, no backend needed since everything already runs client-side), or
- **Tunnel your local server** for testing (e.g. `cloudflared tunnel --url
  http://localhost:8770`), which gives it a temporary `https://` address.

Manual barcode entry and name search work everywhere, including plain
`http://`, with no such limit — only the *live camera* needs HTTPS.

## What it actually does

- **Scans a real barcode** using your browser's own built-in `BarcodeDetector`
  API (Chrome/Edge), or a real open-source decoder (ZXing) as a fallback on
  browsers without it — no camera library download, no account. Falls back
  to manual barcode entry or a name search when neither is available.
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

## Running the tests

Open `tests.html` in a browser served over http(s), same as the app itself — it loads the
real functions straight out of `index.html` (no logic duplicated) and runs a battery of
assertions against them, rendering pass/fail results on the page.

## Why this exists

Built in response to a request for an app "like Yuka, but for hair" —
scan in-store, understand what's actually in a product, in plain language.
Everything here is real: real barcode scanning, real product data, a real
and fully-shown scoring method. Where the honest answer was "this can't
actually do X" (watch a video, run a lab test), the app says so instead of
faking it.
