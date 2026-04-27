#!/bin/bash

# ===================================
# library update script
# ===================================
# checks for newer versions of CDN libraries and downloads them locally
# usage: ./bin/library-update.sh [--force]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LIBS_DIR="$PROJECT_DIR/libs"

# colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # no Color

# force update flag
FORCE=false
if [[ "$1" == "--force" ]]; then
    FORCE=true
fi

echo -e "${GREEN}=== library update script ===${NC}\n"

# ===================================
# HELPER FUNCTIONS
# ===================================

# compare semantic versions and determine update type
# returns: "major", "minor", "patch", or "none"
compare_versions() {
    local current="$1"
    local latest="$2"

    # parse versions
    IFS='.' read -ra CURR <<< "$current"
    IFS='.' read -ra LATE <<< "$latest"

    local curr_major="${CURR[0]}"
    local curr_minor="${CURR[1]}"
    local curr_patch="${CURR[2]}"

    local late_major="${LATE[0]}"
    local late_minor="${LATE[1]}"
    local late_patch="${LATE[2]}"

    # compare
    if [[ "$late_major" != "$curr_major" ]]; then
        echo "major"
    elif [[ "$late_minor" != "$curr_minor" ]]; then
        echo "minor"
    elif [[ "$late_patch" != "$curr_patch" ]]; then
        echo "patch"
    else
        echo "none"
    fi
}

# ===================================
# GSAP (from cdnjs)
# ===================================
echo -e "${YELLOW}checking GSAP ...${NC}"

GSAP_CURRENT_VERSION="3.13.0"
GSAP_API_URL="https://api.cdnjs.com/libraries/gsap?fields=version,filename"
GSAP_LATEST=$(curl -s "$GSAP_API_URL" | grep -o '"version":"[^"]*' | cut -d'"' -f4)

echo "  current: $GSAP_CURRENT_VERSION"
echo "  latest:  $GSAP_LATEST"

UPDATE_TYPE=$(compare_versions "$GSAP_CURRENT_VERSION" "$GSAP_LATEST")

if [[ "$UPDATE_TYPE" == "major" ]]; then
    echo -e "  ${RED}⚠ MAJOR version update available!${NC}"
    echo -e "  ${YELLOW}  this may contain breaking changes${NC}"
    echo -e "  ${YELLOW}  run with GSAP_MAJOR_UPDATE=yes to update manually${NC}"
elif [[ "$UPDATE_TYPE" == "minor" ]]; then
    echo -e "  ${YELLOW}⚠ MINOR version update available!${NC}"
    echo -e "  ${YELLOW}  this adds new features but should be backward compatible${NC}"
    echo -e "  ${YELLOW}  run with GSAP_MINOR_UPDATE=yes to update manually${NC}"
elif [[ "$UPDATE_TYPE" == "patch" ]] || [[ "$FORCE" == true ]]; then
    if [[ "$UPDATE_TYPE" == "patch" ]]; then
        echo -e "  ${GREEN}→ downloading bugfix update ${GSAP_LATEST} ...${NC}"
    else
        echo -e "  ${GREEN}→ force downloading GSAP ${GSAP_LATEST} ...${NC}"
    fi

    mkdir -p "$LIBS_DIR/gsap"

    # download gsap.min.js
    curl -s "https://cdnjs.cloudflare.com/ajax/libs/gsap/${GSAP_LATEST}/gsap.min.js" \
        -o "$LIBS_DIR/gsap/gsap.min.js"

    # download ScrollTrigger.min.js
    curl -s "https://cdnjs.cloudflare.com/ajax/libs/gsap/${GSAP_LATEST}/ScrollTrigger.min.js" \
        -o "$LIBS_DIR/gsap/ScrollTrigger.min.js"

    echo -e "  ${GREEN}✓ downloaded GSAP ${GSAP_LATEST}${NC}"

    # update version in this script
    sed -i.bak "s/GSAP_CURRENT_VERSION=\".*\"/GSAP_CURRENT_VERSION=\"${GSAP_LATEST}\"/" "$0"
    rm "${0}.bak" 2>/dev/null || true
else
    echo -e "  ${GREEN}✓ already up to date${NC}"
fi

# manual update checks
if [[ "$UPDATE_TYPE" == "major" ]] && [[ "$GSAP_MAJOR_UPDATE" == "yes" ]]; then
    echo -e "  ${GREEN}→ manual MAJOR update to ${GSAP_LATEST} ...${NC}"
    mkdir -p "$LIBS_DIR/gsap"
    curl -s "https://cdnjs.cloudflare.com/ajax/libs/gsap/${GSAP_LATEST}/gsap.min.js" -o "$LIBS_DIR/gsap/gsap.min.js"
    curl -s "https://cdnjs.cloudflare.com/ajax/libs/gsap/${GSAP_LATEST}/ScrollTrigger.min.js" -o "$LIBS_DIR/gsap/ScrollTrigger.min.js"
    sed -i.bak "s/GSAP_CURRENT_VERSION=\".*\"/GSAP_CURRENT_VERSION=\"${GSAP_LATEST}\"/" "$0"
    rm "${0}.bak" 2>/dev/null || true
    echo -e "  ${GREEN}✓ updated to GSAP ${GSAP_LATEST}${NC}"
elif [[ "$UPDATE_TYPE" == "minor" ]] && [[ "$GSAP_MINOR_UPDATE" == "yes" ]]; then
    echo -e "  ${GREEN}→ manual MINOR update to ${GSAP_LATEST} ...${NC}"
    mkdir -p "$LIBS_DIR/gsap"
    curl -s "https://cdnjs.cloudflare.com/ajax/libs/gsap/${GSAP_LATEST}/gsap.min.js" -o "$LIBS_DIR/gsap/gsap.min.js"
    curl -s "https://cdnjs.cloudflare.com/ajax/libs/gsap/${GSAP_LATEST}/ScrollTrigger.min.js" -o "$LIBS_DIR/gsap/ScrollTrigger.min.js"
    sed -i.bak "s/GSAP_CURRENT_VERSION=\".*\"/GSAP_CURRENT_VERSION=\"${GSAP_LATEST}\"/" "$0"
    rm "${0}.bak" 2>/dev/null || true
    echo -e "  ${GREEN}✓ updated to GSAP ${GSAP_LATEST}${NC}"
fi

echo ""

# ===================================
# FullCalendar (from jsdelivr/npm)
# ===================================
echo -e "${YELLOW}checking FullCalendar ...${NC}"

FC_CURRENT_VERSION="6.1.20"
FC_API_URL="https://registry.npmjs.org/fullcalendar/latest"
FC_LATEST=$(curl -s "$FC_API_URL" | grep -o '"version":"[^"]*' | head -1 | cut -d'"' -f4)

echo "  current: $FC_CURRENT_VERSION"
echo "  latest:  $FC_LATEST"

UPDATE_TYPE=$(compare_versions "$FC_CURRENT_VERSION" "$FC_LATEST")

if [[ "$UPDATE_TYPE" == "major" ]]; then
    echo -e "  ${RED}⚠ MAJOR version update available!${NC}"
    echo -e "  ${YELLOW}  this may contain breaking changes${NC}"
    echo -e "  ${YELLOW}  run with FC_MAJOR_UPDATE=yes to update manually${NC}"
elif [[ "$UPDATE_TYPE" == "minor" ]]; then
    echo -e "  ${YELLOW}⚠ MINOR version update available!${NC}"
    echo -e "  ${YELLOW}  this adds new features but should be backward compatible${NC}"
    echo -e "  ${YELLOW}  run with FC_MINOR_UPDATE=yes to update manually${NC}"
elif [[ "$UPDATE_TYPE" == "patch" ]] || [[ "$FORCE" == true ]]; then
    if [[ "$UPDATE_TYPE" == "patch" ]]; then
        echo -e "  ${GREEN}→ downloading bugfix update ${FC_LATEST} ...${NC}"
    else
        echo -e "  ${GREEN}→ force downloading FullCalendar ${FC_LATEST} ...${NC}"
    fi

    mkdir -p "$LIBS_DIR/fullcalendar"

    # download index.global.min.js (CSS is bundled inline)
    curl -s "https://cdn.jsdelivr.net/npm/fullcalendar@${FC_LATEST}/index.global.min.js" \
        -o "$LIBS_DIR/fullcalendar/index.global.min.js"

    echo -e "  ${GREEN}✓ downloaded FullCalendar ${FC_LATEST}${NC}"

    # update version in this script
    sed -i.bak "s/FC_CURRENT_VERSION=\".*\"/FC_CURRENT_VERSION=\"${FC_LATEST}\"/" "$0"
    rm "${0}.bak" 2>/dev/null || true
else
    echo -e "  ${GREEN}✓ already up to date${NC}"
fi

# manual update checks
if [[ "$UPDATE_TYPE" == "major" ]] && [[ "$FC_MAJOR_UPDATE" == "yes" ]]; then
    echo -e "  ${GREEN}→ manual MAJOR update to ${FC_LATEST} ...${NC}"
    mkdir -p "$LIBS_DIR/fullcalendar"
    curl -s "https://cdn.jsdelivr.net/npm/fullcalendar@${FC_LATEST}/index.global.min.js" -o "$LIBS_DIR/fullcalendar/index.global.min.js"
    sed -i.bak "s/FC_CURRENT_VERSION=\".*\"/FC_CURRENT_VERSION=\"${FC_LATEST}\"/" "$0"
    rm "${0}.bak" 2>/dev/null || true
    echo -e "  ${GREEN}✓ updated to FullCalendar ${FC_LATEST}${NC}"
elif [[ "$UPDATE_TYPE" == "minor" ]] && [[ "$FC_MINOR_UPDATE" == "yes" ]]; then
    echo -e "  ${GREEN}→ manual MINOR update to ${FC_LATEST} ...${NC}"
    mkdir -p "$LIBS_DIR/fullcalendar"
    curl -s "https://cdn.jsdelivr.net/npm/fullcalendar@${FC_LATEST}/index.global.min.js" -o "$LIBS_DIR/fullcalendar/index.global.min.js"
    sed -i.bak "s/FC_CURRENT_VERSION=\".*\"/FC_CURRENT_VERSION=\"${FC_LATEST}\"/" "$0"
    rm "${0}.bak" 2>/dev/null || true
    echo -e "  ${GREEN}✓ updated to FullCalendar ${FC_LATEST}${NC}"
fi

echo ""

# ===================================
# summary
# ===================================
echo -e "${GREEN}=== update complate ===${NC}"
echo "libraries stored in: $LIBS_DIR"
echo ""
echo -e "${YELLOW}run with --force to re-download even if versions match${NC}"
