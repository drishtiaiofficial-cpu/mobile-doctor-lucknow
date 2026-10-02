export const BRANDS = {
  apple: "Apple", samsung: "Samsung", xiaomi: "Xiaomi / Redmi", vivo: "Vivo", oppo: "Oppo", realme: "Realme",
  oneplus: "OnePlus", poco: "POCO", iqoo: "iQOO", nokia: "Nokia", honor: "Honor", nothing: "Nothing",
  tecno: "Tecno", infinix: "Infinix", google: "Google", other: "Other brand",
};
export const REPAIRS = [["display", "Display"], ["charging", "Charging port"], ["back-panel", "Back panel"], ["battery", "Battery"], ["software", "Software"], ["audio", "Speaker or mic"], ["other", "Something else"]];
export const AREAS = ["Alambagh", "Aliganj", "Aminabad", "Arjunganj", "Ashiana", "Charbagh", "Chowk", "Faizabad Road", "Gomti Nagar", "Hazratganj", "Indira Nagar", "Jankipuram", "Kanpur Road", "Mahanagar", "Rajajipuram", "Sarojini Nagar", "Vikas Nagar", "Vrindavan Yojana", "Other area"];
export const SLOTS = [["10:00", "12:00"], ["12:00", "14:00"], ["14:00", "16:00"], ["16:00", "18:00"], ["18:00", "20:00"]];
export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function istNow(date = new Date()) {
  const p = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(date);
  const g = (t) => Number(p.find((x) => x.type === t).value);
  return { y: g("year"), m: g("month"), d: g("day"), h: g("hour") % 24, mi: g("minute") };
}
export function days(n = 7, now = istNow()) {
  return Array.from({ length: n }, (_, i) => {
    const dt = new Date(Date.UTC(now.y, now.m - 1, now.d + i));
    return { key: dt.toISOString().slice(0, 10), today: i === 0, label: dt.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }) };
  });
}
export function slotOk(day, slot, now = istNow()) {
  if (!day.today) return true;
  return Number(slot[0].slice(0, 2)) * 60 >= now.h * 60 + now.mi + 120;
}
export const dayLabel = (key) => (days(14).find((d) => d.key === key) || { label: key }).label;
