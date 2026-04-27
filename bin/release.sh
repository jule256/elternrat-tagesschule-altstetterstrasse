#!/bin/bash

# =================================================================
# RELEASE SCRIPT FOR ELTERNRAT WEBSITE
# =================================================================

# check if a version string is provided
if [ -z "$1" ]; then
  echo "error → please provide a version string (e.g., ./bin/release.sh v2)"
  exit 1
fi

NEW_VER=$1
RELEASE_DIR="release"

# move to the root directory (script is located in ./bin)
cd "$(dirname "$0")/.." || exit 1

echo "🚀 starting release process for version: $NEW_VER"

# -----------------------------------------------------------------
# 1. SAFETY CHECK: ensure release folder is empty
# -----------------------------------------------------------------
# check if directory contains more than just .gitkeep
# -A ignores . and ..
FILES_IN_RELEASE=$(ls -A "$RELEASE_DIR" | grep -v ".gitkeep")

if [ -n "$FILES_IN_RELEASE" ]; then
  echo "error → the '$RELEASE_DIR' directory is not empty"
  echo "please clear the directory (except .gitkeep) before running the script"
  exit 1
fi

# -----------------------------------------------------------------
# 2. DEFINE SOURCE AND TARGET FILENAMES
# -----------------------------------------------------------------
# sources are always the clean files in the root directory
SRC_SCRIPT="script.js"
SRC_CAL="calendar-init.js"
SRC_STYLE="styles.css"
SRC_INDEX="index.html"

# targets are versioned files inside the release folder
NEW_SCRIPT="script-$NEW_VER.js"
NEW_CAL="calendar-init-$NEW_VER.js"
NEW_STYLE="styles-$NEW_VER.css"

# -----------------------------------------------------------------
# 3. COPY CORE FILES TO RELEASE FOLDER
# -----------------------------------------------------------------
echo "   - copying clean source files to $RELEASE_DIR ..."
cp "$SRC_SCRIPT" "$RELEASE_DIR/$NEW_SCRIPT"
cp "$SRC_CAL" "$RELEASE_DIR/$NEW_CAL"
cp "$SRC_STYLE" "$RELEASE_DIR/$NEW_STYLE"
cp "$SRC_INDEX" "$RELEASE_DIR/index.html"

# -----------------------------------------------------------------
# 4. COPY ASSET DIRECTORIES
# -----------------------------------------------------------------
echo "   - copying asset directories (assets, fonts, images, libs) ..."
cp -R assets "$RELEASE_DIR/"
cp -R fonts "$RELEASE_DIR/"
cp -R images "$RELEASE_DIR/"
cp -R libs "$RELEASE_DIR/"

# -----------------------------------------------------------------
# 5. UPDATE REFERENCES (INSIDE RELEASE FOLDER ONLY)
# -----------------------------------------------------------------
echo "   - injecting version into $NEW_SCRIPT ..."
# replaces 'developer-preview' with the actual version string
sed -i "" "s|const version = 'developer-preview';|const version = '$NEW_VER';|g" "$RELEASE_DIR/$NEW_SCRIPT"

echo "   - injecting cache-buster into $NEW_CAL ..."
# appends ?v=version to the events.json call
sed -i "" "s|events\.json|events.json?v=$NEW_VER|g" "$RELEASE_DIR/$NEW_CAL"

echo "   - updating script/style references in $RELEASE_DIR/index.html ..."
sed -i "" "s|$SRC_SCRIPT|$NEW_SCRIPT|g" "$RELEASE_DIR/index.html"
sed -i "" "s|$SRC_CAL|$NEW_CAL|g" "$RELEASE_DIR/index.html"
sed -i "" "s|$SRC_STYLE|$NEW_STYLE|g" "$RELEASE_DIR/index.html"

# -----------------------------------------------------------------
# 6. VERIFICATION
# -----------------------------------------------------------------
echo "✅ finished → version $NEW_VER has been built in '$RELEASE_DIR'"
echo "   you can now upload the '$RELEASE_DIR' content to the web-server"