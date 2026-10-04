import { siteConfig as c } from "../../config/site.config.js";
import { esc } from "./book-data.js";
const root = document.getElementById("reviews");
if (root) {
  const $ = (id) => document.getElementById(id), KEY = "md-my-reviews", H = { apikey: c.supabaseAnonKey };
  const f = $("rvForm"), stars = $("rvStars"), list = $("rvList"), dots = $("rvDots");
  let rating = 0, pub = [];
  const getMine = () => { try { const a = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(a) ? a : []; } catch { return []; } };
  const setMine = (a) => { try { localStorage.setItem(KEY, JSON.stringify(a.slice(0, 8))); } catch {} };
  const rpc = (fn, body) => fetch(c.supabaseUrl + "/rest/v1/rpc/" + fn, { method: "POST", headers: { ...H, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (h) => { const r = (Math.random() * 16) | 0; return (h === "x" ? r : (r & 3) | 8).toString(16); }));
  const st = (n) => "\u2605".repeat(n) + "\u2606".repeat(5 - n);
  const msg = (t, bad) => { const m = $("rvOk"); m.textContent = t; m.classList.toggle("bad", !!bad); m.hidden = !t; };
  const card = (r, tag, del) => '<div class="rv-card"><span class="rv-st" aria-label="' + r.rating + ' out of 5">' + st(r.rating) + "</span><q>" + esc(r.comment) + '</q><div class="rv-by"><span class="rv-av">' + esc((r.display_name || "?").trim().charAt(0).toUpperCase()) + "</span><div><b>" + esc(r.display_name) + "</b>" + tag + "</div></div>" + (del ? '<button type="button" class="rv-del" data-del="' + esc(del) + '">Delete my review</button>' : "") + "</div>";
  function paint() {
    const now = Date.now(), inPub = (m) => pub.some((p) => (m.id ? p.id === m.id : p.comment === m.comment && p.display_name === m.display_name));
    const mineAll = getMine().filter((m) => (m.id && inPub(m) ? true : !inPub(m) && now - (m.t || now) < 14 * 864e5) || (m.id && now - (m.t || now) < 180 * 864e5 && inPub(m)));
    setMine(mineAll);
    const mine = mineAll.filter((m) => !inPub(m)), ids = new Set(mineAll.filter((m) => m.id).map((m) => m.id));
    list.innerHTML = mine.map((m) => card(m, '<small class="rv-pend">Pending approval, visible only to you</small>', m.id)).join("")
      + pub.slice(0, 12).map((r) => card(r, r.verified ? '<small class="rv-ver">&#10003; Verified customer</small>' : "", ids.has(r.id) ? r.id : "")).join("");
    const any = mine.length || pub.length;
    list.hidden = !any; $("rvEmpty").hidden = !!any;
    const a = $("rvAvg");
    if (pub.length) { const avg = pub.reduce((s, r) => s + r.rating, 0) / pub.length; a.innerHTML = "<b>" + avg.toFixed(1) + "</b> <i>" + st(Math.round(avg)) + "</i> &middot; " + pub.length + (pub.length === 1 ? " review" : " reviews"); a.hidden = false; } else a.hidden = true;
    requestAnimationFrame(() => {
      list.querySelectorAll(".rv-card").forEach((cd) => { const q = cd.querySelector("q"); if (q.scrollHeight > q.clientHeight + 1) { const b = document.createElement("button"); b.type = "button"; b.className = "rv-more"; b.textContent = "Read more"; q.after(b); } });
      const n = list.children.length;
      dots.innerHTML = n > 1 && list.scrollWidth > list.clientWidth + 2 ? Array.from({ length: n }, (_, i) => "<i" + (i ? "" : ' class="on"') + "></i>").join("") : "";
    });
  }
  list.addEventListener("scroll", () => { const k = list.children[0]; if (!k) return; const i = Math.round(list.scrollLeft / (k.offsetWidth + 14)); [...dots.children].forEach((d, j) => d.classList.toggle("on", j === i)); }, { passive: true });
  list.addEventListener("click", async (e) => {
    const m = e.target.closest(".rv-more");
    if (m) { const cd = m.closest(".rv-card"); m.textContent = cd.classList.toggle("open") ? "Show less" : "Read more"; return; }
    const d = e.target.closest("[data-del]"); if (!d) return;
    const id = d.dataset.del, mine = getMine().find((x) => x.id === id);
    if (!mine || !confirm("Delete your review?")) return;
    d.disabled = true;
    try {
      const r = await rpc("delete_my_review", { p_id: id, p_token: mine.token }), j = await r.json().catch(() => ({}));
      if (!r.ok || !j.ok) throw new Error(j.error || "Could not delete right now. Please try again.");
      setMine(getMine().filter((x) => x.id !== id)); pub = pub.filter((x) => x.id !== id);
      msg("Your review has been deleted."); paint();
    } catch (er) { d.disabled = false; msg(er.message, true); }
  });
  async function load() {
    try {
      const r = await fetch(c.supabaseUrl + "/rest/v1/reviews?select=id,rating,comment,display_name,verified&order=created_at.desc&limit=100", { headers: H });
      const j = r.ok ? await r.json() : [];
      pub = Array.isArray(j) ? j.filter((x) => x && x.rating >= 1 && x.rating <= 5) : [];
    } catch { pub = []; }
    paint();
  }
  const g = /^https:\/\//.test(c.social.googleReview || "") ? c.social.googleReview : "";
  if (g) { $("rvG").href = g; $("rvG").hidden = false; }
  const close = () => { f.hidden = true; $("rvErr").hidden = true; };
  $("rvOpen").addEventListener("click", () => { msg(""); f.hidden = !f.hidden; if (!f.hidden) f.scrollIntoView({ behavior: "smooth", block: "center" }); });
  $("rvX").addEventListener("click", close); $("rvCancel").addEventListener("click", close);
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
    const token = uuid();
    try {
      const r = await rpc("submit_review", { p_rating: rating, p_comment: v("c"), p_name: v("n"), p_code: v("code"), p_phone: v("ph"), p_hp: v("hp"), p_token: token });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.error || !j.ok) throw new Error(j.error || "We could not send your review right now. Please try again later.");
      if (j.id) setMine([{ id: j.id, token, rating, comment: v("c"), display_name: v("n"), t: Date.now() }, ...getMine()]);
      f.reset(); rating = 0; stars.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
      f.hidden = true; msg("Thank you! Your review is saved and will appear publicly after our team approves it."); paint();
    } catch (er) { box.hidden = false; box.textContent = er.message; }
    btn.disabled = false; btn.textContent = "Submit review";
  });
  load();
}
