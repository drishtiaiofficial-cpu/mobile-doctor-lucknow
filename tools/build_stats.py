from lib import put, css
S = [("10000", "10,000", "+", "Mobile Repaired", ""), ("5", "05", "+", "Years of Experience", "2"), ("100", "100", "%", "Client Satisfaction", "")]
cells = "".join('<div class="stat"><b><i data-to="' + n + '"' + (' data-pad="' + p + '"' if p else "") + ">" + d + "</i>" + x + "</b><span>" + t + "</span></div>" for n, d, x, t, p in S)
html = ('<section class="section stats-sec" id="stats"><div class="container"><h2>Why Lucknow trusts <span>Mobile Doctor</span></h2>'
 '<p class="lead">Fast doorstep repairs, honest pricing and expert service, right at your home in Lucknow.</p><div class="stats">' + cells + "</div></div></section>")
put("stats", html, "<!--S:bookbox-->")
css("stats")
print("STATS_OK")
