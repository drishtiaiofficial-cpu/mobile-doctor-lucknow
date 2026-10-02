import { siteConfig as c } from "../../config/site.config.js";

const pop = document.getElementById("waPop");
const text = encodeURIComponent("Hello Mobile Doctor, I need a phone repair in Lucknow.");
document.querySelectorAll("[data-wa]").forEach((a) => { a.href = "https://wa.me/" + c.whatsappE164 + "?text=" + text; });
const seen = () => { try { return sessionStorage.getItem("wa-pop"); } catch { return null; } };
const mark = () => { try { sessionStorage.setItem("wa-pop", "1"); } catch {} };
const hide = () => { pop.hidden = true; mark(); };
document.getElementById("waFab").addEventListener("click", () => { pop.hidden ? (pop.hidden = false) : hide(); });
pop.querySelector(".wa-x").addEventListener("click", hide);
if (!seen()) setTimeout(() => { if (pop.hidden) { pop.hidden = false; mark(); } }, 4000);
