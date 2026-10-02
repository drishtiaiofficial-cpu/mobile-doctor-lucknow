import json
from lib import put, css
O = json.load(open("config/offer.json"))
ck = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
it = [("Doorstep repair experts", "Get your phone repaired at home, without visiting any shop."),
      ("Fast and reliable service", "Most repairs are completed within " + O["repairTime"] + "."),
      ("Skilled technicians", "Experienced technicians handle your device with care.")]
if O["genuineParts"]:
    it.append(("Genuine parts", "We use genuine, tested spare parts for long-lasting performance."))
it += [("Same-day service", "Book today and our technician can visit the same day, subject to availability."),
       ("Customer satisfaction first", "Your satisfaction is our top priority, always.")]
li = "".join(f'<li><span class="ck">{ck}</span><div><b>{t}</b><p>{d}</p></div></li>' for t, d in it)
why = ('<section class="section" id="why"><div class="container why-grid">'
       '<img src="assets/img/repair-hands.webp" alt="Technician repairing a smartphone" loading="lazy">'
       '<div><span class="eyebrow">Why us</span><h2>Driven by quality and trust</h2><ul class="checks">' + li + '</ul></div></div></section>')
P = {"tag": '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="8" cy="8" r="1.5"/>',
     "head": '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/><path d="M19 20a4 4 0 0 1-4 2h-2"/>',
     "shield": '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'}
V = [("tag", "Value for money", "Quality mobile repairs at prices that fit your budget."),
     ("head", O["supportHours"].replace("x", " x ") + " customer support", "Questions or problems? Our support team is always just a call away.")]
if O["warrantyDays"]:
    d = str(O["warrantyDays"])
    V.append(("shield", d + "-day warranty", "Repairs are backed by " + d + " days of warranty support. Terms apply."))
cards = "".join(f'<div class="val"><span class="bd"><svg viewBox="0 0 24 24" aria-hidden="true">{P[k]}</svg></span><b>{t}</b><p>{x}</p></div>' for k, t, x in V)
vals = '<section class="section vals"><div class="container val-grid">' + cards + '</div></section>'
cta = ('<section class="cta-band"><div class="container"><h2>Book your repair</h2>'
       '<p>Share your phone and the problem, pick a time, and our technician will confirm your visit.</p>'
       '<a class="btn btn-light" href="book.html">Book Now</a></div></section>')
call = ('<section class="section call-sec"><div class="container"><h2>Still have any questions?</h2>'
        '<a class="btn btn-primary" data-call href="#">Call our technician</a></div></section>')
put("why", why, "<!--S:faq-->")
put("vals", vals, "<!--S:faq-->")
put("cta", cta, "<!--S:faq-->")
put("callcta", call, "<!--S:contact-->")
css("trust")
print("TRUST_OK", len(it), len(V))
