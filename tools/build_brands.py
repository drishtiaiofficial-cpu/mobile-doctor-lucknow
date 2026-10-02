import os, re, shutil, json, glob
SRC = "/tmp/si/package/icons"
B = [("apple","Apple"),("samsung","Samsung"),("xiaomi","Xiaomi / Redmi"),("vivo","Vivo"),("oppo","Oppo"),("realme","Realme"),("oneplus","OnePlus"),("poco","POCO"),("iqoo","iQOO"),("nokia","Nokia"),("honor","Honor"),("nothing","Nothing"),("tecno","Tecno"),("infinix","Infinix"),("google","Google"),("other","Other")]
HEX = {}
for p in glob.glob("/tmp/si/package/**/simple-icons.json", recursive=True):
    for e in json.load(open(p)):
        HEX[e.get("slug") or re.sub(r"[^a-z0-9]", "", e["title"].lower())] = e["hex"]
FIX = {"apple":"111111","poco":"111111","nothing":"111111","honor":"111111","infinix":"111111"}
found, missing, tiles = [], [], ""
for slug, name in B:
    dst = f"assets/img/brands/{slug}.svg"
    if os.path.exists(f"{SRC}/{slug}.svg"):
        shutil.copy(f"{SRC}/{slug}.svg", dst)
    if os.path.exists(dst):
        found.append(slug)
        col = FIX.get(slug) or HEX.get(slug) or "14171F"
        inner = f'<span class="logo" role="img" aria-label="{name}" style="--m:url({dst});--c:#{col}"></span>'
    else:
        if slug != "other":
            missing.append(slug)
        inner = f'<span class="bt-name">{name}</span>'
    tiles += f'<a class="brand-tile" href="brand.html?b={slug}" aria-label="{name} repair">{inner}</a>'
sec = '<section class="section" id="brands"><div class="container"><span class="eyebrow">Brands we repair</span><h2>Choose your phone brand</h2><p class="lead">Tap your brand to see repair options.</p><div class="brand-grid">' + tiles + '</div><p class="fine">All logos are trademarks of their respective owners. Mobile Doctor is not affiliated with these brands.</p></div></section>'
s = open("index.html").read()
s = re.sub(r'<section class="section" id="brands">.*?</section>', lambda m: sec, s, flags=re.S)
open("index.html", "w").write(s)
print("FOUND:", " ".join(found))
print("MISSING:", " ".join(missing) or "none")
