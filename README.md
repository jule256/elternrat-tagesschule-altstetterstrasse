# Parent Council Website - Tagesschule Altstetterstrasse

This is the official website for the Parent Council (Elternrat) of the Tagesschule Altstetterstrasse in Zurich-Altstetten. The site serves as representation of the Parent Council, highlighting upcoming events (co-)organized by the Parent Council and encouraging active participation in the school community.

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
- **[GSAP (GreenSock)](https://gsap.com/):** Industrial-grade animation library (loaded via CDN)
- **[FullCalendar](https://fullcalendar.io/):** Robust library for rendering the event list

### Directory Structure
- `/bin`: Contains the release automation script
- `/assets`: Data files (like `events.json`), SVGs, and brand assets
- `/images`: High-resolution photography for event sections
- `/fonts`: Local webfonts (Helvetica Neue LT)
- `/release`: The production-ready distribution folder (generated automatically)

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

## 📜 License & Contact

Created for the Parent Council of Tagesschule Altstetterstrasse.
For technical inquiries or access to the source repository, please contact the administrator.