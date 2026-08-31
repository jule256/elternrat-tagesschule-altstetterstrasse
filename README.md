# Parent Council Website - Tagesschule Altstetterstrasse

This is the official website for the Parent Council (Elternrat) of the Tagesschule Altstetterstrasse in Zürich Altstetten. The site serves as representation of the Parent Council, highlighting upcoming events (co-)organized by the Parent Council and encouraging active participation in the school community.

<p align="center"> 
🌏 <a href="https://www.elternrat-altstetterstrasse.ch/">www.elternrat-altstetterstrasse.ch</a> 🌍
</p> 

## ✨ Features

- **Modern One-Pager:** A clean, single-page scroll experience.
- **GSAP ScrollTrigger:** High-end parallax effects and layered pinning animations for a professional feel.
- **FullCalendar Integration:** A dynamic agenda powered by a local `events.json` file.
- **Responsive Design:** Optimized specifically for smartphones to ensure accessibility via class chat links.
- **Cache-Busting & Build System:** A custom script ensures that all updates are immediately visible on mobile devices.

---

## 🛠 Technical Stack

The website is intentionally built without heavy frameworks to ensure long-term maintainability and simplicity.

- **HTML5 / CSS3:** Uses CSS Variables for consistent branding and spacing
- **JavaScript (Vanilla):** Native logic for core interactions
- **[GSAP (GreenSock)](https://gsap.com/):** Industrial-grade animation library
- **[FullCalendar](https://fullcalendar.io/):** Robust library for rendering the event list

### Directory Structure
- `/bin`: Contains the release automation script
- `/assets`: Data files (like `events.json`), SVGs, and brand assets
- `/images`: High-resolution photography for event sections
- `/fonts`: Local webfonts (Helvetica Neue LT)
- `/release`: The production-ready distribution folder (generated automatically)
- `/qr`: The QR redirect + visit-tracking script (`index.php`)

### AI-Collaborative Development

This project was built using a hybrid approach of traditional engineering and state-of-the-art AI collaboration

- **Claude Code & Gemini:** Utilized for rapid prototyping, complex GSAP animation logic, and the implementation of the custom release system
- **Traditional Coding:** All AI-generated logic was manually reviewed, refined, and bug-fixed to ensure high performance and cross-browser stability
- **Problem Solving:** AI was used as a pair-programmer to tackle edge cases in mobile caching and responsive layout behavior

---

## 🚀 Release Process

Mobile browsers (WhatsApp, Safari, Chrome) cache CSS and JS files aggressively. To bypass this, our release script generates versioned filenames for every deployment.

### How to publish a new version:

1. **Preparation:**
   Ensure the `/release` directory is empty (except for the `.gitkeep` file)

2. **Execute the Script:**
   Open your terminal in the project root and run
   ```bash
   ./bin/release.sh v1.0.1
   ````
   (replace `v1.0.1` with your actual version string)

3. **What the script does:**
   - Creates versioned copies (e.g., `script-v1.0.1.js`) in the `/release` folder

   - Bundles all assets, images, and fonts into the distribution folder

   - Injects the version string into `script.js` (replaces developer-preview)

   - Appends a cache-buster query parameter to the events.json fetch call

   - Updates all file references in the production `index.html`

4. **Deployment:**
    Upload the contents of the /release folder to your web server via SFTP

---

## 📦 Library Management

The website hosts third-party libraries locally (in `/libs`) to reduce CDN dependencies and enable offline development. The `bin/library-update.sh` script automates checking for updates and downloading newer versions.

### Managed Libraries

- **GSAP** (GreenSock Animation Platform) + ScrollTrigger plugin
- **FullCalendar** (calendar/agenda component)

### How to check for updates:

```bash
./bin/library-update.sh
```

### Semantic Versioning Policy

The script respects semantic versioning to prevent breaking changes:

- **Patch updates (e.g., 6.1.20 → 6.1.21):** Auto-downloaded (bugfixes only)
- **Minor updates (e.g., 6.1.x → 6.2.0):** Manual approval required
- **Major updates (e.g., 6.x.x → 7.0.0):** Manual approval required

If a minor or major update is available, the script will display instructions:

```bash
# for minor updates
GSAP_MINOR_UPDATE=yes ./bin/library-update.sh

# for major updates
GSAP_MAJOR_UPDATE=yes ./bin/library-update.sh
```

Replace `GSAP` with `FC` for FullCalendar updates.

### Force re-download

To re-download libraries even when already up-to-date:

```bash
./bin/library-update.sh --force
```

---

## 📅 Updating the Agenda

Events are managed in `assets/events.json`. The file follows the FullCalendar standard format:

```json
JSON
[
  {
    "title": "Advent Singing",
    "start": "2026-12-01T18:00:00",
    "extendedProps": {
      "location": "School Yard",
      "description": "Community singing with punch and cookies"
    }
  }
]
```

## 📷 QR Redirect & Visit Tracking

A short URL (`https://www.elternrat-altstetterstrasse.ch/qr`) is used on printed QR codes. When someone scans the code, a small PHP script logs the visit to a CSV file and then redirects the visitor to the homepage with a `302` response.

<div align="center">
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 43 43" shape-rendering="crispEdges" role="img" aria-label="QR code: https://www.elternrat-altstetterstrasse.ch/qr?src=github"><rect width="100%" height="100%" fill="#FFF"/><path d="M1 1 h7 v1 h-7 z M9 1 h1 v1 h-1 z M12 1 h3 v1 h-3 z M20 1 h1 v1 h-1 z M22 1 h1 v1 h-1 z M24 1 h1 v1 h-1 z M27 1 h1 v1 h-1 z M29 1 h1 v1 h-1 z M31 1 h3 v1 h-3 z M35 1 h7 v1 h-7 z M1 2 h1 v1 h-1 z M7 2 h1 v1 h-1 z M9 2 h2 v1 h-2 z M12 2 h7 v1 h-7 z M21 2 h2 v1 h-2 z M28 2 h2 v1 h-2 z M33 2 h1 v1 h-1 z M35 2 h1 v1 h-1 z M41 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M3 3 h3 v1 h-3 z M7 3 h1 v1 h-1 z M9 3 h1 v1 h-1 z M12 3 h3 v1 h-3 z M16 3 h2 v1 h-2 z M19 3 h1 v1 h-1 z M22 3 h1 v1 h-1 z M27 3 h1 v1 h-1 z M29 3 h1 v1 h-1 z M31 3 h2 v1 h-2 z M35 3 h1 v1 h-1 z M37 3 h3 v1 h-3 z M41 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M3 4 h3 v1 h-3 z M7 4 h1 v1 h-1 z M10 4 h2 v1 h-2 z M13 4 h1 v1 h-1 z M15 4 h5 v1 h-5 z M22 4 h1 v1 h-1 z M25 4 h1 v1 h-1 z M29 4 h2 v1 h-2 z M35 4 h1 v1 h-1 z M37 4 h3 v1 h-3 z M41 4 h1 v1 h-1 z M1 5 h1 v1 h-1 z M3 5 h3 v1 h-3 z M7 5 h1 v1 h-1 z M10 5 h1 v1 h-1 z M12 5 h4 v1 h-4 z M17 5 h2 v1 h-2 z M22 5 h1 v1 h-1 z M26 5 h2 v1 h-2 z M29 5 h1 v1 h-1 z M31 5 h3 v1 h-3 z M35 5 h1 v1 h-1 z M37 5 h3 v1 h-3 z M41 5 h1 v1 h-1 z M1 6 h1 v1 h-1 z M7 6 h1 v1 h-1 z M9 6 h3 v1 h-3 z M13 6 h1 v1 h-1 z M15 6 h1 v1 h-1 z M17 6 h1 v1 h-1 z M20 6 h1 v1 h-1 z M22 6 h2 v1 h-2 z M26 6 h1 v1 h-1 z M28 6 h3 v1 h-3 z M33 6 h1 v1 h-1 z M35 6 h1 v1 h-1 z M41 6 h1 v1 h-1 z M1 7 h7 v1 h-7 z M9 7 h1 v1 h-1 z M11 7 h1 v1 h-1 z M13 7 h1 v1 h-1 z M15 7 h1 v1 h-1 z M17 7 h1 v1 h-1 z M19 7 h1 v1 h-1 z M21 7 h1 v1 h-1 z M23 7 h1 v1 h-1 z M25 7 h1 v1 h-1 z M27 7 h1 v1 h-1 z M29 7 h1 v1 h-1 z M31 7 h1 v1 h-1 z M33 7 h1 v1 h-1 z M35 7 h7 v1 h-7 z M9 8 h1 v1 h-1 z M11 8 h3 v1 h-3 z M16 8 h1 v1 h-1 z M21 8 h3 v1 h-3 z M26 8 h4 v1 h-4 z M3 9 h3 v1 h-3 z M7 9 h1 v1 h-1 z M9 9 h1 v1 h-1 z M14 9 h3 v1 h-3 z M18 9 h1 v1 h-1 z M21 9 h4 v1 h-4 z M27 9 h2 v1 h-2 z M30 9 h1 v1 h-1 z M33 9 h4 v1 h-4 z M39 9 h3 v1 h-3 z M1 10 h1 v1 h-1 z M3 10 h1 v1 h-1 z M5 10 h1 v1 h-1 z M8 10 h4 v1 h-4 z M16 10 h2 v1 h-2 z M19 10 h4 v1 h-4 z M24 10 h1 v1 h-1 z M27 10 h1 v1 h-1 z M29 10 h2 v1 h-2 z M32 10 h2 v1 h-2 z M35 10 h3 v1 h-3 z M39 10 h1 v1 h-1 z M41 10 h1 v1 h-1 z M1 11 h2 v1 h-2 z M4 11 h1 v1 h-1 z M7 11 h1 v1 h-1 z M12 11 h1 v1 h-1 z M16 11 h1 v1 h-1 z M18 11 h4 v1 h-4 z M23 11 h2 v1 h-2 z M26 11 h1 v1 h-1 z M28 11 h2 v1 h-2 z M33 11 h2 v1 h-2 z M37 11 h1 v1 h-1 z M40 11 h1 v1 h-1 z M1 12 h5 v1 h-5 z M9 12 h1 v1 h-1 z M11 12 h1 v1 h-1 z M13 12 h2 v1 h-2 z M16 12 h3 v1 h-3 z M20 12 h4 v1 h-4 z M27 12 h3 v1 h-3 z M31 12 h3 v1 h-3 z M35 12 h4 v1 h-4 z M40 12 h2 v1 h-2 z M2 13 h4 v1 h-4 z M7 13 h3 v1 h-3 z M12 13 h2 v1 h-2 z M18 13 h1 v1 h-1 z M21 13 h1 v1 h-1 z M24 13 h1 v1 h-1 z M27 13 h2 v1 h-2 z M30 13 h1 v1 h-1 z M32 13 h3 v1 h-3 z M38 13 h3 v1 h-3 z M2 14 h1 v1 h-1 z M4 14 h1 v1 h-1 z M8 14 h2 v1 h-2 z M12 14 h2 v1 h-2 z M15 14 h1 v1 h-1 z M20 14 h3 v1 h-3 z M24 14 h2 v1 h-2 z M28 14 h2 v1 h-2 z M32 14 h2 v1 h-2 z M35 14 h4 v1 h-4 z M40 14 h2 v1 h-2 z M1 15 h1 v1 h-1 z M4 15 h5 v1 h-5 z M10 15 h2 v1 h-2 z M13 15 h4 v1 h-4 z M18 15 h1 v1 h-1 z M20 15 h1 v1 h-1 z M24 15 h1 v1 h-1 z M26 15 h2 v1 h-2 z M33 15 h2 v1 h-2 z M38 15 h1 v1 h-1 z M1 16 h1 v1 h-1 z M4 16 h1 v1 h-1 z M6 16 h1 v1 h-1 z M8 16 h1 v1 h-1 z M11 16 h4 v1 h-4 z M17 16 h3 v1 h-3 z M21 16 h3 v1 h-3 z M25 16 h1 v1 h-1 z M29 16 h1 v1 h-1 z M35 16 h1 v1 h-1 z M37 16 h2 v1 h-2 z M40 16 h1 v1 h-1 z M1 17 h1 v1 h-1 z M3 17 h1 v1 h-1 z M6 17 h3 v1 h-3 z M10 17 h1 v1 h-1 z M13 17 h2 v1 h-2 z M19 17 h2 v1 h-2 z M23 17 h1 v1 h-1 z M25 17 h1 v1 h-1 z M30 17 h5 v1 h-5 z M36 17 h1 v1 h-1 z M38 17 h2 v1 h-2 z M2 18 h2 v1 h-2 z M9 18 h3 v1 h-3 z M13 18 h1 v1 h-1 z M15 18 h2 v1 h-2 z M18 18 h1 v1 h-1 z M22 18 h3 v1 h-3 z M27 18 h1 v1 h-1 z M30 18 h4 v1 h-4 z M35 18 h4 v1 h-4 z M40 18 h2 v1 h-2 z M3 19 h1 v1 h-1 z M5 19 h4 v1 h-4 z M13 19 h5 v1 h-5 z M19 19 h1 v1 h-1 z M21 19 h3 v1 h-3 z M28 19 h1 v1 h-1 z M31 19 h1 v1 h-1 z M33 19 h2 v1 h-2 z M37 19 h2 v1 h-2 z M1 20 h2 v1 h-2 z M4 20 h2 v1 h-2 z M9 20 h2 v1 h-2 z M13 20 h4 v1 h-4 z M18 20 h1 v1 h-1 z M23 20 h1 v1 h-1 z M26 20 h3 v1 h-3 z M31 20 h2 v1 h-2 z M37 20 h2 v1 h-2 z M40 20 h1 v1 h-1 z M1 21 h1 v1 h-1 z M3 21 h2 v1 h-2 z M7 21 h2 v1 h-2 z M13 21 h1 v1 h-1 z M21 21 h2 v1 h-2 z M24 21 h2 v1 h-2 z M27 21 h1 v1 h-1 z M30 21 h1 v1 h-1 z M38 21 h2 v1 h-2 z M1 22 h1 v1 h-1 z M3 22 h2 v1 h-2 z M9 22 h1 v1 h-1 z M11 22 h1 v1 h-1 z M20 22 h3 v1 h-3 z M24 22 h1 v1 h-1 z M26 22 h1 v1 h-1 z M29 22 h1 v1 h-1 z M32 22 h2 v1 h-2 z M35 22 h7 v1 h-7 z M2 23 h1 v1 h-1 z M5 23 h5 v1 h-5 z M13 23 h4 v1 h-4 z M19 23 h2 v1 h-2 z M22 23 h2 v1 h-2 z M25 23 h1 v1 h-1 z M27 23 h2 v1 h-2 z M30 23 h1 v1 h-1 z M33 23 h2 v1 h-2 z M38 23 h2 v1 h-2 z M1 24 h4 v1 h-4 z M8 24 h2 v1 h-2 z M12 24 h2 v1 h-2 z M16 24 h1 v1 h-1 z M19 24 h2 v1 h-2 z M22 24 h2 v1 h-2 z M28 24 h2 v1 h-2 z M33 24 h3 v1 h-3 z M37 24 h2 v1 h-2 z M40 24 h1 v1 h-1 z M1 25 h1 v1 h-1 z M5 25 h1 v1 h-1 z M7 25 h1 v1 h-1 z M10 25 h5 v1 h-5 z M16 25 h3 v1 h-3 z M21 25 h1 v1 h-1 z M25 25 h4 v1 h-4 z M30 25 h1 v1 h-1 z M32 25 h1 v1 h-1 z M36 25 h1 v1 h-1 z M38 25 h4 v1 h-4 z M1 26 h1 v1 h-1 z M4 26 h1 v1 h-1 z M9 26 h2 v1 h-2 z M13 26 h2 v1 h-2 z M16 26 h5 v1 h-5 z M22 26 h5 v1 h-5 z M29 26 h1 v1 h-1 z M32 26 h1 v1 h-1 z M34 26 h5 v1 h-5 z M41 26 h1 v1 h-1 z M1 27 h2 v1 h-2 z M4 27 h1 v1 h-1 z M7 27 h1 v1 h-1 z M10 27 h1 v1 h-1 z M13 27 h4 v1 h-4 z M18 27 h3 v1 h-3 z M23 27 h3 v1 h-3 z M27 27 h2 v1 h-2 z M33 27 h1 v1 h-1 z M35 27 h2 v1 h-2 z M2 28 h1 v1 h-1 z M4 28 h1 v1 h-1 z M8 28 h2 v1 h-2 z M13 28 h3 v1 h-3 z M18 28 h1 v1 h-1 z M21 28 h2 v1 h-2 z M27 28 h1 v1 h-1 z M29 28 h1 v1 h-1 z M31 28 h3 v1 h-3 z M37 28 h2 v1 h-2 z M3 29 h8 v1 h-8 z M12 29 h1 v1 h-1 z M16 29 h2 v1 h-2 z M19 29 h2 v1 h-2 z M23 29 h1 v1 h-1 z M30 29 h1 v1 h-1 z M32 29 h1 v1 h-1 z M36 29 h1 v1 h-1 z M38 29 h3 v1 h-3 z M1 30 h1 v1 h-1 z M3 30 h2 v1 h-2 z M6 30 h1 v1 h-1 z M9 30 h3 v1 h-3 z M13 30 h3 v1 h-3 z M18 30 h7 v1 h-7 z M28 30 h1 v1 h-1 z M30 30 h1 v1 h-1 z M32 30 h6 v1 h-6 z M41 30 h1 v1 h-1 z M1 31 h1 v1 h-1 z M3 31 h1 v1 h-1 z M7 31 h2 v1 h-2 z M10 31 h1 v1 h-1 z M13 31 h1 v1 h-1 z M15 31 h3 v1 h-3 z M19 31 h1 v1 h-1 z M25 31 h2 v1 h-2 z M28 31 h1 v1 h-1 z M30 31 h1 v1 h-1 z M33 31 h3 v1 h-3 z M39 31 h1 v1 h-1 z M1 32 h1 v1 h-1 z M3 32 h3 v1 h-3 z M8 32 h2 v1 h-2 z M11 32 h3 v1 h-3 z M16 32 h2 v1 h-2 z M19 32 h3 v1 h-3 z M24 32 h1 v1 h-1 z M27 32 h1 v1 h-1 z M31 32 h6 v1 h-6 z M38 32 h1 v1 h-1 z M40 32 h1 v1 h-1 z M1 33 h1 v1 h-1 z M6 33 h5 v1 h-5 z M12 33 h4 v1 h-4 z M18 33 h2 v1 h-2 z M21 33 h1 v1 h-1 z M25 33 h4 v1 h-4 z M30 33 h1 v1 h-1 z M33 33 h5 v1 h-5 z M39 33 h1 v1 h-1 z M9 34 h2 v1 h-2 z M12 34 h1 v1 h-1 z M14 34 h1 v1 h-1 z M16 34 h1 v1 h-1 z M18 34 h7 v1 h-7 z M26 34 h2 v1 h-2 z M29 34 h1 v1 h-1 z M31 34 h3 v1 h-3 z M37 34 h1 v1 h-1 z M41 34 h1 v1 h-1 z M1 35 h7 v1 h-7 z M10 35 h1 v1 h-1 z M12 35 h2 v1 h-2 z M16 35 h1 v1 h-1 z M18 35 h1 v1 h-1 z M21 35 h1 v1 h-1 z M24 35 h6 v1 h-6 z M32 35 h2 v1 h-2 z M35 35 h1 v1 h-1 z M37 35 h1 v1 h-1 z M39 35 h1 v1 h-1 z M1 36 h1 v1 h-1 z M7 36 h1 v1 h-1 z M11 36 h1 v1 h-1 z M13 36 h4 v1 h-4 z M18 36 h2 v1 h-2 z M22 36 h1 v1 h-1 z M24 36 h1 v1 h-1 z M26 36 h2 v1 h-2 z M32 36 h2 v1 h-2 z M37 36 h2 v1 h-2 z M40 36 h1 v1 h-1 z M1 37 h1 v1 h-1 z M3 37 h3 v1 h-3 z M7 37 h1 v1 h-1 z M9 37 h1 v1 h-1 z M11 37 h2 v1 h-2 z M14 37 h1 v1 h-1 z M16 37 h3 v1 h-3 z M20 37 h2 v1 h-2 z M25 37 h1 v1 h-1 z M27 37 h4 v1 h-4 z M33 37 h7 v1 h-7 z M41 37 h1 v1 h-1 z M1 38 h1 v1 h-1 z M3 38 h3 v1 h-3 z M7 38 h1 v1 h-1 z M9 38 h1 v1 h-1 z M13 38 h1 v1 h-1 z M15 38 h1 v1 h-1 z M20 38 h2 v1 h-2 z M23 38 h1 v1 h-1 z M26 38 h1 v1 h-1 z M29 38 h1 v1 h-1 z M31 38 h2 v1 h-2 z M34 38 h1 v1 h-1 z M36 38 h1 v1 h-1 z M41 38 h1 v1 h-1 z M1 39 h1 v1 h-1 z M3 39 h3 v1 h-3 z M7 39 h1 v1 h-1 z M9 39 h3 v1 h-3 z M13 39 h3 v1 h-3 z M19 39 h1 v1 h-1 z M22 39 h2 v1 h-2 z M26 39 h5 v1 h-5 z M34 39 h7 v1 h-7 z M1 40 h1 v1 h-1 z M7 40 h1 v1 h-1 z M10 40 h1 v1 h-1 z M12 40 h3 v1 h-3 z M18 40 h1 v1 h-1 z M20 40 h4 v1 h-4 z M25 40 h3 v1 h-3 z M33 40 h1 v1 h-1 z M37 40 h2 v1 h-2 z M40 40 h1 v1 h-1 z M1 41 h7 v1 h-7 z M11 41 h3 v1 h-3 z M15 41 h2 v1 h-2 z M18 41 h1 v1 h-1 z M21 41 h1 v1 h-1 z M23 41 h1 v1 h-1 z M25 41 h1 v1 h-1 z M28 41 h1 v1 h-1 z M30 41 h2 v1 h-2 z M34 41 h1 v1 h-1 z M36 41 h4 v1 h-4 z" fill="#000"/></svg>
</div>

### How it works

The script lives in `/qr/index.php`. For every hit it:

- appends one CSV line with the UTC timestamp, browser `user-agent`, HTTP `referer`, an optional `src` channel tag, and an anonymized session id
- redirects the visitor to `/` (the homepage)

### Log file(s)

Both the live and preview environments write to the same shared data directory (outside the web root, so the logs are not directly downloadable), but each uses its own file:

- **Live (`www`):** `.../elternrat-altstetterstrasse.ch-data/qr/visits-www.csv`
- **Preview (`testing`):** `.../elternrat-altstetterstrasse.ch-data/qr/visits-testing.csv`

The target environment is detected from the request hostname (`testing.` prefix → `testing`, otherwise → `www`).

### Tracking different channels

To tell apart different QR codes (e.g. one on a flyer vs. one on a poster), append a `src` tag to the QR URL:

```
https://www.elternrat-altstetterstrasse.ch/qr?src=flyer
https://www.elternrat-altstetterstrasse.ch/qr?src=plakat
```

## 📜 License & Contact

Created for the Parent Council of Tagesschule Altstetterstrasse.
For technical inquiries or access to the source repository, please contact the administrator.

## 📬 Shared Email Inbox

The website features an email contact option via [kontakt@elternrat-altstetterstrasse.ch](mailto:kontakt@elternrat-altstetterstrasse.ch) with a [Roundcube web-interface](https://webmail.elternrat-altstetterstrasse.ch).

Every email sent to the contact email-address triggers a Roundcube notification using the Roundcube "Filters" functionality to alert various people of the Parent Council in their personal inbox. This way they know there is a new email in the shared inbox and can use the web-interface to read and reply.

Here is an example [filter configuration](https://srv77.tophost.ch:2096/cpsess5289712751/3rdparty/roundcube/?_task=settings&_action=plugin.managesieve) of this functionality

```
# rule:[notification about new emails to everyone]
if true
{
	notify :importance "2" :from "kontakt@elternrat-altstetterstrasse.ch" :message "INFO: Neue Email an den Elternrat, Name1" "mailto:name1@example.com?body=Lieber%20Name1%2C%0A%0Aes%20gibt%20eine%20neue%20Email-Nachricht%20an%20den%20Elternrat.%20Logge%20dich%20auf%20https%3A%2F%2Fwebmail.elternrat-altstetterstrasse.ch%20ein%20um%20sie%20zu%20lesen%20und%20gegebenenfalls%20zu%20antworten.%0A%0AName2%20und%20Name3%20wurden%20ebenfalls%20benachrichtigt.";
	notify :importance "2" :from "kontakt@elternrat-altstetterstrasse.ch" :message "INFO: Neue Email an den Elternrat, Name2" "mailto:name2@gmx.ch?body=Liebe%20Name2%2C%0A%0Aes%20gibt%20eine%20neue%20Email-Nachricht%20an%20den%20Elternrat.%20Logge%20dich%20auf%20https%3A%2F%2Fwebmail.elternrat-altstetterstrasse.ch%20ein%20um%20sie%20zu%20lesen%20und%20gegebenenfalls%20zu%20antworten.%0A%0AName1%20und%20Name3%20wurden%20ebenfalls%20benachrichtigt.";
	notify :importance "2" :from "kontakt@elternrat-altstetterstrasse.ch" :message "INFO: Neue Email an den Elternrat, Name3" "mailto:name3@gmail.com?body=Liebe%20Name3%2C%0A%0Aes%20gibt%20eine%20neue%20Email-Nachricht%20an%20den%20Elternrat.%20Logge%20dich%20auf%20https%3A%2F%2Fwebmail.elternrat-altstetterstrasse.ch%20ein%20um%20sie%20zu%20lesen%20und%20gegebenenfalls%20zu%20antworten.%0A%0AName1%20und%20Name2%20wurden%20ebenfalls%20benachrichtigt.";
}
```
