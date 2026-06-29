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
