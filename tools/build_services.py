from lib import put, css
P = {
 "display": '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
 "battery": '<rect x="3" y="8" width="16" height="9" rx="2"/><path d="M21 11v3M7 12.5h6"/>',
 "charging": '<path d="M9 3v5M15 3v5M6 8h12v4a6 6 0 0 1-12 0zM12 18v3"/>',
 "back-panel": '<rect x="6" y="2" width="12" height="20" rx="2.5"/><circle cx="10" cy="7" r="1.6"/><path d="M13 7h2"/>',
 "software": '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12"/>',
 "audio": '<path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
}
S = [("display","Display","Cracked, dead or flickering screens"),("battery","Battery","Fast draining or swollen battery"),("charging","Charging port","Not charging or loose connection"),("back-panel","Back panel","Cracked or damaged back glass"),("software","Software","Hanging, slow or update problems"),("audio","Speaker and mic","Low sound or voice not clear")]
cards = "".join(f'<a class="svc" href="book.html?repair={k}"><span class="bd"><svg viewBox="0 0 24 24" aria-hidden="true">{P[k]}</svg></span><b>{t}</b><small>{d}</small></a>' for k, t, d in S)
services = ('<section class="section" id="services"><div class="container"><span class="eyebrow">What we repair</span><h2>Repairs at your doorstep</h2>'
 '<p class="lead">Pick the problem and book a visit. Final price is confirmed after inspection.</p><div class="svc-grid">' + cards + '</div></div></section>')
T = [("Book your slot","Choose your phone, the problem and a time that suits you."),("Our technician comes to you","We visit your home or office in Lucknow at your slot."),("Repair at your doorstep","Your phone is checked and repaired in front of you.")]
steps = "".join(f"<li><h3>{a}</h3><p>{b}</p></li>" for a, b in T)
how = '<section class="section how" id="how"><div class="container"><span class="eyebrow">How it works</span><h2>3 easy steps</h2><ol class="steps">' + steps + '</ol></div></section>'
put("services", services)
put("how", how)
css("services")
