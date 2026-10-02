import re
from lib import put, css
BR = [("apple", "Apple"), ("samsung", "Samsung"), ("xiaomi", "Xiaomi / Redmi"), ("vivo", "Vivo"), ("oppo", "Oppo"), ("realme", "Realme"), ("oneplus", "OnePlus"), ("poco", "POCO"), ("iqoo", "iQOO"), ("nokia", "Nokia"), ("honor", "Honor"), ("nothing", "Nothing"), ("tecno", "Tecno"), ("infinix", "Infinix"), ("google", "Google"), ("other", "Other")]
RP = [("display", "Display"), ("charging", "Charging port"), ("back-panel", "Back panel"), ("battery", "Battery"), ("software", "Software"), ("audio", "Speaker or mic"), ("other", "Something else")]
opt = lambda L, ph: '<option value="">' + ph + "</option>" + "".join('<option value="' + k + '">' + v + "</option>" for k, v in L)
html = ('<section class="section hb-sec" id="book"><div class="container"><span class="eyebrow">Book a visit</span><h2>Book your repair</h2>'
 '<p class="lead">Technicians reach you shortly and repair your phone at your doorstep.</p><div class="hb">'
 '<form class="hb-form" id="hb" novalidate><h3>Request a repair</h3>'
 '<input name="n" placeholder="Your name" autocomplete="name" aria-label="Your name">'
 '<input name="p" placeholder="Mobile number" inputmode="numeric" maxlength="10" autocomplete="tel" aria-label="Mobile number">'
 '<select name="b" aria-label="Phone brand">' + opt(BR, "Select phone brand") + '</select>'
 '<select name="r" aria-label="Repair type">' + opt(RP, "Select repair type") + '</select>'
 '<p class="hb-err" id="hbErr" hidden></p><button class="btn btn-primary" type="submit">Request a repair</button>'
 '<ul class="hb-pts"><li>Doorstep service</li><li>Final price after inspection</li><li>Lucknow only</li></ul></form>'
 '<img src="assets/img/tools-mat.webp" alt="Phone repair tools on a work mat" loading="lazy"></div></div></section>')
s = open("index.html").read()
s = re.sub(r"<!--S:cta-->.*?<!--/S:cta-->\n?", "", s, flags=re.S)
open("index.html", "w").write(s)
put("bookbox", html, "<!--S:faq-->")
css("bookbox")
print("BOOKBOX_OK", open("index.html").read().count('id="hb"'))
