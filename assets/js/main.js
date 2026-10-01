import { siteConfig as c } from "../../config/site.config.js";

document.title = c.brandName;
document.querySelector('[data-brand="name"]').textContent = c.brandName;
document.querySelector('[data-brand="tagline"]').textContent = c.tagline.en;
document.querySelector('[data-call]').href = "tel:" + c.phoneE164;
