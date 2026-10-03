from lib import put, css
S = [("15", "+", "Phone brands we repair"), ("90", "", "Days repair warranty"), ("12", "\u00d77", "Customer support")]
cells = "".join('<div class="stat"><b><i data-to="' + n + '">' + n + "</i>" + x + "</b><span>" + t + "</span></div>" for n, x, t in S)
html = ('<section class="section stats-sec" id="stats"><div class="container"><h2>Why Lucknow trusts <span>Mobile Doctor</span></h2>'
 '<p class="lead">Fast doorstep repairs, honest pricing and expert service, right at your home in Lucknow.</p><div class="stats">' + cells + "</div></div></section>")
put("stats", html, "<!--S:bookbox-->")
css("stats")
print("STATS_OK")
