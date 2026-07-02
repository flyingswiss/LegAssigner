
const choices=[2,4,6,8,10];
let selected=2;

const bar=document.getElementById("choiceBar");
const drawBtn=document.querySelector(".primary");

function initChoices(){
  const buttons=bar.querySelectorAll(".choice");
  buttons.forEach(btn=>{
    btn.onclick=()=>{
      buttons.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      selected=parseInt(btn.textContent,10);
    };
  });
}
function shuffle(a){
  const arr=[...a];
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

function assignTeams(n){
  const odds=[],evens=[];
  for(let i=1;i<=n;i++){
    (i%2?odds:evens).push(i);
  }
  let o=shuffle(odds);
  let e=shuffle(evens);

  const half=n/2;
  const cmd=[],fo=[];

  // Teamgröße hat absolute Priorität
  while(cmd.length<half && (o.length||e.length)){
    const needOdd=cmd.filter(x=>x%2).length<=cmd.filter(x=>x%2===0).length;
    if(needOdd && o.length) cmd.push(o.pop());
    else if(e.length) cmd.push(e.pop());
    else cmd.push((o.length?o:e).pop());
  }
  while(fo.length<half && (o.length||e.length)){
    const needOdd=fo.filter(x=>x%2).length<=fo.filter(x=>x%2===0).length;
    if(needOdd && o.length) fo.push(o.pop());
    else if(e.length) fo.push(e.pop());
    else fo.push((o.length?o:e).pop());
  }

  return {cmd:shuffle(cmd),fo:shuffle(fo)};
}

function render(team,id){
  const box=document.querySelector("#"+id+" .numbers")||document.querySelector("."+id+" .numbers");
}

function updateCard(selector,list){
  const card=document.querySelector(selector);
  card.querySelector(".numbers").innerHTML=list.map(n=>`<span class="chip">${n}</span>`).join("");
  const even=list.filter(x=>x%2===0).length;
  const odd=list.length-even;
  card.querySelector(".stats").innerHTML=
  `<div>Gerade <span>${even}</span></div>
   <div>Ungerade <span>${odd}</span></div>
   <div>Gesamt <span>${list.length}</span></div>`;
}

drawBtn.onclick=()=>{
  const res=assignTeams(selected);
  updateCard(".cmd",res.cmd);
  updateCard(".fo",res.fo);
};

initChoices();
