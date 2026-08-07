# 🚀 IRCC // AURA — Futuristic Visa Intelligence & Tracker HUD

<div align="center">

![IRCC AURA Banner](https://img.shields.io/badge/IRCC_AURA-HUD_v3.4-00f0ff?style=for-the-badge&logo=electron&logoColor=black)
![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Status](https://img.shields.io/badge/Status-Online_%26_Deployed-10b981?style=for-the-badge)

<p align="center">
  <strong>An ultra-modern, high-tech Canadian Visa Intelligence Platform & Application Tracker with real-time milestone telemetry, 50+ country processing estimators, AI ETA prediction, missing defect detection, settlement funds calculator, OCR document locker, and GCMS/ATIP decoder.</strong>
</p>

</div>

---

## 🌌 Project Overview & Idea

Applying for and tracking an **Immigration, Refugees and Citizenship Canada (IRCC)** visa or permanent residence application can often feel like navigating a black box. **IRCC AURA** is built with a sleek, futuristic **Cyberpunk / Sci-Fi HUD** theme to provide complete visibility, predictability, and proactive guidance throughout your entire immigration journey.

Whether you are applying for a **Study Permit**, **Express Entry (CEC / FSWP)**, **Visitor Visa (TRV)**, **Spousal Sponsorship**, or **Post-Graduation Work Permit (PGWP)**, the system:
- 📡 **Tracks your 7-stage visa pipeline** with milestone logs and "Ghost Update" detection.
- 🌍 **Estimates decision times for 50+ countries** factoring in visa office queues, upfront medicals, and seasonal surges.
- 🛡️ **Identifies missing items & urgent actions** with real-time deadline countdowns (BIL, ADR, PCC, DLI confirmation).
- 💰 **Calculates updated 2024–2026 Proof of Funds** and cost-of-living requirements for singles and families.
- 🗄️ **Audits documents via AI OCR scoring** and enforces IRCC size & format rules.
- ✉️ **Generates formal IRCC Webform inquiries** with one-click copy and text download for delayed files.
- 🔍 **Decodes mysterious GCMS / ATIP notes** (`A11.2 MET`, `BGC IP2`, `PUM`, `M1`, `CSIS`).
- 🛬 **Guides your post-approval arrival** with ArriveCAN, SIN, GIC banking, and OHIP/MSP health insurance checklists.

---

## ⚡ Quick Start: How to Start Up the Server

Follow these simple steps to run the platform locally or in your sandbox:

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### 1. Clone or Navigate to the Repository
```bash
git clone https://github.com/gamer-09/ircc-track.git
cd ircc-track
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

The Vite dev server starts with host `0.0.0.0` on port `3000`:
- **Local URL**: `http://localhost:3000`
- **Network / Proxy Preview**: `http://0.0.0.0:3000`

### 4. Build for Production
To generate an optimized, minified production build in the `dist/` directory:
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🛠️ Key Features Breakdown

### 1. 🛰️ Official 7-Stage IRCC Pipeline Tracker
- **Stage 1: Application & Fee Submission** (Portal payment confirmation)
- **Stage 2: AOR Issued** (Acknowledgement of Receipt & primary Visa Office assigned)
- **Stage 3: Biometrics Collection (BIL)** (VFS Global appointment & 10-year validity stamp)
- **Stage 4: Medical Exam (IME)** (eMedical sheet validation & M1 non-excessive demand rating)
- **Stage 5: Eligibility & Background Check (BGC)** (IRPA A11.2, Criminality & CSIS/CBSA security screening)
- **Stage 6: Passport Request (PPR / OPR / Portal Invite)** (Visa counterfoil or PR portal confirmation)
- **Stage 7: Port of Entry (POE) Letter / e-CoPR** (Final travel authorization & permanent resident landing)

### 2. 🌍 50+ Country Processing Engine & AI ETA Predictor
- Country dataset covering **Nigeria, India, Philippines, China, UK, USA, Pakistan, Ghana, Brazil, UAE, Vietnam, Kenya, Mexico, France, Germany, Egypt, Colombia, Bangladesh, Iran, Morocco**, and 30+ more.
- **Side-by-Side Comparison**: Benchmark your country against global velocity and top visa processing hubs.
- **Dynamic Variables**: Upfront medical status (-8 days), queue backlog index factor (`0.70x` to `1.35x`), and Fall intake seasonal surge.

### 3. 🛡️ Action Center & Defect / Missing Items Engine
- **Urgent Countdown Timers**: Tracks critical 30-day biometrics deadlines, police certificate expiries, and Additional Document Requests (ADR).
- **Refusal / Delay Risk Meter**: Real-time 0–100% risk calculation that drops as you resolve outstanding tasks.
- **2024–2026 Proof of Funds Calculator**:
  - Single student baseline: **$20,635 CAD** + tuition
  - Express Entry funds table for family sizes 1 through 7+
  - Highlights acceptable vs high-risk financial documents (e.g. unverified sudden lump sums triggering IRPA R205/R216 refusals).

### 4. 🗄️ Cyber Vault & Document Locker
- Simulated AI OCR readability audit score (94% to 100%).
- Real-time compliance check for file size (< 4.0 MB limit) and IRCC photo specifications.
- Add, preview, and manage supporting files with persistent storage.

### 5. ✉️ Automated IRCC Webform Synthesizer
- Automatically compiles polite, legally-cited case status inquiries citing applicant UCI, App#, Visa Office, and days-over-standard calculations.
- Instant one-click copy to clipboard and downloadable `.txt` case brief.

### 6. 🔍 GCMS / ATIP Intelligence Decoder
- Searchable directory of internal immigration acronyms (`A11.2 MET`, `BGC IP2`, `PUM`, `PPR`, `IME M1`, `COMPLEX/SCREENING`, `CSIS`, `CBSA`, `INFO SHARING`).
- Guide on ordering official $5 CAD ATIP GCMS electronic case notes.

### 7. 📡 Policy Radar & Pre-Arrival Landing Guide
- Live feed of Express Entry Category draws (STEM, Healthcare, French, Trades) and Study permit cap updates.
- Complete pre-arrival roadmap: ArriveCAN declaration (72h prior), CBSA B4 personal effects form, Scotiabank/CIBC GIC activation, Service Canada SIN, and provincial health insurance (OHIP/MSP).

### 8. 🔊 Cyber Audio & Holographic Visuals
- **Interactive Background**: HTML5 Canvas particle constellation reacting to mouse movement.
- **Web Audio Synthesizer**: Sci-fi UI blips, radar sweeps, and harmonic completion chimes (with audio mute toggle).
- **Holographic Dossier**: Printable status report for sharing or filing.

---

## 📂 Project Architecture

```
ircc-track/
├── index.html                     # Main HTML entry with futuristic typography
├── package.json                   # Dependencies & build scripts
├── vite.config.js                 # Vite bundler configuration (host 0.0.0.0:3000)
├── tailwind.config.js             # Cyberpunk theme color extensions & glow utilities
├── src/
│   ├── main.jsx                   # React root mount
│   ├── index.css                  # Global styles & keyframe animations
│   ├── App.jsx                    # Core application state & tab manager
│   ├── components/
│   │   ├── LoadingScreen.jsx      # Futuristic boot sequence & loader
│   │   ├── Navbar.jsx             # Top HUD telemetry bar, clocks & switcher
│   │   ├── CyberBackground.jsx    # Interactive canvas particle network
│   │   ├── StatusOverview.jsx     # Telemetry cards & circular progress ring
│   │   ├── TimelineTracker.jsx    # 7-stage IRCC milestone progression
│   │   ├── CountryEstimator.jsx   # 50+ country times & AI ETA predictor
│   │   ├── ActionCenter.jsx       # Defect detector & Proof of Funds calculator
│   │   ├── DocumentLocker.jsx     # AI OCR document vault & compliance check
│   │   ├── WebformGenerator.jsx   # IRCC Webform inquiry synthesizer
│   │   ├── GCMSDecoder.jsx        # ATIP / GCMS status code dictionary
│   │   ├── PolicyRadar.jsx        # Policy feed & pre-arrival roadmap
│   │   ├── ApplicationModal.jsx   # Create / Edit application profile modal
│   │   └── DossierReportModal.jsx # Printable holographic dossier report
│   ├── data/
│   │   ├── visaStreams.js         # Supported visa categories & requirements
│   │   ├── countryProcessingData.js # 50+ country processing times & backlog indices
│   │   ├── sampleProfiles.js      # Pre-loaded realistic case studies
│   │   ├── fundsRequirements.js   # 2024-2026 living cost & settlement tables
│   │   ├── gcmsDictionary.js      # Internal IRCC officer status codes
│   │   └── irccNews.js            # Latest policy alerts & arrival checklist
│   └── utils/
│       └── audio.js               # Web Audio API futuristic sound synthesizer
```

---

## 🎨 Futuristic Design System

- **Backdrop**: Deep Space Void (`#02050f`, `#060b1d`)
- **Cyber Cyan**: `#00f0ff` (Telemetry active, primary buttons, borders)
- **Electric Purple**: `#a855f7` (AI predictions, GCMS notes, benchmarks)
- **Neon Emerald**: `#10b981` (Passed milestones, positive trends, verified funds)
- **Solar Amber**: `#f59e0b` (Action required, deadlines, warnings)
- **Typography**: Space Grotesk, Rajdhani, JetBrains Mono, Inter

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
