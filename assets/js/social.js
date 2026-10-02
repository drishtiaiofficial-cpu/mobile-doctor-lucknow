import { siteConfig as c } from "../../config/site.config.js";
const I = {
  instagram: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  facebook: '<svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z" fill="currentColor"/></svg>',
};
const N = { instagram: "Instagram", facebook: "Facebook", youtube: "YouTube" };
const box = document.getElementById("soc");
if (box) box.innerHTML = Object.keys(N).filter((k) => c.social[k]).map((k) => '<a href="' + c.social[k] + '" target="_blank" rel="noopener" aria-label="' + N[k] + '">' + I[k] + "</a>").join("");
const m = document.getElementById("mailLink");
if (m && c.contactEmail) { m.href = "mailto:" + c.contactEmail; m.textContent = c.contactEmail; m.hidden = false; }
