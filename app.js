
const vals=[2,4,6,8,10];let sel=6;
const c=document.getElementById('choices');
function ui(){c.innerHTML='';vals.forEach(v=>{let b=document.createElement('button');b.className='pick';b.textContent=v;if(v===sel)b.style.background='#4af';b.onclick=()=>{sel=v;ui()};c.appendChild(b)})}
function sh(a){for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function assign(n){let o=[],e=[];for(let i=1;i<=n;i++)(i%2?o:e).push(i);sh(o);sh(e);let A=[],B=[];while(o.length)(A.filter(x=>x%2).length<=B.filter(x=>x%2).length?A:B).push(o.pop());while(e.length)(A.filter(x=>x%2==0).length<=B.filter(x=>x%2==0).length?A:B).push(e.pop());sh(A);sh(B);return[A,B]}
function show(id,a){document.getElementById(id).innerHTML=a.map(x=>`<span>${x}</span>`).join('');document.getElementById(id+'Stats').textContent=`G:${a.filter(x=>x%2==0).length} U:${a.filter(x=>x%2).length}`}
draw.onclick=()=>{let[a,b]=assign(sel);show('cmd',a);show('fo',b)}
ui();
