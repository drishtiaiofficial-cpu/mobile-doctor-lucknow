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

const qb = document.getElementById("qb");
qb.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(qb);
  const err = document.getElementById("qbErr");
  const msg = f.get("n").trim().length < 2 ? "Please enter your name."
    : !/^[6-9][0-9]{9}$/.test(f.get("p")) ? "Please enter a valid 10-digit mobile number."
    : !f.get("b") ? "Please choose your phone brand." : "";
  err.hidden = !msg;
  err.textContent = msg;
  if (msg) return;
  try { sessionStorage.setItem("md-lead", JSON.stringify({ n: f.get("n").trim(), p: f.get("p") })); } catch {}
  location.href = "book.html?brand=" + f.get("b") + (f.get("r") ? "&repair=" + f.get("r") : "");
});
document.getElementById("yr").textContent = "\u00a9 " + new Date().getFullYear() + " Mobile Doctor Lucknow";
