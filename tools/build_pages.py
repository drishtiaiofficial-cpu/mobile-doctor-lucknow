import re
s = open("index.html").read()
top, rest = s.split("<main>", 1)
tail = rest.split("</main>", 1)[1]
PAGES = [("brand.html", "brandPage", "brand", "Repair in Lucknow | Mobile Doctor", False),
         ("book.html", "bookPage", "book", "Book a Repair | Mobile Doctor", True)]
for fn, mid, name, title, noindex in PAGES:
    t = top
    if name + ".css" not in t:
        t = t.replace("<!--CSS-->", '<link rel="stylesheet" href="assets/css/' + name + '.css">\n<!--CSS-->', 1)
    page = t + '<main><div id="' + mid + '"><noscript>Please enable JavaScript to use this page.</noscript></div></main>' + tail
    page = page.replace('href="#', 'href="./#')
    page = page.replace('src="assets/js/main.js"></script>', 'src="assets/js/main.js"></script>\n<script type="module" src="assets/js/' + name + '.js"></script>', 1)
    page = re.sub(r"<title>.*?</title>", "<title>" + title + "</title>", page, count=1, flags=re.S)
    if noindex:
        page = page.replace("</head>", '<meta name="robots" content="noindex">\n</head>', 1)
    open(fn, "w").write(page)
    print("BUILT", fn, page.count('id="' + mid + '"'))
