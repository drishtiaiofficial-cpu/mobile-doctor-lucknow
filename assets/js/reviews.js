import { siteConfig as c } from "../../config/site.config.js";
import { esc } from "./book-data.js";
const root = document.getElementById("reviews");
if (root) {
  const $ = (id) => document.getElementById(id), KEY = "md-my-reviews", H = { apikey: c.supabaseAnonKey };
  const f = $("rvForm"), stars = $("rvStars");
  let rating = 0, pub = [];
  const getMine = () => { try { const a = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(a) ? a : []; } catch { return []; } };
  const setMine = (a) => { try { localStorage.setItem(KEY, JSON.stringify(a.slice(0, 5))); } catch {} };
  const st = (n) => "\u2605".repeat(n) + "\u2606".repeat(5 - n);
  const card = (r, tag) => '<div class="rv-card"><span class="rv-st" aria-label="' + r.rating + ' out of 5">' + st(r.rating) + "</span><q>" + esc(r.comment) + '</q><div class="rv-by"><span class="rv-av">' + esc((r.display_name || "?").trim().charAt(0).toUpperCase()) + "</span><div><b>" + esc(r.display_name) + "</b>" + tag + "</div></div></div>";
  function paint() {
    const mine = getMine().filter((m) => !pub.some((p) => p.comment === m.comment && p.display_name === m.display_name));
    setMine(mine);
    $("rvList").innerHTML = mine.map((m) => card(m, '<small class="rv-pend">Pending approval, visible only to you</small>')).join("")
      + pub.slice(0, 12).map((r) => card(r, r.verified ? '<small class="rv-ver">&#10003; Verified customer</small>' : "")).join("");
    $("rvList").hidden = !(mine.length || pub.length);
    $("rvEmpty").hidden = !!(mine.length || pub.length);
    const a = $("rvAvg");
    if (pub.length) { const avg = pub.reduce((s, r) => s + r.rating, 0) / pub.length; a.innerHTML = "<b>" + avg.toFixed(1) + "</b> <i>" + st(Math.round(avg)) + "</i> &middot; " + pub.length + (pub.length === 1 ? " review" : " reviews"); a.hidden = false; } else a.hidden = true;
  }
  async function load() {
    try {
      const r = await fetch(c.supabaseUrl + "/rest/v1/reviews?select=rating,comment,display_name,verified&order=created_at.desc&limit=100", { headers: H });
      const j = r.ok ? await r.json() : [];
      pub = Array.isArray(j) ? j.filter((x) => x && x.rating >= 1 && x.rating <= 5) : [];
    } catch { pub = []; }
    paint();
  }
  const g = /^https:\/\//.test(c.social.googleReview || "") ? c.social.googleReview : "";
  if (g) { $("rvG").href = g; $("rvG").hidden = false; }
  $("rvOpen").addEventListener("click", () => { f.hidden = !f.hidden; if (!f.hidden) f.scrollIntoView({ behavior: "smooth", block: "center" }); });
  stars.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    rating = +b.dataset.s;
    stars.querySelectorAll("button").forEach((x) => x.classList.toggle("on", +x.dataset.s <= rating));
  });
  f.addEventListener("submit", async (e) => {
    e.preventDefault();
    const v = (k) => f.elements[k].value.trim(), box = $("rvErr"), btn = f.querySelector("button[type=submit]");
    const m = !rating ? "Please choose a star rating." : v("n").length < 2 ? "Please enter your name." : v("c").length < 5 ? "Please write a short review." : "";
    box.hidden = !m; box.textContent = m;
    if (m) return;
    btn.disabled = true; btn.textContent = "Sending...";
    try {
      const r = await fetch(c.supabaseUrl + "/rest/v1/rpc/submit_review", { method: "POST", headers: { ...H, "Content-Type": "application/json" }, body: JSON.stringify({ p_rating: rating, p_comment: v("c"), p_name: v("n"), p_code: v("code"), p_phone: v("ph"), p_hp: v("hp") }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.error || !j.ok) throw new Error(j.error || "We could not send your review right now. Please try again later.");
      setMine([{ rating, comment: v("c"), display_name: v("n") }, ...getMine()]);
      f.reset(); rating = 0; stars.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
      f.hidden = true; $("rvOk").hidden = false; paint();
    } catch (er) { box.hidden = false; box.textContent = er.message; }
    btn.disabled = false; btn.textContent = "Submit review";
  });
  load();
}
