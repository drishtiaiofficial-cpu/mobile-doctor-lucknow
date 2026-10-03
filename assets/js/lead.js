import { siteConfig as c } from "../../config/site.config.js";
const K = ["ad", "utm_source", "utm_medium", "utm_campaign"], qs = new URLSearchParams(location.search);
try { if (K.some((k) => qs.get(k))) sessionStorage.setItem("md-src", JSON.stringify(Object.fromEntries(K.map((k) => [k, qs.get(k) || ""])))); } catch {}
export const srcInfo = () => {
  let s = {}, ref = "";
  try { s = JSON.parse(sessionStorage.getItem("md-src")) || {}; } catch {}
  try { ref = document.referrer ? new URL(document.referrer).hostname : ""; } catch {}
  return { ...s, ref };
};
export const waLink = (lines) => "https://wa.me/" + c.whatsappE164 + "?text=" + encodeURIComponent(lines.filter(Boolean).join("\n"));
export async function sendLead(d) {
  const ctl = new AbortController(), tm = setTimeout(() => ctl.abort(), 12000);
  try {
    const r = await fetch(c.supabaseUrl + "/functions/v1/quick-handler", { method: "POST", signal: ctl.signal, headers: { "Content-Type": "application/json", apikey: c.supabaseAnonKey }, body: JSON.stringify(d) });
    const j = await r.json().catch(() => ({}));
    if (r.status >= 400 && r.status < 500 && j.error) return { error: j.error };
    return { code: j.code || "" };
  } catch { return { code: "" }; } finally { clearTimeout(tm); }
}
