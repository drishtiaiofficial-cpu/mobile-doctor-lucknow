#!/usr/bin/env bash
# Deploys the site to Cloudflare Pages. Needs CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID in the environment.
set -e
cd "$(dirname "$0")/.."
rm -rf /tmp/site && mkdir /tmp/site
for f in *.html _headers assets config admin brands sw.js manifest.webmanifest robots.txt sitemap.xml; do
  [ -e "$f" ] && cp -r "$f" /tmp/site/ || true
done
npx --yes wrangler pages project create mobile-doctor-lucknow --production-branch main >/dev/null 2>&1 || true
npx --yes wrangler pages deploy /tmp/site --project-name mobile-doctor-lucknow --branch main
