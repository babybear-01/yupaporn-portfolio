const preloader = document.getElementById("preloader");
const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");
const menuBtn = document.getElementById("menuBtn");
const typewriter = document.getElementById("typewriter");

window.addEventListener("load", () => {
  setTimeout(() => preloader.classList.add("hidden"), 500);
});

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Typewriter
const phrases = [
  "Machine Learning Enthusiast",
  "NLP & Computer Vision Builder",
  "AI Application Developer",
  "Time-Series Forecasting Learner"
];
let phraseIndex = 0, charIndex = 0, deleting = false;

function typeEffect() {
  const phrase = phrases[phraseIndex];
  typewriter.textContent = deleting
    ? phrase.slice(0, charIndex--)
    : phrase.slice(0, charIndex++);

  let delay = deleting ? 45 : 85;

  if (!deleting && charIndex > phrase.length) {
    deleting = true;
    delay = 1700;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    charIndex = 0;
    delay = 500;
  }
  setTimeout(typeEffect, delay);
}
typeEffect();

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Active nav
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const top = section.offsetTop - 140;
    if (window.scrollY >= top) current = section.id;
  });
  links.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}, { passive: true });

// Particle background
const canvas = document.getElementById("dotCanvas");
const ctx = canvas.getContext("2d");
let dots = [];

function resizeCanvas() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

  const count = Math.min(85, Math.floor(window.innerWidth / 16));
  dots = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.3 + .4,
    vx: (Math.random() - .5) * .18,
    vy: (Math.random() - .5) * .18
  }));
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function drawDots() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  dots.forEach((d, i) => {
    d.x += d.vx; d.y += d.vy;
    if (d.x < 0 || d.x > window.innerWidth) d.vx *= -1;
    if (d.y < 0 || d.y > window.innerHeight) d.vy *= -1;

    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(155,168,171,.35)";
    ctx.fill();

    for (let j = i + 1; j < dots.length; j++) {
      const e = dots[j];
      const dx = d.x - e.x, dy = d.y - e.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 105) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(e.x, e.y);
        ctx.strokeStyle = `rgba(74,92,106,${0.12 * (1 - dist / 105)})`;
        ctx.lineWidth = .6;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(drawDots);
}
drawDots();
