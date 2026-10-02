import os, re, shutil
SRC = "/tmp/si/package/icons"
B = [("apple","Apple"),("samsung","Samsung"),("xiaomi","Xiaomi / Redmi"),("vivo","Vivo"),("oppo","Oppo"),("realme","Realme"),("oneplus","OnePlus"),("poco","POCO"),("iqoo","iQOO"),("nokia","Nokia"),("honor","Honor"),("nothing","Nothing"),("tecno","Tecno"),("infinix","Infinix"),("google","Google"),("other","Other")]
found, missing, tiles = [], [], ""
for slug, name in B:
    src = f"{SRC}/{slug}.svg"
    dst = f"assets/img/brands/{slug}.svg"
    if os.path.exists(src):
        shutil.copy(src, dst)
    if os.path.exists(dst):
        found.append(slug)
        inner = f'<span class="logo" role="img" aria-label="{name}" style="--m:url({dst})"></span>'
    else:
        if slug != "other":
            missing.append(slug)
        inner = f'<span class="bt-name">{name}</span>'
    tiles += f'<a class="brand-tile" href="brand.html?b={slug}" aria-label="{name} repair">{inner}</a>'
sec = '<section class="section" id="brands"><div class="container"><span class="eyebrow">Brands we repair</span><h2>Choose your phone brand</h2><p class="lead">Tap your brand to see repair options.</p><div class="brand-grid">' + tiles + '</div><p class="fine">All logos are trademarks of their respective owners. Mobile Doctor is not affiliated with these brands.</p></div></section>'
s = open("index.html").read()
if 'id="brands"' in s:
    s = re.sub(r'<section class="section" id="brands">.*?</section>', lambda m: sec, s, flags=re.S)
else:
    s = s.replace("<!--SECTIONS-->", sec + "\n<!--SECTIONS-->", 1)
if "brands.css" not in s:
    s = s.replace("<!--CSS-->", '<link rel="stylesheet" href="assets/css/brands.css">\n<!--CSS-->', 1)
open("index.html", "w").write(s)
print("FOUND:", " ".join(found))
print("MISSING:", " ".join(missing) or "none")
