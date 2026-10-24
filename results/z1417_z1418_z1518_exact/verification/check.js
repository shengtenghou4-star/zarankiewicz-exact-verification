#!/usr/bin/env node
const fs=require('fs'), path=require('path');
const root=path.resolve(__dirname,'..');
function read(name){return fs.readFileSync(path.join(root,'witnesses',name),'utf8').trim().split(/\n/).map(s=>[...s.trim()].map(Number));}
function audit(name){
 const M=read(name), m=M.length,n=M[0].length; let edges=0,max=-1,worst=0;
 for(const r of M) for(const v of r) edges+=v;
 for(let a=0;a<m;a++) for(let b=a+1;b<m;b++) for(let c=b+1;c<m;c++){
   let z=0; for(let j=0;j<n;j++) if(M[a][j]&&M[b][j]&&M[c][j]) z++;
   if(z>=3) throw new Error(`${name}: violation ${a},${b},${c}: ${z}`);
   if(z>max){max=z;worst=1}else if(z===max)worst++;
 }
 return {rows:m,cols:n,edges,max_triple_common:max,worst_count:worst,
   row_degrees:M.map(r=>r.reduce((a,b)=>a+b,0)),
   column_degrees:Array.from({length:n},(_,j)=>M.reduce((s,r)=>s+r[j],0))};
}
const files=['WITNESS_116_13x18.txt','WITNESS_118_14x17.txt','WITNESS_124_14x18.txt','WITNESS_132_15x18.txt'];
const report={}; for(const f of files) report[f]=audit(f);
fs.writeFileSync(path.join(root,'reports','node_report.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
