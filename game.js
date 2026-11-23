const crypto=require('node:crypto');
const bank=require('./words.json');
const dirs=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
const rand=n=>crypto.randomInt(n);
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=rand(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
function locate(grid,word){let paths=[];for(let r=0;r<10;r++)for(let c=0;c<10;c++)for(const [dr,dc] of dirs){let path=[];for(let k=0;k<word.length;k++){let y=r+dr*k,x=c+dc*k;if(grid[y]?.[x]!==word[k])break;path.push(y*10+x)}if(path.length===word.length)paths.push(path)}return paths}
// Keep each puzzle easy to read: no target-word overlaps, a balanced mix of lengths,
// and exactly one verified path for every target word. Store the actual placed path.
const pools=new Map(Array.from({length:7},(_,i)=>[i+4,bank.filter(w=>w.length===i+4)]));
function puzzle(){
  const lengths=[4,4,5,5,5,6,6,7,7,8+rand(3)];
  for(let attempt=0;attempt<250;attempt++){
    let grid=Array.from({length:10},()=>Array(10).fill(''));
    const targets=shuffle(lengths).map(n=>shuffle(pools.get(n))[0]);
    if(new Set(targets).size!==10)continue;
    const paths={};let ok=true;
    for(const word of [...targets].sort((a,b)=>b.length-a.length)){
      const placements=[];
      for(let r=0;r<10;r++)for(let c=0;c<10;c++)for(const [dr,dc] of dirs){
        const path=Array.from({length:word.length},(_,k)=>(r+dr*k)*10+c+dc*k);
        if(path.every((_,k)=>{const y=r+dr*k,x=c+dc*k;return y>=0&&y<10&&x>=0&&x<10&&!grid[y][x]}))placements.push(path);
      }
      if(!placements.length){ok=false;break}
      const path=placements[rand(placements.length)];
      path.forEach((i,k)=>grid[Math.floor(i/10)][i%10]=word[k]);
      paths[word]=[path];
    }
    if(!ok)continue;
    grid=grid.map(row=>row.map(x=>x||String.fromCharCode(65+rand(26))));
    // Reject boards where filler letters accidentally create a second location
    // for a target word. This also guarantees the reveal shows exactly one path.
    if(targets.some(w=>locate(grid,w).length!==1))continue;
    return {grid,words:targets,paths};
  }
  throw new Error('Unable to generate a verified puzzle');
}

function resolve(players){let alive=players.filter(p=>p.hp>0);let events=[];let totals=new Map(alive.map(p=>[p.id,0]));for(const p of alive)for(const [id,n] of Object.entries(p.plan.attacks)){if(n){totals.set(id,(totals.get(id)||0)+n);events.push({from:p.name,to:players.find(q=>q.id===id).name,damage:n})}}let results=alive.map(p=>{let incoming=totals.get(p.id),blocked=Math.min(incoming,p.plan.shield),damage=incoming-blocked; p.hp=Math.max(0,p.hp-damage);return {name:p.name,incoming,blocked,hp:p.hp}});return {events,results}}
function damagePower(streak,length=4){return (length-3)*2**Math.min(20,Math.max(0,streak-1))}
function guardAmounts(p,maxHp,power){let heal=Math.min(maxHp-p.hp,power),shield=Math.min(maxHp-p.shield,power-heal);return {heal,shield}}
function recover(p,maxHp,power){let {heal,shield}=guardAmounts(p,maxHp,power);p.hp+=heal;p.shield+=shield;return `guarded +${heal} HP, +${shield} shield`}
function resetMatch(r,players){r.players=players;r.match=(r.match||0)+1;r.round=0;r.last=null;r.elim=0;r.events=[];r.winners=[];r.maxHp=30+5*(players.length-2);for(const p of players)Object.assign(p,{hp:r.maxHp,shield:0,words:0,damage:0,best:0,streak:0,vote:false,pending:null,eliminated:0,forfeited:false});}
function standings(r){return [...r.scores.values()].sort((a,b)=>b.points-a.points||b.wins-a.wins||b.damage-a.damage||b.words-a.words||a.name.localeCompare(b.name))}
function recordClaim(r,p){for(const q of r.players)if(q!==p)q.streak=0;p.streak=r.last===p.id?p.streak+1:1;r.last=p.id;p.best=Math.max(p.best,p.streak)}
function resetBoard(r){r.round++;r.claimed=[];r.closing=false;for(const p of r.players){p.vote=false;p.pending=null}}
module.exports={guardAmounts,resetMatch,standings,bank,recover,recordClaim,resetBoard,damagePower,puzzle,locate,resolve,shuffle};
