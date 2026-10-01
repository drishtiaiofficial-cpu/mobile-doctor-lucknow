import { siteConfig as c } from "../../config/site.config.js";

document.title = c.brandName;
document.querySelector('[data-brand="name"]').textContent = c.brandName;
document.querySelector('[data-brand="tagline"]').textContent = c.tagline.en;
document.querySelector('[data-call]').href = "tel:" + c.phoneE164;

const t = document.getElementById("ticker");
t.innerHTML += t.innerHTML;

const m = document.getElementById("menu");
const n = document.getElementById("nav");
m.addEventListener("click", () => {
  const open = n.classList.toggle("open");
  m.setAttribute("aria-expanded", open);
});
