from lib import put, css
html = ('<section class="section rv-sec" id="reviews"><div class="container"><h2>Customer <span>reviews</span></h2>'
 '<p class="lead">Share your experience. Reviews appear on the site after our team approves them.</p>'
 '<p class="rv-avg" id="rvAvg" hidden></p><div class="rv-list" id="rvList"></div><div class="rv-dots" id="rvDots"></div>'
 '<p class="rv-empty" id="rvEmpty" hidden>No reviews yet. Be the first to share your experience.</p>'
 '<div class="rv-actions"><button class="btn btn-primary" id="rvOpen" type="button">Write a review</button>'
 '<a class="btn btn-line" id="rvG" href="#" target="_blank" rel="noopener" hidden>Review us on Google</a></div>'
 '<p class="rv-ok" id="rvOk" role="status" hidden></p>'
 '<form class="rv-form" id="rvForm" hidden novalidate><div class="rv-head"><h3>Write a review</h3>'
 '<button type="button" class="rv-x" id="rvX" aria-label="Close">&#10005;</button></div>'
 '<div class="rv-stars" id="rvStars" role="radiogroup" aria-label="Rating">'
 + "".join('<button type="button" data-s="%d" aria-label="%d star%s">&#9733;</button>' % (i, i, "" if i == 1 else "s") for i in range(1, 6)) +
 '</div><input name="n" placeholder="Your name" maxlength="40" autocomplete="name" aria-label="Your name">'
 '<textarea name="c" rows="3" maxlength="600" placeholder="Tell us about your repair experience" aria-label="Your review"></textarea>'
 '<div class="rv-r2"><input name="code" placeholder="Booking ID (optional)" maxlength="12" aria-label="Booking ID"><input name="ph" placeholder="Mobile used (optional)" inputmode="numeric" maxlength="10" aria-label="Mobile number used for booking"></div>'
 '<p class="rv-note">Add your Booking ID and mobile to show a Verified customer tag.</p>'
 '<input class="hp" name="hp" tabindex="-1" autocomplete="off" aria-hidden="true">'
 '<p class="rv-err" id="rvErr" hidden></p><button class="btn btn-primary" type="submit">Submit review</button>'
 '<button type="button" class="rv-cancel" id="rvCancel">Cancel</button></form></div></section>')
put("reviews", html, "<!--S:bookbox-->")
css("reviews")
print("REVIEWS_OK")
