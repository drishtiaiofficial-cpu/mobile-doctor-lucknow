import re
s = open("index.html").read()
top, rest = s.split("<main>", 1)
tail = rest.split("</main>", 1)[1]
if "brand.css" not in top:
    top = top.replace("<!--CSS-->", '<link rel="stylesheet" href="assets/css/brand.css">\n<!--CSS-->', 1)
page = top + '<main><div id="brandPage"><noscript>Please enable JavaScript to see repair options.</noscript></div></main>' + tail
page = page.replace('href="#', 'href="./#')
page = page.replace('src="assets/js/main.js"></script>', 'src="assets/js/main.js"></script>\n<script type="module" src="assets/js/brand.js"></script>', 1)
page = re.sub(r"<title>.*?</title>", "<title>Repair in Lucknow | Mobile Doctor</title>", page, count=1, flags=re.S)
open("brand.html", "w").write(page)
print("BRAND_PAGE", page.count('id="brandPage"'), page.count("brand.js"))
