# Exact closure: `z(12,18;3)=108`

**Status:** published in arXiv:2608.08549 (preprint, not peer-reviewed).

Here `z(m,n;3)` is the maximum number of ones in an `m x n` binary matrix with no all-one `3 x 3` submatrix.

## External theorem used

Collins, Riasanovsky, Wallace, and Radziszowski, *Zarankiewicz Numbers and Bipartite Ramsey Numbers*, Table 4, record `z(12,17;3)=103` and mark the extremal `(12,17,103)_3` graph as unique up to isomorphism. Primary-source identifier: arXiv:1604.01257.

## Upper-bound argument

Assume a `K_{3,3}`-free `12 x 18` matrix has 109 ones. If a column had degree at most 5, deleting it would leave at least 104 ones in a `12 x 17` matrix, contradicting `z(12,17;3)=103`. Thus every column has degree at least 6. Since `109=18*6+1`, the column degrees must be one 7 and seventeen 6s.

Delete any degree-6 column. The remaining 103-edge matrix is isomorphic to the unique extremal `12 x 17` graph. `witnesses/WITNESS_103.txt` is an explicit representative. The deterministic checker tests all `C(12,6)=924` possible neighborhoods for an additional degree-6 column and finds zero valid extensions. Therefore 109 edges are impossible and `z(12,18;3)<=108`.

## Lower-bound argument

`witnesses/WITNESS_108.txt` contains 108 ones. Direct enumeration of all 220 row triples confirms that each triple shares at most two one-columns. Hence it is `K_{3,3}`-free and `z(12,18;3)>=108`.

Combining the two bounds gives the exact value `z(12,18;3)=108`.

## Reproduce

Requires Node.js and a POSIX shell:

```bash
bash run_all.sh
```

Expected results:

- the 103-edge matrix has maximum triple common-neighborhood size 2;
- the 108-edge matrix has maximum triple common-neighborhood size 2;
- exactly 924 six-row extensions are tested;
- zero extensions are valid;
- all SHA-256 checks pass.

## Directory contents

- `witnesses/`: explicit 103-edge and 108-edge matrices;
- `verification/`: two independent deterministic verifiers;
- `reports/`: machine-readable outputs;
- `discovery/`: stochastic search code, not trusted by the proof;
- `SHA256SUMS`: integrity manifest.
