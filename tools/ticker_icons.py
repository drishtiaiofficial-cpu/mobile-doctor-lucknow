import re
I = {
 "screen": '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
 "battery": '<rect x="3" y="8" width="16" height="9" rx="2"/><path d="M21 11v3M7 12.5h6"/>',
 "port": '<path d="M9 3v5M15 3v5M6 8h12v4a6 6 0 0 1-12 0zM12 18v3"/>',
 "speaker": '<path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
 "mic": '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
 "camera": '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
 "code": '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12"/>',
}
items = [("screen","Screen Replacement"),("battery","Battery Replacement"),("port","Charging Port Repair"),("speaker","Speaker Repair"),("mic","Mic Issue Fix"),("camera","Camera Repair"),("code","Software Fix")]
svg = lambda p: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'
one = "".join("<span>" + svg(I[k]) + t + "</span>" for k, t in items)
s = open("index.html").read()
s = re.sub(r'(<div class="ticker-track" id="ticker">).*?(</div></div>)', lambda m: m.group(1) + one + one + m.group(2), s, count=1, flags=re.S)
s = re.sub(r'\s*<script type="module" src="assets/js/ticker\.js[^"]*"></script>', '', s)
open("index.html", "w").write(s)
