'use strict';
const fs=require('fs');
const R=12,C=+(process.argv[2]||17),SEVEN=+(process.argv[3]||1),SEED=+(process.argv[4]||1),MS=+(process.argv[5]||60000),OUT=process.argv[6]||'witness.txt';
const triples=[],tid=Array.from({length:R},()=>Array.from({length:R},()=>Array(R).fill(-1)));
for(let a=0;a<R;a++)for(let b=a+1;b<R;b++)for(let c=b+1;c<R;c++){tid[a][b][c]=triples.length;triples.push([a,b,c]);}
const mr=Array(1<<R),mt=Array(1<<R);
for(let m=0;m<(1<<R);m++){const rs=[];for(let i=0;i<R;i++)if(m>>i&1)rs.push(i);mr[m]=rs;const ts=[];for(let a=0;a<rs.length;a++)for(let b=a+1;b<rs.length;b++)for(let c=b+1;c<rs.length;c++)ts.push(tid[rs[a]][rs[b]][rs[c]]);mt[m]=ts;}
const pt=x=>x>2?(x-2)*(x-2):0;
class RNG{constructor(s){this.x=(s>>>0)||0x9e3779b9;}next(){let x=this.x;x^=x<<13;x^=x>>>17;x^=x<<5;return this.x=x>>>0;}int(n){return this.next()%n;}real(){return this.next()/4294967296;}}
const rng=new RNG(SEED),shuffle=a=>{for(let i=a.length-1;i;i--){const j=rng.int(i+1);[a[i],a[j]]=[a[j],a[i]];}};
function T(a,b,c){if(a>b)[a,b]=[b,a];if(b>c)[b,c]=[c,b];if(a>b)[a,b]=[b,a];return tid[a][b][c];}
function init(){const col=new Uint16Array(C),a=[0,1,2,3,4,5,6,7,8,9,10,11];for(let j=0;j<C;j++){shuffle(a);let m=0,d=j<SEVEN?7:6;for(let k=0;k<d;k++)m|=1<<a[k];col[j]=m;}const s={col,cnt:new Uint8Array(220),p:0};for(const m of col)for(const t of mt[m])s.cnt[t]++;for(const x of s.cnt)s.p+=pt(x);return s;}
function delta(s,j,rem,add){const om=s.col[j],nm=(om&~(1<<rem))|(1<<add);let d=0;for(let x=0;x<mr[om].length;x++)for(let y=x+1;y<mr[om].length;y++){let u=mr[om][x],v=mr[om][y];if(u===rem||v===rem)continue;let t=T(rem,u,v),q=s.cnt[t];d+=pt(q-1)-pt(q);}for(let x=0;x<mr[nm].length;x++)for(let y=x+1;y<mr[nm].length;y++){let u=mr[nm][x],v=mr[nm][y];if(u===add||v===add)continue;let t=T(add,u,v),q=s.cnt[t];d+=pt(q+1)-pt(q);}return d;}
function apply(s,j,rem,add){const om=s.col[j];for(let x=0;x<mr[om].length;x++)for(let y=x+1;y<mr[om].length;y++){let u=mr[om][x],v=mr[om][y];if(u===rem||v===rem)continue;let t=T(rem,u,v),q=s.cnt[t];s.p+=pt(q-1)-pt(q);s.cnt[t]--;}const nm=(om&~(1<<rem))|(1<<add);for(let x=0;x<mr[nm].length;x++)for(let y=x+1;y<mr[nm].length;y++){let u=mr[nm][x],v=mr[nm][y];if(u===add||v===add)continue;let t=T(add,u,v),q=s.cnt[t];s.p+=pt(q+1)-pt(q);s.cnt[t]++;}s.col[j]=nm;}
function text(s){let z=[];for(let i=0;i<R;i++){let q='';for(let j=0;j<C;j++)q+=(s.col[j]>>i)&1;z.push(q);}return z.join('\n')+'\ncolumns='+Array.from(s.col,m=>mr[m].map(x=>x+1).join(',')).join(' | ')+'\n';}
const end=Date.now()+MS;let best=1e9,re=0,steps=0;
while(Date.now()<end){const s=init();let stale=0;for(let step=0;step<180000&&Date.now()<end&&s.p;step++,steps++){
 const bad=[];for(let t=0;t<220;t++)if(s.cnt[t]>2)bad.push(t);const tr=triples[bad[rng.int(bad.length)]],moves=[];let bd=1e9;
 for(let j=0;j<C;j++){const m=s.col[j];if(!(m>>tr[0]&1)||!(m>>tr[1]&1)||!(m>>tr[2]&1))continue;for(const rem of tr)for(let add=0;add<R;add++)if(!(m>>add&1)){const d=delta(s,j,rem,add);if(d<bd){bd=d;moves.length=0;}if(d===bd)moves.push([j,rem,add,d]);}}
 const mv=moves[rng.int(moves.length)],temp=Math.max(.12,1.5*(1-step/180000));
 if(mv[3]<=0||rng.real()<Math.exp(-mv[3]/temp)){apply(s,mv[0],mv[1],mv[2]);stale=mv[3]<0?0:stale+1;}else stale++;
 if(s.p<best){best=s.p;fs.writeFileSync(OUT+'.best',text(s));console.error(`restart=${re} step=${step} best=${best}`);}
 if(stale>1200){for(let q=0;q<5;q++){let j=rng.int(C),m=s.col[j],ins=mr[m],outs=[];for(let x=0;x<R;x++)if(!(m>>x&1))outs.push(x);apply(s,j,ins[rng.int(ins.length)],outs[rng.int(outs.length)]);}stale=0;}
 }
 if(!s.p){fs.writeFileSync(OUT,text(s));console.log(text(s));console.error('FOUND');process.exit(0);}re++;
}
console.error(`NO best=${best} restarts=${re} steps=${steps}`);process.exit(2);
