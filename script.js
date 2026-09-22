const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
window.addEventListener("load",()=>setTimeout(()=>$("#preloader").classList.add("hide"),450));
document.addEventListener("DOMContentLoaded",()=>{
$("#year").textContent=new Date().getFullYear();
const header=$("#header");addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>30),{passive:true});
$("#menuBtn").onclick=()=>$(".nav").classList.toggle("open");
$$("#nav a").forEach(a=>a.onclick=()=>$(".nav").classList.remove("open"));

const revealObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");revealObserver.unobserve(e.target)}}),{threshold:.1});
$$(".reveal").forEach(e=>revealObserver.observe(e));

const links=$$("#nav a"),ind=$(".indicator");
function moveIndicator(a){if(innerWidth<=900||!a)return;ind.style.width=a.offsetWidth+"px";ind.style.height=a.offsetHeight+"px";ind.style.transform=`translate(${a.offsetLeft}px,${a.offsetTop}px)`}
setTimeout(()=>moveIndicator($(".nav a.active")),300);
const sections=$$("main section[id]");
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const a=$(`#nav a[href="#${e.target.id}"]`);if(a){links.forEach(x=>x.classList.remove("active"));a.classList.add("active");moveIndicator(a)}}}),{rootMargin:"-40% 0px -45% 0px"});
sections.forEach(s=>spy.observe(s));addEventListener("resize",()=>moveIndicator($(".nav a.active")));

const cards=$$(".project-card");
cards.forEach(card=>card.addEventListener("click",()=>{
 cards.forEach(c=>c.classList.remove("active"));
 card.classList.add("active");
}));
let startX=0;
const accordion=$("#projectAccordion");
accordion.addEventListener("pointerdown",e=>{startX=e.clientX});
accordion.addEventListener("pointerup",e=>{
 const dx=e.clientX-startX;
 if(Math.abs(dx)<50)return;
 const active=cards.findIndex(c=>c.classList.contains("active"));
 const next=dx<0?Math.min(active+1,cards.length-1):Math.max(active-1,0);
 cards.forEach(c=>c.classList.remove("active"));cards[next].classList.add("active");
 cards[next].scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"});
});

const canvas=$("#particles"),ctx=canvas.getContext("2d");let p=[];
function resize(){
 canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;
 ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
 p=Array.from({length:innerWidth<700?35:90},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.15,vy:(Math.random()-.5)*.15,r:Math.random()+.2}));
}
function draw(){
 ctx.clearRect(0,0,innerWidth,innerHeight);
 p.forEach(a=>{a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>innerWidth)a.vx*=-1;if(a.y<0||a.y>innerHeight)a.vy*=-1;ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,Math.PI*2);ctx.fillStyle="rgba(170,180,205,.22)";ctx.fill()});
 requestAnimationFrame(draw);
}
resize();addEventListener("resize",resize);draw();

const visual=$(".visual");
addEventListener("mousemove",e=>{
 if(innerWidth<=900||!visual)return;
 const x=(e.clientX/innerWidth-.5)*-10,y=(e.clientY/innerHeight-.5)*-7;
 visual.style.transform=`translate(${x}px,${y-48}%)`;
});
});