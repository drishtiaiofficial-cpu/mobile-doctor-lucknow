import os, re
SRC = "/tmp/si/package/icons"
B = [("apple","Apple","111111"),("samsung","Samsung","1428A0"),("xiaomi","Xiaomi / Redmi","FF6900"),("vivo","Vivo","415FFF"),("oppo","Oppo","1D8E4B"),("realme","Realme",None),("oneplus","OnePlus","F5010C"),("poco","POCO",None),("iqoo","iQOO","E5A81C"),("nokia","Nokia","124191"),("honor","Honor","111111"),("nothing","Nothing","111111"),("tecno","Tecno","0B6EDB"),("infinix","Infinix","111111"),("google","Google","4285F4"),("other","Other",None)]
TX = {"realme": '<span class="tx realme">realme</span>', "poco": '<span class="tx poco">POCO</span>', "other": '<span class="tx other">+ Other</span>'}
n, missing, tiles = 0, [], ""
for slug, name, col in B:
    inner = None
    p = f"{SRC}/{slug}.svg"
    if col and os.path.exists(p):
        paths = re.findall(r'<path[^>]*\sd="([^"]+)"', open(p).read())
        if paths:
            body = "".join(f'<path d="{d}"/>' for d in paths)
            inner = f'<svg class="bl" viewBox="0 0 24 24" fill="#{col}" role="img" aria-label="{name}">{body}</svg>'
            n += 1
    if inner is None:
        inner = TX.get(slug) or f'<span class="tx">{name}</span>'
        if slug not in TX:
            missing.append(slug)
    tiles += f'<a class="brand-tile" href="brand.html?b={slug}" aria-label="{name} repair">{inner}</a>'
sec = '<section class="section" id="brands"><div class="container"><span class="eyebrow">Brands we repair</span><h2>Choose your phone brand</h2><p class="lead">Tap your brand to see repair options.</p><div class="brand-grid">' + tiles + '</div><p class="fine">All logos are trademarks of their respective owners. Mobile Doctor is not affiliated with these brands.</p></div></section>'
s = open("index.html").read()
s = re.sub(r'<section class="section" id="brands">.*?</section>', lambda m: sec, s, flags=re.S)
open("index.html", "w").write(s)
print("SVG_LOGOS:", n)
print("MISSING:", " ".join(missing) or "none")
