import { BRANDS, REPAIRS, AREAS, SLOTS, esc, days, slotOk, dayLabel } from "./book-data.js";

const F = (label, inner) => "<label>" + label + inner + "</label>";
const inp = (n, v, extra = "") => '<input name="' + n + '" value="' + esc(v) + '" ' + extra + ">";
const opts = (list, cur, ph) => '<option value="">' + ph + "</option>" + list.map(([k, t]) => '<option value="' + esc(k) + '"' + (k === cur ? " selected" : "") + ">" + esc(t) + "</option>").join("");

export const repairNames = (S) => S.r.map((k) => (REPAIRS.find((x) => x[0] === k) || [0, k])[1]);
export const brandText = (S) => (S.b === "other" ? S.bt : BRANDS[S.b] || "") + (S.m ? " " + S.m : "");
export const whenText = (S) => (S.mode === "slot" && S.date ? dayLabel(S.date) + ", " + S.slot.replace("-", " to ") : "As soon as possible");
export const addrText = (S) => [S.h, S.st, S.lm && "Near " + S.lm, S.ar, S.pin].filter(Boolean).join(", ");

export function stepHtml(n, S) {
  if (n === 1) return "<h2>Your details</h2>" + F("Your name", inp("n", S.n, 'autocomplete="name" maxlength="60"')) + F("Mobile number", inp("p", S.p, 'inputmode="numeric" maxlength="10" autocomplete="tel"'))
    + F("Email (optional)", inp("e", S.e, 'type="email" autocomplete="email"')) + '<p class="note">We use these details only to arrange your repair. <a href="privacy.html">Privacy Policy</a></p>';
  if (n === 2) {
    const chips = REPAIRS.map(([k, t]) => '<button type="button" class="chip' + (S.r.includes(k) ? " on" : "") + '" data-r="' + k + '" aria-pressed="' + S.r.includes(k) + '">' + t + "</button>").join("");
    return "<h2>Your phone</h2>" + F("Phone brand", '<select name="b">' + opts(Object.entries(BRANDS), S.b, "Choose brand") + "</select>")
      + (S.b === "other" ? F("Brand name", inp("bt", S.bt, 'maxlength="40"')) : "") + F("Phone model (optional)", inp("m", S.m, 'maxlength="40" placeholder="For example Galaxy A15"'))
      + '<p class="lbl">What needs fixing?</p><div class="chips">' + chips + "</div>"
      + F("Describe the problem" + (S.r.includes("other") ? "" : " (optional)"), '<textarea name="x" rows="3" maxlength="300">' + esc(S.x) + "</textarea>");
  }
  if (n === 3) return "<h2>Where should we come?</h2>" + '<button type="button" class="btn btn-line" id="locBtn">Use my current location</button><p class="note" id="locMsg">' + (S.lat ? "Location added." : "Optional. You can also type your address.") + "</p>"
    + F("House or flat number", inp("h", S.h, 'maxlength="60" autocomplete="address-line1"')) + F("Street or locality", inp("st", S.st, 'maxlength="80"')) + F("Landmark (optional)", inp("lm", S.lm, 'maxlength="60"'))
    + F("Area", '<select name="ar">' + opts(AREAS.map((a) => [a, a]), S.ar, "Choose area") + "</select>") + F("Pincode", inp("pin", S.pin, 'inputmode="numeric" maxlength="6"')) + '<p class="note">We currently serve Lucknow only.</p>';
  if (n === 4) {
    const ds = days(7);
    const cur = ds.find((d) => d.key === S.date);
    const slots = S.mode === "slot" ? '<p class="lbl">Choose a day</p><div class="chips">' + ds.map((d) => '<button type="button" class="chip' + (S.date === d.key ? " on" : "") + '" data-day="' + d.key + '">' + (d.today ? "Today" : d.label) + "</button>").join("") + "</div>"
      + (cur ? '<p class="lbl">Choose a time</p><div class="chips">' + SLOTS.map((s) => '<button type="button" class="chip' + (S.slot === s.join("-") ? " on" : "") + '" data-slot="' + s.join("-") + '"' + (slotOk(cur, s) ? "" : " disabled") + ">" + s[0] + " to " + s[1] + "</button>").join("") + "</div>" : "") : "";
    return "<h2>When should we come?</h2>" + '<div class="modes"><button type="button" class="mode' + (S.mode === "asap" ? " on" : "") + '" data-mode="asap"><b>As soon as possible</b><small>We call you to fix a time</small></button>'
      + '<button type="button" class="mode' + (S.mode === "slot" ? " on" : "") + '" data-mode="slot"><b>Choose date and time</b><small>Pick a slot that suits you</small></button></div>' + slots
      + '<p class="note">Our technician will confirm your exact arrival time on WhatsApp.</p>';
  }
  const row = (t, step, v) => '<div class="sum"><div><small>' + t + "</small><p>" + esc(v) + '</p></div><button type="button" class="edit" data-edit="' + step + '">Edit</button></div>';
  return "<h2>Review and confirm</h2>" + row("You", 1, S.n + ", " + S.p + (S.e ? ", " + S.e : "")) + row("Phone", 2, brandText(S) + " | " + repairNames(S).join(", ") + (S.x ? " | " + S.x : ""))
    + row("Address", 3, addrText(S) + (S.lat ? " (location added)" : "")) + row("When", 4, whenText(S))
    + '<input class="hp" name="web" tabindex="-1" autocomplete="off" aria-hidden="true" value="' + esc(S.web) + '">'
    + '<label class="chk"><input type="checkbox" name="ok"' + (S.ok ? " checked" : "") + '><span>I agree to the <a href="terms.html">Terms</a> and <a href="privacy.html">Privacy Policy</a> and to be contacted about this repair.</span></label>'
    + '<p class="note">Prices start from the amounts shown. Final price is confirmed after inspection.</p>';
}
export function waText(S, code) {
  const L = ["Hello Mobile Doctor, I want to request a repair.", "Request ID: " + code, "Name: " + S.n, "Phone: " + S.p, "Device: " + brandText(S),
    "Issue: " + repairNames(S).join(", ") + (S.x ? " (" + S.x + ")" : ""), "When: " + whenText(S), "Address: " + addrText(S)];
  if (S.lat) L.push("Location: https://www.google.com/maps?q=" + S.lat + "," + S.lng);
  return L.join("\n");
}
