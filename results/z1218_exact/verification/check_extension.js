'use strict';
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const matrixPath = process.argv[2] || path.join(projectRoot, 'witnesses', 'WITNESS_103.txt');
const reportPath = path.join(projectRoot, 'reports', 'extension_report.json');
const lines = fs.readFileSync(matrixPath, 'utf8').trim().split(/\n/).slice(0, 12);
const R = 12, C = 17;
if (lines.length !== R || lines.some(x => x.length !== C || /[^01]/.test(x))) {
  throw new Error('Malformed 12 x 17 matrix');
}

const tripleCounts = new Map();
const key = (a, b, c) => `${a},${b},${c}`;
let edges = 0;
const colDegrees = [];
for (let j = 0; j < C; j++) {
  const rows = [];
  for (let i = 0; i < R; i++) {
    if (lines[i][j] === '1') { rows.push(i); edges++; }
  }
  colDegrees.push(rows.length);
  for (let a = 0; a < rows.length; a++)
    for (let b = a + 1; b < rows.length; b++)
      for (let c = b + 1; c < rows.length; c++) {
        const k = key(rows[a], rows[b], rows[c]);
        tripleCounts.set(k, (tripleCounts.get(k) || 0) + 1);
      }
}

let maxTriple = 0;
const hist = {};
for (let a = 0; a < R; a++)
  for (let b = a + 1; b < R; b++)
    for (let c = b + 1; c < R; c++) {
      const v = tripleCounts.get(key(a, b, c)) || 0;
      maxTriple = Math.max(maxTriple, v);
      hist[v] = (hist[v] || 0) + 1;
    }

const extensions = [];
let tested = 0;
for (let mask = 0; mask < (1 << R); mask++) {
  let pc = 0;
  for (let x = mask; x; x &= x - 1) pc++;
  if (pc !== 6) continue;
  tested++;
  const rows = [];
  for (let i = 0; i < R; i++) if ((mask >> i) & 1) rows.push(i);
  let valid = true;
  for (let a = 0; a < 6 && valid; a++)
    for (let b = a + 1; b < 6 && valid; b++)
      for (let c = b + 1; c < 6; c++) {
        const v = tripleCounts.get(key(rows[a], rows[b], rows[c])) || 0;
        if (v >= 2) { valid = false; break; }
      }
  if (valid) extensions.push(rows.map(x => x + 1));
}

const report = {
  edges, colDegrees, maxTriple, tripleHistogram: hist,
  testedSixSubsets: tested, validExtensions: extensions.length, extensions
};
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (edges !== 103 || maxTriple > 2 || tested !== 924) process.exit(3);
process.exit(extensions.length ? 1 : 0);
