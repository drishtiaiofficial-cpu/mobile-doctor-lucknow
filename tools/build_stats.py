from lib import put, css
P = '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>'
M = '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'
T = '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="8" cy="8" r="1.5"/>'
I = [(P, '<i data-to="15">15</i>+ brands', "Phones we repair"), (M, "Doorstep visit", "Across Lucknow"), (T, "Price first", "Confirmed before repair")]
cells = "".join('<div class="stat"><span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true">' + s + '</svg></span><div><b>' + b + '</b><span class="t">' + t + '</span></div></div>' for s, b, t in I)
put("stats", '<section class="stats-sec" id="stats" aria-label="Highlights"><div class="container"><div class="stats">' + cells + '</div></div></section>', "<!--S:bookbox-->")
css("stats")
print("STATS_OK")
