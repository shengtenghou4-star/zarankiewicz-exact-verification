# Exact closure: `z(13,18;3)=116`

**Status:** published in arXiv:2608.08549 (preprint, not peer-reviewed).

Here `z(m,n;3)` is the maximum number of ones in an `m x n` binary matrix containing no all-one `3 x 3` submatrix.

## Upper bound

Collins, Riasanovsky, Wallace, and Radziszowski record `z(13,17;3) <= 110` in Table 4 of *Zarankiewicz Numbers and Bipartite Ramsey Numbers* (arXiv:1604.01257).

If a `13 x 18` admissible matrix had 117 ones, one of its 18 columns would have degree at most `floor(117/18)=6`. Deleting that column would leave a `13 x 17` admissible matrix with at least 111 ones, contradicting the published upper bound. Hence `z(13,18;3) <= 116`.

## Lower bound

`witnesses/WITNESS_116.txt` is an explicit `13 x 18` binary matrix with 116 ones. Exhaustive row-triple checking confirms that every three rows have at most two common one-columns, so the matrix is `K_{3,3}`-free. Hence `z(13,18;3) >= 116`.

Therefore `z(13,18;3)=116`.

## Reproduce

```bash
python shared/verify_matrix.py results/z1318_exact/witnesses/WITNESS_116.txt --rows 13 --cols 18 --ones 116
```

Expected result: `PASS: no all-one 3 x 3 submatrix`.

