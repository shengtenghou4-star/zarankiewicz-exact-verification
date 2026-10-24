#!/usr/bin/env bash
# Reproduce every finite claim. Requires python3 (stdlib only) and node (>=16).
set -euo pipefail
cd "$(dirname "$0")"
python3 shared/verify_matrix.py results/z1318_exact/witnesses/WITNESS_116.txt --rows 13 --cols 18 --ones 116
python3 shared/verify_matrix.py results/z1317_exact/witnesses/WITNESS_110.txt --rows 13 --cols 17 --ones 110
python3 shared/verify_matrix.py results/z1517_exact/WITNESS_126_15x17.txt --rows 15 --cols 17 --ones 126
bash results/z1218_exact/run_all.sh
bash results/z1417_z1418_z1518_exact/run_all.sh
sha256sum -c SHA256SUMS
echo "ALL CHECKS PASSED"
