import re
def put(name, html, anchor="<!--SECTIONS-->"):
    s = open("index.html").read()
    block = f"<!--S:{name}-->{html}<!--/S:{name}-->\n"
    pat = re.compile(rf"<!--S:{name}-->.*?<!--/S:{name}-->\n?", re.S)
    s = pat.sub(lambda m: block, s) if pat.search(s) else s.replace(anchor, block + anchor, 1)
    open("index.html", "w").write(s)
def css(name):
    s = open("index.html").read()
    tag = f'<link rel="stylesheet" href="assets/css/{name}.css">'
    if tag not in s:
        open("index.html", "w").write(s.replace("<!--CSS-->", tag + "\n<!--CSS-->", 1))
