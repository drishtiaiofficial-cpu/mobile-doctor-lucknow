import { siteConfig as c } from "../../config/site.config.js";

document.querySelector("[data-call]").href = "tel:" + c.phoneE164;
const m = document.getElementById("menu");
const n = document.getElementById("nav");
const close = () => { n.classList.remove("open"); m.setAttribute("aria-expanded", false); };
m.addEventListener("click", () => m.setAttribute("aria-expanded", n.classList.toggle("open")));
n.addEventListener("click", (e) => { if (e.target.tagName === "A") close(); });
