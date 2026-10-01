import { siteConfig as c } from "../../config/site.config.js";

document.title = c.brandName;
document.querySelector('[data-brand="name"]').textContent = c.brandName;
document.querySelector('[data-call]').href = "tel:" + c.phoneE164;


const m = document.getElementById("menu");
const n = document.getElementById("nav");
m.addEventListener("click", () => {
  const open = n.classList.toggle("open");
  m.setAttribute("aria-expanded", open);
});

const grid = document.getElementById("brandGrid");
fetch("assets/data/brands.json")
  .then((r) => r.json())
  .then((list) => {
    list.forEach((b) => {
      const a = document.createElement("a");
      a.className = "brand-tile";
      a.href = "brand.html?b=" + encodeURIComponent(b.slug);
      a.textContent = b.name;
      grid.appendChild(a);
    });
  });
