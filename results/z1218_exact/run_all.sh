#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
node verification/verify_independent.js
node verification/check_extension.js
sha256sum -c SHA256SUMS
