const f = document.getElementById("hb");
if (f) {
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(f);
    const n = String(d.get("n")).trim();
    const m = n.length < 2 ? "Please enter your name." : !/^[6-9][0-9]{9}$/.test(d.get("p")) ? "Please enter a valid 10-digit mobile number." : !d.get("b") ? "Please select your phone brand." : "";
    const box = document.getElementById("hbErr");
    box.hidden = !m;
    box.textContent = m;
    if (m) return;
    try { sessionStorage.setItem("md-lead", JSON.stringify({ n, p: d.get("p"), b: d.get("b"), r: d.get("r") || "" })); } catch {}
    location.href = "book.html";
  });
}
