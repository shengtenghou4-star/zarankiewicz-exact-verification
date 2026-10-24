# Exact closure: z(15,17;3)=126

**Status:** published in arXiv:2608.08549 (preprint, not peer-reviewed).

Collins--Riasanovsky--Wallace--Radziszowski, arXiv:1604.01257, Table 4, records the upper bound

```text
z(15,17;3) <= 126.
```

The file `WITNESS_126_15x17.txt` contains 126 ones and no all-one `3 x 3` submatrix, so it supplies the matching lower bound. Hence

```text
z(15,17;3) = 126.
```

## Structural derivation

The witness is obtained from the archived `15 x 18`, 132-edge witness in `../z1417_z1418_z1518_exact/` by deleting a column of degree 6. Deleting a column preserves `K_{3,3}`-freeness and leaves `132-6=126` edges.

The May 2026 preprint arXiv:2605.01120 reports only the lower bound 125 for this cell in Figure 2. Thus this explicit 126-edge construction improves that public lower bound by one and meets the older published upper bound.

Run the repository's generic verifier:

```bash
python shared/verify_matrix.py results/z1517_exact/WITNESS_126_15x17.txt --rows 15 --cols 17 --ones 126
```

