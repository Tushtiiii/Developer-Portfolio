# ⚡ Neo-Brutalist Developer Portfolio

<div align="center">

  <!-- Badges -->
  [![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.4-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

  <p align="center">
    <strong>A high-energy, Gen Z & Y2K-inspired Neo-Brutalist developer portfolio built with React 19, TypeScript, Tailwind CSS v4, and Framer Motion.</strong>
  </p>

  <p align="center">
    <a href="#-key-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-project-structure">Project Structure</a> •
    <a href="#-customization">Customization</a> •
    <a href="#-license">License</a>
  </p>

</div>

---

## 🌟 Overview

This portfolio breaks away from generic minimalist designs by combining **Neo-Brutalism**, **retro Y2K nostalgia**, and **bold Gen Z micro-interactions**. Featuring brutalist hard drop shadows, tactile button interactions, playful physics-based stickers, synthesized Web Audio sound FX, and responsive bento grids.

---

## ✨ Key Features

- 🎨 **Neo-Brutalist & Y2K Aesthetic**: High-contrast borders, bold color-blocking (`#CCFF00`, `#FF70A6`, `#70D6FF`), tactile hard shadows (`shadow-[4px_4px_0px_#000]`), and dotted paper grid backgrounds.
- 🎯 **Interactive Sticker Playground**: Drop and stamp customizable stickers (stars, rockets, hearts, bugs, coffee) anywhere onto an interactive canvas with randomized angles and scales.
- 🔊 **Retro 8-bit Sound Effects**: Optional toggleable audio feedback for buttons and links synthesized directly in the browser via the **Web Audio API** (no bulky audio assets required).
- 🖱️ **Fluid Spring Custom Cursor**: Magnetic dual-layer cursor with physics-driven spring animations (`useSpring`) and hover-expand effects for interactive elements.
- 🍱 **"Behind The Screens" Bento Grid**:
  - **Taped Polaroid Card**: Bio card complete with masking tape accents and scan-line overlay.
  - **Live Digital Clock**: Real-time ticker displaying timezone (UTC+5:30) and current time.
  - **Lo-Fi Music Player**: Spotify-style widget with animated equalizer audio bars and playback progress indicator.
  - **Interactive Tech Stack**: Micro-peel hover animations on skill badges.
- 💻 **Retro Browser Project Showcases**: Styled macOS/vintage browser window mockups featuring live tags, tech badges, and direct links.
- 🌓 **Seamless Light & Dark Mode**: Persistent theme toggle with high-contrast color shifts tailored for both themes.
- 🎉 **Confetti Contact Form**: Interactive message submission that triggers vibrant particle confetti using `canvas-confetti`.
- 📊 **Dynamic Scroll Progress**: Top header indicator tracking exact reading progress across sections.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework / Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) |
| **Bundler & Dev Server** | [Vite 8](https://vitejs.dev/) (`@vitejs/plugin-react`) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) |
| **Animations** | [Framer Motion 13](https://www.framer.com/motion/) |
| **Effects** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Audio** | Native Web Audio API (`OscillatorNode` + `GainNode`) |
| **Typography** | `Space Grotesk` (Display) & `JetBrains Mono` (Code/Mono) |
| **Formatting** | [oxfmt](https://github.com/oxc-project/oxc) |

---

## 🚀 Quick Start

### Prerequisites

Make sure you have **Node.js 18+** and either `npm`, `pnpm`, or `yarn` installed.

### 1. Clone the Repository

```bash
git clone https://github.com/Tushtiiii/Developer-Portfolio.git
cd "Developer Portfolio"
```

### 2. Install Dependencies

Using `npm`:
```bash
npm install
```

Or using `pnpm`:
```bash
pnpm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles TypeScript and creates an optimized production build in `dist/` |
| `npm run preview` | Locally previews the production build |
| `npm run format` | Formats code with `oxfmt` |

---

## 📂 Project Structure

```text
Developer Portfolio/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, icons, and media files
│   ├── components/
│   │   ├── About.tsx          # Bento grid: Polaroid bio, live clock, lo-fi player, tech stack
│   │   ├── Contact.tsx        # Contact form with confetti trigger & social badges
│   │   ├── Cursor.tsx         # Custom spring cursor & trailing ring
│   │   ├── Hero.tsx           # Hero section, draggable sticker chips & CTAs
│   │   ├── Navbar.tsx         # Floating pill navigation, dark mode & sound toggle
│   │   ├── Projects.tsx       # Retro browser window project showcases
│   │   ├── StickerCanvas.tsx  # Interactive sticker board & stamp canvas
│   │   └── WhatIDo.tsx        # Service offerings cards with rotated brutalist accents
│   ├── App.tsx            # Main application shell & global audio/theme state
│   ├── index.css          # Tailwind CSS v4 imports, custom font faces & brutalist utilities
│   └── main.tsx           # Application entrypoint
├── index.html             # HTML entry template
├── package.json           # Project dependencies & scripts
├── tsconfig.json          # TypeScript compiler configuration
└── vite.config.ts         # Vite build configuration with Tailwind CSS plugin
```

---

## 🎨 Customization

### Personal Information & Bio
- **Hero & Intro**: Modify your handle, titles, tagline, and badges in [`src/components/Hero.tsx`](file:///src/components/Hero.tsx).
- **About / Bento Grid**: Update the Polaroid bio, location, interests, and skill set in [`src/components/About.tsx`](file:///src/components/About.tsx).

### Projects & Services
- **Projects**: Edit the `projects` list in [`src/components/Projects.tsx`](file:///src/components/Projects.tsx) to add your project title, descriptions, tech tags, demo links, and GitHub repositories.
- **Services / What I Do**: Update the `services` array in [`src/components/WhatIDo.tsx`](file:///src/components/WhatIDo.tsx).

### Social Links & Contact
- **Socials & Email**: Update your GitHub, LinkedIn, X, and email links in [`src/components/Contact.tsx`](file:///src/components/Contact.tsx).

### Theme & Colors
- Color variables and custom classes are defined in [`src/index.css`](file:///src/index.css):
  - `--cream`: `#F4F1EA` (Light background)
  - `--charcoal`: `#121212` (Dark background)
  - `--lime`: `#CCFF00` (Accent highlight)
  - `--pink`: `#FF70A6` (Accent highlight)
  - `--cyber`: `#70D6FF` (Accent highlight)

---

## 🚢 Deployment

You can deploy this portfolio to your preferred hosting provider in just a few minutes:

### Vercel
```bash
npm install -g vercel
vercel
```
*Alternatively, connect your GitHub repository directly to [Vercel](https://vercel.com/) for automatic deployments on push.*

### Netlify
```bash
npm run build
```
Publish directory: `dist`

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use it as an inspiration or template for your own developer portfolio!

<div align="center">
  <sub>Crafted with ⚡ and pixel-perfection.</sub>
</div>
