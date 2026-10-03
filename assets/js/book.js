import { siteConfig as c } from "../../config/site.config.js";
import { BRANDS, REPAIRS, esc } from "./book-data.js";

const API = c.supabaseUrl + "/functions/v1/quick-handler";
const root = document.getElementById("bookPage");
const qs = new URLSearchParams(location.search);
let lead = {};
try { lead = JSON.parse(sessionStorage.getItem("md-lead")) || {}; sessionStorage.removeItem("md-lead"); } catch {}
const blank = () => ({ n: lead.n || "", p: lead.p || "", b: "", bt: "", m: "", r: [], x: "", a: "", when: "asap", lat: "", lng: "", loc: "", hp: "", pc: "", code: "" });
let S = blank();
const pb = lead.b || qs.get("brand"), pr = lead.r || qs.get("repair");
if (pb && Object.prototype.hasOwnProperty.call(BRANDS, pb)) S.b = pb;
if (pr && REPAIRS.some((x) => x[0] === pr)) S.r.push(pr);

const F = (l, i) => "<label>" + l + i + "</label>";
const inp = (k, x = "") => '<input name="' + k + '" value="' + esc(S[k]) + '" ' + x + ">";
const chip = (on, attr, t) => '<button type="button" class="chip' + (on ? " on" : "") + '" ' + attr + ">" + t + "</button>";
const pinOf = () => S.pc.trim();
const brandName = () => (S.b === "other" ? S.bt.trim() : BRANDS[S.b] || "");
const err = (m) => { const e = document.getElementById("err"); e.textContent = m; e.hidden = !m; };

function check() {
  const pin = pinOf();
  if (S.n.trim().length < 2) return "Please enter your name.";
  if (!/^[6-9][0-9]{9}$/.test(S.p)) return "Please enter a valid 10-digit mobile number.";
  if (brandName().length < 2) return "Please choose your phone brand.";
  if (!S.r.length) return "Please choose what needs fixing.";
  if (S.a.trim().length < 5) return "Please enter your address.";
  if (!/^[0-9]{6}$/.test(pin)) return "Please enter your 6-digit pincode.";
  if (!c.pincodePrefixes.some((x) => pin.startsWith(x))) return "We currently serve Lucknow only.";
  return "";
}
function render() {
  if (S.code) return done();
  const opts = Object.entries(BRANDS).map(([k, t]) => '<option value="' + k + '"' + (k === S.b ? " selected" : "") + ">" + t + "</option>").join("");
  const W = [["asap", "As soon as possible"], ["today", "Today"], ["tomorrow", "Tomorrow"]];
  root.innerHTML = '<section class="section"><div class="container bk"><div class="bkbar"><button type="button" class="bkb" data-back>&larr; Back</button><button type="button" class="bkb bkx" data-close aria-label="Close">&times;</button></div><div class="card"><h2>Book your repair</h2>'
    + F("Your name", inp("n", 'autocomplete="name" maxlength="60"')) + F("Mobile number", inp("p", 'inputmode="numeric" maxlength="10" autocomplete="tel"'))
    + F("Phone brand", '<select name="b"><option value="">Choose brand</option>' + opts + "</select>") + (S.b === "other" ? F("Brand name", inp("bt", 'maxlength="40"')) : "")
    + F("Phone model (optional)", inp("m", 'maxlength="40"')) + '<p class="lbl">What needs fixing?</p><div class="chips">' + REPAIRS.map(([k, t]) => chip(S.r.includes(k), 'data-r="' + k + '"', t)).join("") + "</div>"
    + F("Address", '<textarea name="a" rows="3" maxlength="300" placeholder="House or flat, street, area, landmark">' + esc(S.a) + "</textarea>") + F("Pincode", inp("pc", 'inputmode="numeric" maxlength="6" autocomplete="postal-code"'))
    + '<button type="button" class="btn btn-line" data-loc>Use my current location</button><p class="note">' + (S.loc || "Optional") + "</p>"
    + '<p class="lbl">When should we come? (optional)</p><div class="chips">' + W.map(([k, t]) => chip(S.when === k, 'data-when="' + k + '"', t)).join("") + "</div>"
    + '<input class="hp" name="hp" tabindex="-1" autocomplete="off" aria-hidden="true" value="">'
    + '<p class="note">We currently serve Lucknow only. By booking you agree to our <a href="terms.html">Terms</a> and <a href="privacy.html">Privacy Policy</a>.</p>'
    + '<p class="err" id="err" hidden></p><button type="button" class="btn btn-primary" data-submit style="width:100%">Book Now</button></div></div></section>';
}
const wa = () => ["Hello Mobile Doctor, I have booked a repair.", "Booking ID: " + S.code, "Name: " + S.n, "Phone: " + S.p, "Device: " + brandName() + (S.m ? " " + S.m : ""),
  "Issue: " + S.r.map((k) => REPAIRS.find((x) => x[0] === k)[1]).join(", "), "Address: " + S.a, S.lat ? "Location: https://www.google.com/maps?q=" + S.lat + "," + S.lng : ""].filter(Boolean).join("\n");
function done() {
  const url = "https://wa.me/" + c.whatsappE164 + "?text=" + encodeURIComponent(wa());
  root.innerHTML = '<section class="section"><div class="container bk"><div class="card fin"><span class="okc">&#10003;</span><h2>Thank you! Booking received</h2><p>Your booking ID <b>' + esc(S.code) + "</b></p>"
    + "<p>Tap below to send the details on WhatsApp. Our technician will call or message you shortly.</p>"
    + '<a class="btn btn-wa" href="' + url + '" target="_blank" rel="noopener">Send on WhatsApp</a><button type="button" class="edit" data-new>Book another repair</button></div></div></section>';
  return url;
}
async function submit(btn) {
  const m = check(); if (m) return err(m);
  btn.disabled = true; btn.textContent = "Booking..."; err("");
  const q = (k) => qs.get(k) || "";
  const ctl = new AbortController(), tm = setTimeout(() => ctl.abort(), 15000);
  try {
    const r = await fetch(API, { method: "POST", signal: ctl.signal, headers: { "Content-Type": "application/json", apikey: c.supabaseAnonKey }, body: JSON.stringify({
      name: S.n.trim(), phone: S.p, brand: brandName(), model: S.m.trim(), issues: S.r, note: S.x, address: S.a.trim(), pincode: pinOf(), lat: S.lat, lng: S.lng, when: S.when, hp: S.hp,
      source: { ad: q("ad"), utm_source: q("utm_source"), utm_medium: q("utm_medium"), utm_campaign: q("utm_campaign"), ref: document.referrer ? new URL(document.referrer).hostname : "" } }) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j.code) throw new Error(j.error || "Could not book. Please try again or call us.");
    S.code = j.code; const url = done(); scrollTo(0, 0); window.open(url, "_blank", "noopener");
  } catch (e) { err(e.name === "AbortError" ? "Slow network. Please try again." : e instanceof TypeError ? "No connection. Please try again or call us." : e.message); btn.disabled = false; btn.textContent = "Book Now"; }
  clearTimeout(tm);
}
async function gotPos(p) {
  const la = p.coords.latitude, lo = p.coords.longitude;
  if (la < 26.7 || la > 27.05 || lo < 80.75 || lo > 81.15) { S.loc = "Your location is outside Lucknow. We currently serve Lucknow only."; return render(); }
  S.lat = la.toFixed(5); S.lng = lo.toFixed(5); S.loc = "Location added. Finding your address..."; render();
  try {
    const r = await fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&zoom=18&lat=" + S.lat + "&lon=" + S.lng);
    const a = (await r.json()).address || {};
    if (!S.a.trim()) S.a = [a.road, a.neighbourhood || a.suburb, a.city_district || a.city].filter(Boolean).join(", ");
    const pc = (a.postcode || "").replace(/\s/g, "");
    if (!S.pc && /^[0-9]{6}$/.test(pc)) S.pc = pc;
    S.loc = "Location added. Please check the address and add your house number or landmark.";
  } catch { S.loc = "Location added. Please type your address and pincode."; }
  render();
}
root.addEventListener("input", (e) => { if (e.target.name) S[e.target.name] = e.target.value; });
root.addEventListener("change", (e) => { if (e.target.name === "b") render(); });
root.addEventListener("click", (e) => {
  const t = e.target.closest("button"); if (!t) return;
  const d = t.dataset;
  if (d.r) { S.r = S.r.includes(d.r) ? S.r.filter((x) => x !== d.r) : [...S.r, d.r]; render(); }
  else if (d.when) { S.when = d.when; render(); }
  else if (d.back !== undefined) { history.length > 1 ? history.back() : (location.href = "./"); }
  else if (d.close !== undefined) { location.href = "./"; }
  else if (d.new !== undefined) { S = blank(); render(); }
  else if (d.submit !== undefined) { submit(t); }
  else if (d.loc !== undefined) {
    if (!navigator.geolocation) { S.loc = "Location not available. Please type your address."; return render(); }
    navigator.geolocation.getCurrentPosition(gotPos,
      () => { S.loc = "Could not get location. Please type your address."; render(); }, { enableHighAccuracy: true, timeout: 10000 });
  }
});
render();
