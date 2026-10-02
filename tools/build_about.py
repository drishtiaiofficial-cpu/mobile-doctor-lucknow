import re
P = {
 "door": '<path d="M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6"/>',
 "tag": '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="8" cy="8" r="1.5"/>',
 "cal": '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4"/>',
 "pin": '<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
}
B = [("door","At your doorstep","Home or office visit"),("tag","Honest pricing","Final price after inspection"),("cal","Easy booking","Book online in minutes"),("pin","Lucknow local","Serving Lucknow")]
badges = "".join(f'<li><span class="bd"><svg viewBox="0 0 24 24" aria-hidden="true">{P[k]}</svg></span><b>{t}</b><small>{d}</small></li>' for k, t, d in B)
sec = ('<section class="section about" id="about"><div class="container about-grid">'
 '<div class="about-col"><span class="eyebrow">About us</span><h2>About Mobile Doctor</h2>'
 '<p>Mobile Doctor is a doorstep mobile repair service in Lucknow. Instead of leaving your phone at a shop and waiting, you book online, choose a time that suits you, and our technician visits your home or office.</p>'
 '<p>Tell us your phone and what is wrong, and we take care of the rest. We keep things simple and honest, with clear communication at every step and a final price confirmed after inspection.</p>'
 '<a class="btn btn-primary" href="book.html">Book a repair</a></div>'
 '<div class="about-col why"><span class="eyebrow">Why choose us</span><h2>Why choose Mobile Doctor</h2>'
 '<p>We repair your phone at your doorstep, so you save the time and effort of travelling across the city. Book in a few taps, pick a slot, and our technician comes to you.</p>'
 '<ul class="badges">' + badges + '</ul></div></div></section>\n')
s = open("index.html").read()
s = re.sub(r'<section class="section about" id="about">.*?</section>\n?', "", s, flags=re.S)
s = s.replace('<section class="section" id="brands">', sec + '<section class="section" id="brands">', 1)
if "about.css" not in s:
    s = s.replace("<!--CSS-->", '<link rel="stylesheet" href="assets/css/about.css">\n<!--CSS-->', 1)
open("index.html", "w").write(s)
print("ABOUT_OK", s.count('id="about"'))
