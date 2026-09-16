#!/usr/bin/env bash
# Serves Gabby's locally. Needs real HTTP (not file://) so fetch() calls to
# Open Beauty Facts work correctly under the page's own origin.
set -e
cd "$(dirname "$0")"
PORT="${1:-8770}"
if command -v python3 >/dev/null 2>&1; then PY=python3
elif command -v python >/dev/null 2>&1; then PY=python
else echo "Python not found. Install Python 3 to run the local server." >&2; exit 1
fi
echo "Serving Gabby's at http://127.0.0.1:$PORT/"
"$PY" -m http.server "$PORT"
