from lib import put, css
L = lambda items: "".join(f'<a href="{h}">{t}</a>' for h, t in items)
html = ('<footer class="footer" id="footer"><div class="container foot-grid">'
 '<div class="foot-brand"><img src="assets/img/logo.svg" width="72" height="72" alt="" loading="lazy"><b>MOBILE <em>DOCTOR</em></b><p>Doorstep mobile repair in Lucknow. Book online and our technician comes to you.</p></div>'
 '<div><h4>Quick links</h4>' + L([("./","Home"),("#services","Services"),("#about","About"),("#faq","FAQ"),("book.html","Book Now")]) + '</div>'
 '<div><h4>Repairs</h4><span>Display</span><span>Battery</span><span>Charging port</span><span>Back panel</span><span>Software</span><span>Speaker and mic</span></div>'
 '<div><h4>Contact</h4><a data-call data-phone href="#"></a><a data-wa href="#" target="_blank" rel="noopener">WhatsApp us</a><a id="mailLink" href="#" hidden></a><span>Lucknow only</span><div class="soc" id="soc"></div></div>'
 '</div><div class="container foot-bottom"><span id="yr"></span><span><a href="terms.html">Terms and Conditions</a> &middot; <a href="privacy.html">Privacy Policy</a></span></div></footer>')
put("footer", html, "<!--S:float-->")
css("footer")
