const hero = document.getElementById("hero");
if (hero) {
  const track = hero.querySelector(".hero-track");
  const slides = [...track.children];
  const box = hero.querySelector(".hero-dots");
  let i = 0, t, x0 = 0;
  const dots = slides.map((_, k) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", "Slide " + (k + 1));
    b.onclick = () => { go(k); play(); };
    box.appendChild(b);
    return b;
  });
  function go(n) {
    i = (n + slides.length) % slides.length;
    track.style.transform = "translateX(-" + i * 100 + "%)";
    dots.forEach((d, k) => d.classList.toggle("on", k === i));
  }
  function play() {
    clearInterval(t);
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) t = setInterval(() => go(i + 1), 5000);
  }
  hero.querySelector(".prev").onclick = () => { go(i - 1); play(); };
  hero.querySelector(".next").onclick = () => { go(i + 1); play(); };
  hero.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener("touchend", (e) => {
    const d = e.changedTouches[0].clientX - x0;
    if (Math.abs(d) > 40) { go(i + (d < 0 ? 1 : -1)); play(); }
  });
  hero.addEventListener("mouseenter", () => clearInterval(t));
  hero.addEventListener("mouseleave", play);
  go(0); play();
}
