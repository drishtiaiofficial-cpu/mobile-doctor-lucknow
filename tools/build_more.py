from lib import put, css
BR = [("apple","Apple"),("samsung","Samsung"),("xiaomi","Xiaomi / Redmi"),("vivo","Vivo"),("oppo","Oppo"),("realme","Realme"),("oneplus","OnePlus"),("poco","POCO"),("iqoo","iQOO"),("nokia","Nokia"),("honor","Honor"),("nothing","Nothing"),("tecno","Tecno"),("infinix","Infinix"),("google","Google"),("other","Other")]
RP = [("display","Display"),("battery","Battery"),("charging","Charging port"),("back-panel","Back panel"),("software","Software"),("audio","Speaker or mic"),("other","Something else")]
opt = lambda L, ph: f'<option value="">{ph}</option>' + "".join(f'<option value="{k}">{v}</option>' for k, v in L)
qb = ('<section class="qb-wrap"><div class="container"><form class="qb" id="qb" novalidate><h3>Quick booking</h3>'
 '<input name="n" placeholder="Your name" autocomplete="name" aria-label="Your name">'
 '<input name="p" placeholder="Mobile number" inputmode="numeric" maxlength="10" autocomplete="tel" aria-label="Mobile number">'
 '<select name="b" aria-label="Phone brand">' + opt(BR, "Phone brand") + '</select>'
 '<select name="r" aria-label="Problem">' + opt(RP, "What needs fixing?") + '</select>'
 '<button class="btn btn-primary" type="submit">Continue</button><p class="qb-err" id="qbErr" hidden></p></form></div></section>')
F = [("Do you repair at my home?","Yes. Our technician visits your home or office in Lucknow at the time slot you choose."),
 ("Which areas do you serve?","We currently serve Lucknow only. Your pincode is checked when you book."),
 ("How much will my repair cost?","The price depends on your phone model and the problem. The final price is confirmed after inspection, before any work starts."),
 ("How do I book?","Tap Book Now, choose your phone, the problem, your address and a time slot. You can also call or message us on WhatsApp."),
 ("Can every repair be done at home?","Many repairs can be done at your doorstep. If your phone needs more work, our technician will tell you the options."),
 ("Should I back up my data?","Yes. We recommend backing up your phone before the visit.")]
faq = ('<section class="section" id="faq"><div class="container narrow"><span class="eyebrow">FAQ</span><h2>Questions, answered</h2><div class="faq">'
 + "".join(f"<details><summary>{q}</summary><p>{a}</p></details>" for q, a in F) + '</div></div></section>')
ct = ('<section class="section" id="contact"><div class="container"><span class="eyebrow">Contact</span><h2>Talk to us</h2>'
 '<p class="lead">We currently serve Lucknow only. Call, message or book online.</p><div class="contact-grid">'
 '<a class="contact-card" data-call href="#"><b>Call us</b><span data-phone></span></a>'
 '<a class="contact-card" data-wa href="#" target="_blank" rel="noopener"><b>WhatsApp</b><span>Chat with us</span></a>'
 '<div class="contact-card"><b>Service area</b><span>Lucknow only</span></div></div></div></section>')
put("qb", qb, '<section class="section about"')
put("faq", faq)
put("contact", ct)
css("more")
