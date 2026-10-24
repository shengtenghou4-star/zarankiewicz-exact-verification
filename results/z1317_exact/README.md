# Exact closure: `z(13,17;3)=110`

**Status:** published in arXiv:2608.08549 (preprint, not peer-reviewed).

## Upper bound

Collins, Riasanovsky, Wallace, and Radziszowski record `z(13,17;3) <= 110` in Table 4 of *Zarankiewicz Numbers and Bipartite Ramsey Numbers* (arXiv:1604.01257).

## Lower bound

`witnesses/WITNESS_110.txt` is an explicit `13 x 17` binary matrix with 110 ones. It was obtained from the 116-edge `13 x 18` witness by deleting a degree-6 column (up to the recorded row/column ordering). Exhaustive row-triple checking confirms that every three rows have at most two common one-columns, so the matrix is `K_{3,3}`-free.

Therefore `z(13,17;3) >= 110`. Together with the published upper bound,

```text
z(13,17;3) = 110.
```

## Reproduce

```bash
python shared/verify_matrix.py results/z1317_exact/witnesses/WITNESS_110.txt --rows 13 --cols 17 --ones 110
```

Expected result: `PASS: no all-one 3 x 3 submatrix`.

