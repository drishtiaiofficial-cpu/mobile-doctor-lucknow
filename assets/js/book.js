import { siteConfig as c } from "../../config/site.config.js";
import { BRANDS, REPAIRS } from "./book-data.js";
import { stepHtml, waText } from "./book-steps.js";

const root = document.getElementById("bookPage");
const KEY = "md-draft";
const blank = () => ({ step: 1, n: "", p: "", e: "", b: "", bt: "", m: "", r: [], x: "", h: "", st: "", lm: "", ar: "", pin: "", lat: "", lng: "", mode: "asap", date: "", slot: "", ok: false, web: "", code: "" });
const load = () => { try { return { ...blank(), ...JSON.parse(sessionStorage.getItem(KEY)) }; } catch { return blank(); } };
const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(S)); } catch {} };
let S = load();

const qs = new URLSearchParams(location.search);
if ((qs.get("brand") || qs.get("repair")) && S.code) S = blank();
let lead = null;
try { lead = JSON.parse(sessionStorage.getItem("md-lead")); sessionStorage.removeItem("md-lead"); } catch {}
const pb = lead?.b || qs.get("brand");
const pr = lead?.r || qs.get("repair");
if (lead) { S.n = S.n || lead.n || ""; S.p = S.p || lead.p || ""; }
if (pb && Object.prototype.hasOwnProperty.call(BRANDS, pb)) S.b = pb;
if (pr && REPAIRS.some((x) => x[0] === pr) && !S.r.includes(pr)) S.r.push(pr);

const err = (m) => { const e = document.getElementById("err"); e.textContent = m; e.hidden = !m; };
function check(n) {
  if (n === 1) return S.n.trim().length < 2 ? "Please enter your name." : !/^[6-9][0-9]{9}$/.test(S.p) ? "Please enter a valid 10-digit mobile number." : S.e && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(S.e) ? "Please enter a valid email or leave it empty." : "";
  if (n === 2) return !S.b ? "Please choose your phone brand." : S.b === "other" && S.bt.trim().length < 2 ? "Please write your brand name." : !S.r.length ? "Please choose what needs fixing." : S.r.includes("other") && S.x.trim().length < 3 ? "Please describe the problem." : "";
  if (n === 3) return S.h.trim().length < 1 ? "Please enter your house or flat number." : S.st.trim().length < 2 ? "Please enter your street or locality." : !S.ar ? "Please choose your area." : !/^[0-9]{6}$/.test(S.pin) || !c.pincodePrefixes.some((p) => S.pin.startsWith(p)) ? "We currently serve Lucknow only. Please check your pincode." : "";
  if (n === 4) return S.mode === "slot" && (!S.date || !S.slot) ? "Please choose a day and a time, or pick As soon as possible." : "";
  return !S.ok ? "Please accept the Terms and Privacy Policy to continue." : S.web ? "Something went wrong. Please try again." : "";
}
function render() {
  if (S.code) return done();
  const dots = [1, 2, 3, 4, 5].map((i) => '<i class="' + (i < S.step ? "ok" : i === S.step ? "now" : "") + '"></i>').join("");
  root.innerHTML = '<section class="section"><div class="container bk"><p class="stp">Step ' + S.step + " of 5</p><div class=\"dots\">" + dots + "</div>"
    + '<div class="card">' + stepHtml(S.step, S) + '<p class="err" id="err" hidden></p></div><div class="nav2">'
    + (S.step > 1 ? '<button type="button" class="btn btn-line" data-back>Back</button>' : "<span></span>")
    + '<button type="button" class="btn btn-primary" data-next>' + (S.step === 5 ? "Request repair" : "Continue") + "</button></div></div></section>";
  save();
}
function done() {
  const url = "https://wa.me/" + c.whatsappE164 + "?text=" + encodeURIComponent(waText(S, S.code));
  root.innerHTML = '<section class="section"><div class="container bk"><div class="card fin"><span class="okc">&#10003;</span><h2>Your request is ready</h2><p>Request ID <b>' + S.code + "</b></p>"
    + "<p>Tap the button to send it on WhatsApp. Your visit is confirmed only after our technician replies.</p>"
    + '<a class="btn btn-wa" href="' + url + '" target="_blank" rel="noopener">Send on WhatsApp</a><button type="button" class="edit" data-new>Start a new request</button></div></div></section>';
  return url;
}
root.addEventListener("input", (e) => { const t = e.target; if (t.name) { S[t.name] = t.type === "checkbox" ? t.checked : t.value; save(); } });
root.addEventListener("change", (e) => {
  const t = e.target;
  if (t.type === "checkbox" && t.name) { S[t.name] = t.checked; save(); }
  else if (t.name === "b") render();
});
root.addEventListener("click", (e) => {
  const t = e.target.closest("button"); if (!t) return;
  if (t.dataset.r) { S.r = S.r.includes(t.dataset.r) ? S.r.filter((x) => x !== t.dataset.r) : [...S.r, t.dataset.r]; render(); }
  else if (t.dataset.mode) { S.mode = t.dataset.mode; render(); }
  else if (t.dataset.day) { S.date = t.dataset.day; S.slot = ""; render(); }
  else if (t.dataset.slot) { S.slot = t.dataset.slot; render(); }
  else if (t.dataset.edit) { S.step = Number(t.dataset.edit); render(); }
  else if (t.dataset.new !== undefined) { S = blank(); render(); }
  else if (t.dataset.back !== undefined) { S.step--; render(); }
  else if (t.id === "locBtn") {
    const m = document.getElementById("locMsg");
    if (!navigator.geolocation) { m.textContent = "Location is not available. Please type your address."; return; }
    m.textContent = "Getting your location...";
    navigator.geolocation.getCurrentPosition((p) => { S.lat = p.coords.latitude.toFixed(5); S.lng = p.coords.longitude.toFixed(5); save(); m.textContent = "Location added. Please also check the address below."; },
      () => { m.textContent = "Could not get your location. Please type your address."; }, { enableHighAccuracy: true, timeout: 10000 });
  } else if (t.dataset.next !== undefined) {
    const m = check(S.step); if (m) return err(m);
    if (S.step < 5) { S.step++; render(); scrollTo(0, 0); return; }
    S.code = "MD-" + Date.now().toString(36).toUpperCase().slice(-5);
    const url = done(); save(); scrollTo(0, 0); location.href = url;
  }
});
render();
