from lib import put, css
put("contact", '<section class="section" id="contact"><div class="container"><span class="eyebrow">Contact</span><h2>Talk to us</h2>'
 '<p class="lead">We currently serve Lucknow only. Call, message or book online.</p><div class="contact-grid">'
 '<a class="contact-card" data-call href="#"><b>Call us</b><span data-phone></span></a>'
 '<a class="contact-card" data-wa href="#" target="_blank" rel="noopener"><b>WhatsApp</b><span>Chat with us</span></a>'
 '<a class="contact-card" data-mail href="#"><b>Email</b><span></span></a>'
 '<div class="contact-card"><b>Service area</b><span>Lucknow only</span></div></div></div></section>')
css("social")
print("CONTACT_OK")
