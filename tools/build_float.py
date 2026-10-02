import re
from lib import put, css
d = re.search(r' d="([^"]+)"', open("/tmp/si/package/icons/whatsapp.svg").read()).group(1)
WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '"/></svg>'
CALL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>'
html = ('<a class="fab fab-call" data-call href="#" aria-label="Call us">' + CALL + '</a>'
 '<button class="fab fab-wa" id="waFab" aria-label="Chat on WhatsApp">' + WA + '</button>'
 '<div class="wa-pop" id="waPop" hidden role="dialog" aria-label="Chat on WhatsApp">'
 '<div class="wa-head">' + WA + '<span>WhatsApp</span><button class="wa-x" aria-label="Close">&times;</button></div>'
 '<div class="wa-body"><div class="wa-msg"><b>Hi, welcome to Mobile Doctor.</b><br>Tell us your phone problem and your area in Lucknow, and we will help you right away.</div>'
 '<a class="wa-open" data-wa href="#" target="_blank" rel="noopener">' + WA + 'Open Chat</a></div></div>')
put("float", html, '<script type="module"')
css("float")
