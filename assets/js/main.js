import { siteConfig as c } from "../../config/site.config.js";

document.querySelectorAll("[data-call]").forEach((a) => { a.href = "tel:" + c.phoneE164; });
const m = document.getElementById("menu");
const n = document.getElementById("nav");
const close = () => { n.classList.remove("open"); m.setAttribute("aria-expanded", false); };
m.addEventListener("click", () => m.setAttribute("aria-expanded", n.classList.toggle("open")));
n.addEventListener("click", (e) => { if (e.target.tagName === "A") close(); });

const dlg = document.getElementById("logoDlg");
document.getElementById("logoBtn").addEventListener("click", () => dlg.showModal());
dlg.addEventListener("click", () => dlg.close());

import "./hero.js";

import "./float.js";

import "./ui.js";

import "./home-book.js";
