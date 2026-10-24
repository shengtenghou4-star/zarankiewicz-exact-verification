# Exact closure: z(14,17;3)=118, z(14,18;3)=124, z(15,18;3)=132

**Status:** published in arXiv:2608.08549 (preprint, not peer-reviewed).

Here `z(m,n;3)` denotes the maximum number of ones in an `m x n` binary matrix with no all-one `3 x 3` submatrix.

## Exact-value chain

The published 2016 upper bounds are

- `z(14,17;3) <= 118`,
- `z(14,18;3) <= 124`,
- `z(15,18;3) <= 132`.

The explicit matrices in `witnesses/` establish the matching lower bounds. Therefore, conditional only on the cited published upper bounds,

- `z(14,17;3) = 118`,
- `z(14,18;3) = 124`,
- `z(15,18;3) = 132`.

## Structural derivation from the 116 witness

Start with the verified `13 x 18`, 116-edge witness `WITNESS_116_13x18.txt`.

Exhaustive enumeration of all `C(18,8)=43758` degree-8 rows finds exactly two rows that can be appended while preserving `K_{3,3}`-freeness:

```text
A = 100010010010111100
B = 000110110101010100
```

Appending either row gives a `14 x 18` matrix with 124 ones. After appending one, exhaustive enumeration again shows that the other is the unique degree-8 row that can be appended. Appending both gives a `15 x 18` matrix with 132 ones.

The 124-edge `14 x 18` matrix has columns of degree 6. Deleting column 1 (zero-based) gives the stored `14 x 17` matrix with 118 ones.

Thus the chain is

```text
(13,18,116) + A -> (14,18,124)
(14,18,124) + B -> (15,18,132)
(14,18,124) - one degree-6 column -> (14,17,118)
```

## Relation to the May 2026 preprint

Bhan--Nobili--Raghuraman--Langer, arXiv:2605.01120, independently report lower bounds 118, 124, and 132 for these three cells. Their Figure 2 compares them against a weaker upper-bound table and does not mark the cells tight. The present closure observation is the pairing of matching explicit lower bounds with the older Table 4 upper bounds, together with a compact explicit extension chain from the 116 witness.


## Verification

Run:

```bash
bash run_all.sh
```

The checks confirm:

- exact dimensions and edge counts;
- every triple of rows has at most two common one-columns;
- exactly two degree-8 extensions of the 116 witness;
- after either first extension, the other extension is unique;
- SHA-256 integrity of all archived files.
