const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

window.addEventListener("load", () => {
  setTimeout(() => $("#preloader")?.classList.add("hide"), 500);
});

const phrases = [
  "AI/ML Engineer Intern",
  "Machine Learning",
  "NLP & Computer Vision",
  "AI Application Builder"
];

let phraseIndex = 0, charIndex = 0, deleting = false;
const typewriter = $("#typewriter");

function typeLoop(){
  if(!typewriter) return;
  const phrase = phrases[phraseIndex];
  typewriter.textContent = deleting ? phrase.slice(0, charIndex--) : phrase.slice(0, charIndex++);
  let speed = deleting ? 45 : 75;

  if(!deleting && charIndex > phrase.length){
    deleting = true; speed = 1500;
  } else if(deleting && charIndex < 0){
    deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; charIndex = 0; speed = 350;
  }
  setTimeout(typeLoop, speed);
}
typeLoop();

const navbar = $("#navbar");
window.addEventListener("scroll", () => {
  navbar?.classList.toggle("scrolled", window.scrollY > 30);
});

const menuToggle = $("#menuToggle");
const navMenu = $("#navMenu");
menuToggle?.addEventListener("click", () => navMenu?.classList.toggle("open"));
$$(".nav-link, .nav-connect").forEach(link => {
  link.addEventListener("click", () => navMenu?.classList.remove("open"));
});

const sections = $$("main section[id]");
const navLinks = $$(".nav-link");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, {rootMargin:"-40% 0px -50% 0px"});
sections.forEach(section => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
$$(".reveal").forEach(el => revealObserver.observe(el));

$("#year").textContent = new Date().getFullYear();

/* Lightweight animated background — no external JS library required. */
const canvas = $("#particles");
const ctx = canvas?.getContext("2d");
let particles = [];

function resizeCanvas(){
  if(!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = Array.from({length: Math.min(70, Math.floor(window.innerWidth/18))}, () => ({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*1.5 + .3,
    vx: (Math.random()-.5)*.22,
    vy: (Math.random()-.5)*.22
  }));
}
function drawParticles(){
  if(!ctx) return;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "rgba(150,145,255,.55)";
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>canvas.width)p.vx*=-1;
    if(p.y<0||p.y>canvas.height)p.vy*=-1;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
resizeCanvas();
drawParticles();
window.addEventListener("resize", resizeCanvas);

/* Prevent placeholder project links from jumping to the top. */
$$(".disabled-link").forEach(a => a.addEventListener("click", e => e.preventDefault()));
