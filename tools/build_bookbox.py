import re
from lib import put, css
BR = [("apple", "Apple"), ("samsung", "Samsung"), ("xiaomi", "Xiaomi / Redmi"), ("vivo", "Vivo"), ("oppo", "Oppo"), ("realme", "Realme"), ("oneplus", "OnePlus"), ("poco", "POCO"), ("iqoo", "iQOO"), ("nokia", "Nokia"), ("honor", "Honor"), ("nothing", "Nothing"), ("tecno", "Tecno"), ("infinix", "Infinix"), ("google", "Google"), ("other", "Other")]
RP = [("display", "Display"), ("charging", "Charging port"), ("back-panel", "Back panel"), ("battery", "Battery"), ("software", "Software"), ("audio", "Speaker or mic"), ("other", "Something else")]
opt = lambda L, ph: '<option value="">' + ph + "</option>" + "".join('<option value="' + k + '">' + v + "</option>" for k, v in L)
html = ('<section class="section hb-sec" id="book"><div class="container"><span class="eyebrow">Book a visit</span><h2>Book your repair</h2>'
 '<p class="lead">Fill this once. Your details go straight to WhatsApp and our technician reaches you shortly.</p>'
 '<div id="bookPage"></div><script type="module" src="assets/js/book.js"></script></div></section>')
s = open("index.html").read()
s = re.sub(r"<!--S:cta-->.*?<!--/S:cta-->\n?", "", s, flags=re.S)
open("index.html", "w").write(s)
put("bookbox", html, "<!--S:faq-->")
css("bookbox")
css("book")
print("BOOKBOX_OK", open("index.html").read().count('id="hb"'))
