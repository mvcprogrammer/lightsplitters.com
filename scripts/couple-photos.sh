#!/usr/bin/env bash
# Fill a client folder's photos/ (couple site or family album) from the approved web-sized photos, driven by its site.json.
# Usage: bash scripts/couple-photos.sh projects/couple-site/sample
#   Copies <slug>-{1200,2400}.{jpg,webp} for every photo slug referenced in site.json
#   (heroPhoto, storyPhoto, coverPhoto, gallery) and fails if any file is missing from _web.
# Never touches the originals — it only reads from the _web folder.
set -euo pipefail
DIR="${1:?folder containing site.json}"
SRC="${PHOTOS_WEB:-/Volumes/Storage Hot/LightSplitters Photos/_web}"
[ -f "$DIR/site.json" ] || { echo "Missing $DIR/site.json" >&2; exit 1; }
[ -d "$SRC" ] || { echo "Can't find $SRC — set PHOTOS_WEB to your _web folder." >&2; exit 1; }

slugs=$(jq -r '[.heroPhoto, .storyPhoto, .coverPhoto, (.gallery // [])[]] | map(select(. != null) | .slug) | unique | .[]' "$DIR/site.json")
[ -n "$slugs" ] || { echo "No photos referenced in $DIR/site.json" >&2; exit 1; }

mkdir -p "$DIR/photos"
missing=0
for slug in $slugs; do
  for f in "$slug-1200.jpg" "$slug-1200.webp" "$slug-2400.jpg" "$slug-2400.webp"; do
    if [ -f "$SRC/$f" ]; then
      cp -p "$SRC/$f" "$DIR/photos/$f"
    else
      echo "Missing $SRC/$f (referenced by $DIR/site.json)" >&2
      missing=1
    fi
  done
done
[ "$missing" -eq 0 ] || exit 1

# Point out files that are no longer referenced (left in place; delete by hand if unwanted).
for f in "$DIR"/photos/*; do
  base=$(basename "$f"); s="${base%-*}"
  grep -qx "$s" <<<"$slugs" || echo "Note: $base is not referenced by site.json"
done
echo "$DIR/photos has $(echo "$slugs" | wc -l | tr -d ' ') photo slugs from site.json"
