#!/usr/bin/env bash
# Publish a client site (couple website or family album) at <slug>.lightsplitters.com.
# Usage: bash scripts/new-couple-site.sh thesmiths ./couples/thesmiths
#        bash scripts/new-couple-site.sh rivera-album ./albums/rivera   (site.json with "kind": "album")
#   ./couples/thesmiths must contain site.json. Its photos/ folder is filled from the
#   approved _web photos for every slug site.json references (see couple-photos.sh);
#   publishing stops if any referenced photo is missing.
set -euo pipefail
: "${LS_BUCKET:?Set LS_BUCKET}"
SLUG="${1:?slug, e.g. thesmiths}"
DIR="${2:?folder with site.json and photos/}"
[[ "$SLUG" =~ ^[a-z0-9][a-z0-9-]*[a-z0-9]$ ]] || { echo "Slug must be lowercase letters, numbers, dashes"; exit 1; }
[ -f "$DIR/site.json" ] || { echo "Missing $DIR/site.json"; exit 1; }
cd "$(dirname "$0")/.."

bash scripts/couple-photos.sh "$DIR"
npx ng build couple-site >/dev/null
aws s3 cp dist/couple-site/browser/index.html "s3://$LS_BUCKET/sites/$SLUG/index.html" --cache-control "public,max-age=0,must-revalidate"
aws s3 cp "$DIR/site.json" "s3://$LS_BUCKET/sites/$SLUG/site.json" --cache-control "public,max-age=60"
aws s3 sync "$DIR/photos" "s3://$LS_BUCKET/sites/$SLUG/photos" --cache-control "public,max-age=31536000"
echo "Live at https://$SLUG.lightsplitters.com (no DNS change needed — wildcard record)."
