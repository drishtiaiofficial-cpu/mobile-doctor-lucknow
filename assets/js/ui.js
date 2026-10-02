import { siteConfig as c } from "../../config/site.config.js";

history.replaceState(null, "", location.pathname + location.search);
const toTop = () => scrollTo(0, 0);
toTop();
addEventListener("load", toTop);
addEventListener("pageshow", toTop);

const bar = document.getElementById("prog");
addEventListener("scroll", () => {
  const h = document.documentElement;
  bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100 + "%";
}, { passive: true });

const io = new IntersectionObserver((list) => list.forEach((e) => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in");
  io.unobserve(e.target);
  setTimeout(() => { e.target.classList.remove("rv", "in"); e.target.style.transitionDelay = ""; }, 1100);
}), { threshold: 0.12 });

document.querySelectorAll(".section h2,.lead,.svc,.brand-tile,.badges li,.steps li,.about-col,.faq details,.contact-card,.qb").forEach((el, i) => {
  el.classList.add("rv");
  el.style.transitionDelay = (i % 4) * 70 + "ms";
  io.observe(el);
});

document.querySelectorAll("[data-phone]").forEach((e) => { e.textContent = c.phoneDisplay; });
