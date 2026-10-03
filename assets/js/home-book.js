import { sendLead, waLink, srcInfo } from "./lead.js";
import { siteConfig as c } from "../../config/site.config.js";
const f = document.getElementById("hb");
if (f) f.addEventListener("submit", async (e) => {
  e.preventDefault();
  const v = (k) => String(f.elements[k].value).trim(), txt = (k) => f.elements[k].selectedOptions[0].text;
  const box = document.getElementById("hbErr"), btn = f.querySelector("button");
  const m = v("n").length < 2 ? "Please enter your name." : !/^[6-9][0-9]{9}$/.test(v("p")) ? "Please enter a valid 10-digit mobile number."
    : !v("b") ? "Please select your phone brand." : !v("r") ? "Please select the repair type." : v("a").length < 5 ? "Please enter your address."
    : !/^[0-9]{6}$/.test(v("pc")) ? "Please enter your 6-digit pincode." : !c.pincodePrefixes.some((x) => v("pc").startsWith(x)) ? "We currently serve Lucknow only." : "";
  box.hidden = !m; box.textContent = m;
  if (m) return;
  btn.disabled = true; btn.textContent = "Sending...";
  const r = await sendLead({ name: v("n"), phone: v("p"), brand: txt("b"), issues: [v("r")], address: v("a"), pincode: v("pc"), when: "asap", hp: v("hp"), source: srcInfo() });
  if (r.error) { box.hidden = false; box.textContent = r.error; btn.disabled = false; btn.textContent = "Get Instant Repair"; return; }
  btn.textContent = "Opening WhatsApp...";
  const id = r.code ? "Booking ID: " + r.code : "";
  location.href = waLink(["Hello Mobile Doctor, I want to book a repair.", id, "Name: " + v("n"), "Phone: " + v("p"), "Device: " + txt("b"), "Issue: " + txt("r"), "Address: " + v("a") + " - " + v("pc")]);
});
