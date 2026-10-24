#!/usr/bin/env python3
"""Verify a binary Zarankiewicz witness by row-triple intersections."""

from __future__ import annotations

import argparse
import itertools
from pathlib import Path


def read_matrix(path: Path) -> list[str]:
    rows: list[str] = []
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if line and set(line) <= {"0", "1"}:
            rows.append(line)
        elif rows:
            break
    if not rows:
        raise ValueError("no binary rows found")
    width = len(rows[0])
    if any(len(row) != width for row in rows):
        raise ValueError("rows have inconsistent lengths")
    return rows


def verify(rows: list[str]) -> tuple[int, int, tuple[int, int, int] | None]:
    ones = sum(row.count("1") for row in rows)
    max_common = -1
    worst: tuple[int, int, int] | None = None
    for triple in itertools.combinations(range(len(rows)), 3):
        common = sum(
            rows[triple[0]][j] == rows[triple[1]][j] == rows[triple[2]][j] == "1"
            for j in range(len(rows[0]))
        )
        if common > max_common:
            max_common = common
            worst = triple
    return ones, max_common, worst


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("matrix", type=Path)
    parser.add_argument("--rows", type=int)
    parser.add_argument("--cols", type=int)
    parser.add_argument("--ones", type=int)
    args = parser.parse_args()

    rows = read_matrix(args.matrix)
    ones, max_common, worst = verify(rows)
    actual_rows, actual_cols = len(rows), len(rows[0])

    checks = [
        args.rows is None or actual_rows == args.rows,
        args.cols is None or actual_cols == args.cols,
        args.ones is None or ones == args.ones,
        max_common <= 2,
    ]

    print(f"rows={actual_rows} cols={actual_cols} ones={ones}")
    print(f"max common one-columns over row triples={max_common}; worst={worst}")
    if not all(checks):
        raise SystemExit("FAIL")
    print("PASS: no all-one 3 x 3 submatrix")


if __name__ == "__main__":
    main()
