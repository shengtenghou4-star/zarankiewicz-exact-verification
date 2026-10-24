'use strict';
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
function readMatrix(fileName, cols) {
  const filePath = path.join(projectRoot, 'witnesses', fileName);
  const rows = fs.readFileSync(filePath, 'utf8').trim().split(/\n/)
    .filter(x => /^[01]+$/.test(x)).slice(0, 12);
  if (rows.length !== 12 || rows.some(r => r.length !== cols)) {
    throw new Error(`Malformed ${fileName}`);
  }
  return rows.map(r => [...r].map(Number));
}
function directCheck(A) {
  const m = A.length, n = A[0].length;
  let edges = 0, maxCommon = -1, worstCount = 0;
  for (const row of A) for (const x of row) edges += x;
  for (let a = 0; a < m; a++)
    for (let b = a + 1; b < m; b++)
      for (let c = b + 1; c < m; c++) {
        let common = 0;
        for (let j = 0; j < n; j++) if (A[a][j] && A[b][j] && A[c][j]) common++;
        if (common > maxCommon) { maxCommon = common; worstCount = 1; }
        else if (common === maxCommon) worstCount++;
      }
  return { rows: m, cols: n, edges, maxCommon, worstCount };
}
function combinations(n, k) {
  const out = [];
  function rec(start, a) {
    if (a.length === k) { out.push(a.slice()); return; }
    for (let x = start; x <= n - (k - a.length); x++) {
      a.push(x); rec(x + 1, a); a.pop();
    }
  }
  rec(0, []);
  return out;
}

const A103 = readMatrix('WITNESS_103.txt', 17);
const A108 = readMatrix('WITNESS_108.txt', 18);
const c103 = directCheck(A103), c108 = directCheck(A108);
const subsets = combinations(12, 6);
const validExtensions = [];
for (const S of subsets) {
  const set = new Set(S);
  const B = A103.map((row, i) => row.concat(set.has(i) ? 1 : 0));
  if (directCheck(B).maxCommon <= 2) validExtensions.push(S.map(x => x + 1));
}
const report = {
  checker: 'independent direct common-column enumeration',
  matrix103: c103, matrix108: c108,
  testedExtensions: subsets.length, validExtensions
};
const reportPath = path.join(projectRoot, 'reports', 'independent_report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (c103.edges !== 103 || c103.maxCommon > 2 || c108.edges !== 108 ||
    c108.maxCommon > 2 || subsets.length !== 924 || validExtensions.length !== 0) {
  process.exit(1);
}
