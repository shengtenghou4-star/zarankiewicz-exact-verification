# Seven Exact Finite Zarankiewicz Numbers — verification package

Certificates and verifiers for

> Shengteng Hou, *Seven Exact Finite Zarankiewicz Numbers from a Single 13×18 Core*, arXiv:[2608.08549](https://arxiv.org/abs/2608.08549) (2026). **Preprint, not peer-reviewed.**

| Cell | Value | Upper-bound route |
|---|---|---|
| z(12,18;3) | 108 | uniqueness of the (12,17,103) extremal graph + rejection of all C(12,6)=924 column extensions |
| z(13,17;3) | 110 | published upper bound (Collins et al. 2016) |
| z(13,18;3) | 116 | column-deletion contradiction from z(13,17;3) ≤ 110 |
| z(14,17;3) | 118 | published upper bound |
| z(14,18;3) | 124 | published upper bound |
| z(15,17;3) | 126 | published upper bound |
| z(15,18;3) | 132 | published upper bound |

## Contents

- `results/*/witnesses/` — explicit K₃,₃-free binary matrices (plus the 103-edge 12×17 representative used for the 108 upper bound)
- `results/z1218_exact/verification/` — independent verifier and the 924-extension rejection check
- `results/z1417_z1418_z1518_exact/verification/` — Python and Node checkers for the extension/deletion chain
- `shared/verify_matrix.py` — portable row-triple verifier
- `results/*/reports/` — machine-readable reports; `SHA256SUMS` — integrity hashes

## Reproduce

Requirements: Python 3.8+ (standard library only) and Node.js 16+.

```bash
./run_all.sh
```

## Citation

```bibtex
@misc{hou2026zarankiewicz,
  author = {Hou, Shengteng},
  title  = {Seven Exact Finite Zarankiewicz Numbers from a Single $13\times 18$ Core},
  year   = {2026},
  eprint = {2608.08549},
  archivePrefix = {arXiv},
  note   = {Preprint, not peer-reviewed}
}
```

## License

Code: MIT. Matrices and data: CC BY 4.0.
