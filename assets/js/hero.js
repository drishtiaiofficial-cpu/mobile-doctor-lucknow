const slides = [
  { t: "Doorstep Mobile Repair in Lucknow", p: "Our technician comes to your home or office.", a: "plus" },
  { t: "Screen Replacement at Your Home", p: "Cracked or dead display? Book a visit today.", a: "crack" },
  { t: "Battery & Charging Port Repair", p: "Battery draining fast or not charging? We can check it.", a: "bolt" },
  { t: "Book Online in a Few Taps", p: "Pick your brand, your issue and a time slot.", a: "pin" },
];
const G = {
  plus: '<path d="M100 95v60M70 125h60" stroke="#C9A227" stroke-width="12" stroke-linecap="round"/>',
  crack: '<path d="M100 40l-10 50 24 20-30 40 16 40M90 90l-34 14M114 110l28-10" stroke="#C9A227" stroke-width="4" fill="none" stroke-linecap="round"/>',
  bolt: '<path d="M108 52L76 134h22l-8 60 40-84h-24z" fill="#C9A227"/>',
  pin: '<path d="M100 170c-26-30-34-48-34-62a34 34 0 0 1 68 0c0 14-8 32-34 62z" fill="#C9A227"/><circle cx="100" cy="108" r="12" fill="#14171F"/>',
};
const art = (g) => `<svg viewBox="0 0 200 260" aria-hidden="true"><rect x="40" y="10" width="120" height="240" rx="22" fill="#fff" fill-opacity=".08" stroke="#fff" stroke-width="4"/><rect x="52" y="30" width="96" height="190" rx="10" fill="#fff" fill-opacity=".12"/>${g}</svg>`;
const root = document.getElementById("hero");
const slide = (s, n) => `<div class="hero-slide"><div class="hero-copy"><${n ? "h2" : "h1"}>${s.t}</${n ? "h2" : "h1"}><p>${s.p}</p><a class="btn btn-gold" href="book.html">Book Now</a></div><div class="hero-art">${art(G[s.a])}</div></div>`;
root.innerHTML = `<div class="hero-track">${slides.map(slide).join("")}</div>
<button class="hero-nav prev" aria-label="Previous">&#8249;</button><button class="hero-nav next" aria-label="Next">&#8250;</button>
<div class="hero-dots">${slides.map(() => "<button aria-label='Slide'></button>").join("")}</div>`;
let i = 0, timer, x0 = 0;
const track = root.querySelector(".hero-track");
const dots = [...root.querySelectorAll(".hero-dots button")];
function go(n) {
  i = (n + slides.length) % slides.length;
  track.style.transform = `translateX(-${i * 100}%)`;
  dots.forEach((d, k) => d.classList.toggle("on", k === i));
}
function play() {
  clearInterval(timer);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  timer = setInterval(() => go(i + 1), 4500);
}
dots.forEach((d, k) => d.addEventListener("click", () => { go(k); play(); }));
root.querySelector(".prev").onclick = () => { go(i - 1); play(); };
root.querySelector(".next").onclick = () => { go(i + 1); play(); };
root.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
root.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - x0;
  if (Math.abs(dx) > 40) { go(i + (dx < 0 ? 1 : -1)); play(); }
});
go(0); play();
