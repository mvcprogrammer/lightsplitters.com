#!/usr/bin/env bash
# Copy the approved web-sized photos into public/images/.
# Usage: npm run photos   (or PHOTOS_WEB=/path/to/_web bash scripts/sync-photos.sh)
# Never touches the originals — it only reads from the _web folder.
set -euo pipefail
SRC="${PHOTOS_WEB:-/Volumes/Storage Hot/LightSplitters Photos/_web}"
DEST="$(cd "$(dirname "$0")/.." && pwd)/public/images"
if [ ! -d "$SRC" ]; then
  echo "Can't find $SRC — set PHOTOS_WEB to your _web folder." >&2
  exit 1
fi
mkdir -p "$DEST"
cp -p "$SRC"/*-1200.* "$SRC"/*-2400.* "$DEST"/
echo "Copied $(ls "$DEST" | wc -l | tr -d ' ') files into public/images"
bash "$(dirname "$0")/couple-photos.sh" "$(dirname "$0")/../projects/couple-site/sample"
bash "$(dirname "$0")/couple-photos.sh" "$(dirname "$0")/../projects/couple-site/sample-album"
