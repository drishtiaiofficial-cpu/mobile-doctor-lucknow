// Single source of truth for all brand settings.
// Rename procedure: edit this file, run `python3 tools/apply_config.py`, commit, push.
// Values marked CONFIRM are placeholders until the client confirms them.

export const siteConfig = {
  brandName: "Mobile Doctor Lucknow",
  brandShort: "Mobile Doctor",
  tagline: {
    en: "Your phone's doctor, at your doorstep",
    hinglish: "Aapke phone ka doctor, aapke darwaze par",
  },
  city: "Lucknow",

  // CONFIRM with client before launch
  phoneDisplay: "+91 70078 82051",
  phoneE164: "+917007882051",
  whatsappE164: "917007882051",
  contactEmail: "",

  social: { instagram: "", youtube: "", facebook: "", googleReview: "" },

  colors: { primary: "#C8102E", ink: "#14171F", accent: "#C9A227" },

  supabaseUrl: "",
  supabaseAnonKey: "",

  metaPixelId: "",
  siteUrl: "",
  pincodePrefixes: ["226"],
};
