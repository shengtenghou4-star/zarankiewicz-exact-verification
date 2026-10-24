#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
python3 verification/check.py
node verification/check.js
sha256sum -c SHA256SUMS
