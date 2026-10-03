const els = document.querySelectorAll(".stat i[data-to]");
if (els.length && !matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  const run = (el) => {
    const to = +el.dataset.to, t0 = performance.now();
    const tick = (t) => { const k = Math.min(1, (t - t0) / 1800); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: 0.5 });
  els.forEach((el) => { el.textContent = "0"; io.observe(el); });
}
