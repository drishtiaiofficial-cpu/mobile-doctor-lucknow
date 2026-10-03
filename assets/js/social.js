import { siteConfig as c } from "../../config/site.config.js";
const IC = {
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/>',
  youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/>',
};
const web = (u) => (/^https:\/\//.test(u || "") ? u : "");
const mail = c.contactEmail && /^[^\s@]+@[^\s@]+$/.test(c.contactEmail) ? c.contactEmail : "";
const L = [["instagram", "Instagram", web(c.social.instagram)], ["facebook", "Facebook", web(c.social.facebook)], ["youtube", "YouTube", web(c.social.youtube)], ["email", "Email", mail ? "mailto:" + mail : ""]];
document.querySelectorAll("[data-social]").forEach((box) => {
  box.innerHTML = L.filter((x) => x[2]).map(([k, n, h]) => '<a href="' + h + '"' + (k === "email" ? "" : ' target="_blank" rel="noopener"') + ' aria-label="' + n + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + IC[k] + "</svg></a>").join("");
  box.hidden = !box.innerHTML;
});
document.querySelectorAll("[data-mail]").forEach((a) => {
  if (!mail) { a.hidden = true; return; }
  a.href = "mailto:" + mail;
  (a.querySelector("span") || a).textContent = mail;
});
