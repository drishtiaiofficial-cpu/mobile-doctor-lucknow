const B = {
  apple: ["Apple", "#4a4f5c"], samsung: ["Samsung", "#1428A0"], xiaomi: ["Xiaomi / Redmi", "#E25800"],
  vivo: ["Vivo", "#415FFF"], oppo: ["Oppo", "#1D8E4B"], realme: ["Realme", "#9A7400"],
  oneplus: ["OnePlus", "#C4010C"], poco: ["POCO", "#3a3a3a"], iqoo: ["iQOO", "#8a6a14"],
  nokia: ["Nokia", "#124191"], honor: ["Honor", "#2a2a2a"], nothing: ["Nothing", "#222222"],
  tecno: ["Tecno", "#0B6EDB"], infinix: ["Infinix", "#2a2a2a"], google: ["Google", "#4285F4"], other: ["Your phone", "#5F6675"],
};
const R = [
  ["display", "Display broken", '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>'],
  ["charging", "Charging issue", '<path d="M9 3v5M15 3v5M6 8h12v4a6 6 0 0 1-12 0zM12 18v3"/>'],
  ["back-panel", "Back panel", '<rect x="6" y="2" width="12" height="20" rx="2.5"/><circle cx="10" cy="7" r="1.6"/>'],
  ["battery", "Battery issue", '<rect x="3" y="8" width="16" height="9" rx="2"/><path d="M21 11v3M7 12.5h6"/>'],
  ["software", "Software problem", '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12"/>'],
  ["audio", "Speaker or mic", '<path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6"/>'],
];
const root = document.getElementById("brandPage");
const q = new URLSearchParams(location.search).get("b") || "";
if (root && !Object.prototype.hasOwnProperty.call(B, q)) {
  root.innerHTML = '<div class="container section"><h1>Brand not found</h1><a class="btn btn-primary" href="./#brands">Choose your brand</a></div>';
} else if (root) {
  const [name, color] = B[q];
  document.title = name + " Repair in Lucknow | Mobile Doctor";
  const tiles = R.map(([k, t, p]) => '<a class="rp" href="book.html?brand=' + q + "&repair=" + k + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + p + "</svg><b>" + t + "</b></a>").join("");
  root.innerHTML = '<section class="section"><div class="container"><a class="back" href="./#brands">&larr; All brands</a><div class="bp-grid">'
    + '<div class="phone-wrap" id="phoneWrap"></div><div><span class="eyebrow">Repair at your doorstep</span><h1>' + name + " repair in Lucknow</h1>"
    + '<div class="rp-grid">' + tiles + '</div><ul class="mini" id="mini"></ul>'
    + '<a class="btn btn-primary" href="book.html?brand=' + q + '">Book Your Repair</a></div></div></div></section>';
  const wrap = document.getElementById("phoneWrap");
  const fallback = () => {
    wrap.innerHTML = '<div class="phone" style="--bc:' + color + '"><i class="cam"></i><img class="pl" src="assets/img/brands/' + q + '.svg" alt="" width="90" height="60"><span class="pn">' + name + "</span></div>";
    const im = wrap.querySelector(".pl");
    im.onerror = () => { im.remove(); wrap.querySelector(".pn").classList.add("show"); };
  };
  const real = new Image();
  real.onload = () => { wrap.innerHTML = '<img class="real" src="' + real.src + '" alt="' + name + ' phone">'; };
  real.onerror = fallback;
  real.src = "assets/img/phones/" + q + ".webp";
  fetch("config/offer.json").then((r) => r.json()).then((o) => {
    const m = [];
    if (o.payAfterRepair) m.push("Pay after repair");
    if (o.warrantyDays) m.push(o.warrantyDays + " days warranty");
    if (o.genuineParts) m.push("Genuine parts");
    document.getElementById("mini").innerHTML = m.map((x) => "<li>" + x + "</li>").join("");
  }).catch(() => {});
}
