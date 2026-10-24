#!/usr/bin/env python3
from pathlib import Path
from itertools import combinations
import json

ROOT=Path(__file__).resolve().parents[1]

def read(name):
    rows=[x.strip() for x in (ROOT/'witnesses'/name).read_text().splitlines() if x.strip()]
    assert rows and len({len(x) for x in rows})==1 and set(''.join(rows))<=set('01')
    return [[int(c) for c in r] for r in rows]

def audit(name):
    M=read(name); m=len(M); n=len(M[0]); edges=sum(map(sum,M)); max_common=-1; worst=[]
    for tri in combinations(range(m),3):
        common=sum(M[tri[0]][j] and M[tri[1]][j] and M[tri[2]][j] for j in range(n))
        if common>max_common: max_common=common; worst=[tri]
        elif common==max_common: worst.append(tri)
        assert common<=2, (name,tri,common)
    return {'rows':m,'cols':n,'edges':edges,'max_triple_common':max_common,'worst_count':len(worst),
            'row_degrees':[sum(r) for r in M], 'column_degrees':[sum(M[i][j] for i in range(m)) for j in range(n)]}

files=['WITNESS_116_13x18.txt','WITNESS_118_14x17.txt','WITNESS_124_14x18.txt','WITNESS_132_15x18.txt']
report={f:audit(f) for f in files}
base=read('WITNESS_116_13x18.txt'); masks=[sum(v<<j for j,v in enumerate(r)) for r in base]
pairs=[masks[i]&masks[j] for i,j in combinations(range(len(masks)),2)]
valid=[]
for cols in combinations(range(18),8):
    x=sum(1<<j for j in cols)
    if all((x&p).bit_count()<=2 for p in pairs): valid.append(x)
report['degree8_extensions_of_116']=[''.join('1' if x>>j&1 else '0' for j in range(18)) for x in valid]
assert len(valid)==2
for idx,x in enumerate(valid):
    ext=masks+[x]
    ps=[ext[i]&ext[j] for i,j in combinations(range(len(ext)),2)]
    nxt=[]
    for cols in combinations(range(18),8):
        y=sum(1<<j for j in cols)
        if all((y&p).bit_count()<=2 for p in ps): nxt.append(y)
    report[f'degree8_extensions_after_{idx}']=[''.join('1' if y>>j&1 else '0' for j in range(18)) for y in nxt]
    assert len(nxt)==1 and nxt[0] == valid[1-idx]
(ROOT/'reports'/'python_report.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
