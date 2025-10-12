# Moobi

**A web-based smartphone OS emulator built with Next.js. Experience a fully interactive mobile phone inside your browser. Browse, call, text, and launch apps — all in one virtual interface.**

Live: [moobi.vercel.app](https://moobi.vercel.app)

---

## 💡 Overview

Moobi aims to simulate a mobile OS experience entirely within the browser. You can install and run apps, browse locally hosted development, use music, a clock, and more. It’s also a showcase of front-end craftsmanship — blending UI/UX, dynamic imports, state orchestration, and embedded previews.

Think of it as **virtual phone meets portfolio**.

---

## ⚙️ Features

Here’s what Moobi can (or will) do:

- 📱 Multi-app environment under one persistent “frame”
- 🚀 Live dev preview: load your local `http://localhost:…` in a mobile shell
- 🧠 Dynamic screen loading (code splitting) for performance
- 🎶 Built-in music player (stream or local files)
- ⏰ Clock app (alarm, timer, stopwatch, world clock)
- 🔁 App switching / recent apps UI
- 🌗 System overlays (control center, brightness/volume)
- 🔧 Modular architecture for easy addition of new mini-apps
- 🪄 Smooth transitions, gestures (swipes), and animations

---

## 🧱 Tech Stack

- **Next.js** (Pages or App Router)
- **TypeScript**
- **React + Suspense / dynamic imports**
- **Zustand** for global state
- **Tailwind CSS** for styling
- **react-swipeable** (or equivalent) for gestures
- **Official / external APIs** (e.g. music, news)
- Integration of `<iframe>` and proxy for dev preview
- **Vercel** for deployment

---

## 
Each mini-app (e.g. `components/screens/clock`) can hold its own UI and possibly its own state logic (or use shared stores). The `Frame` component wraps them in the mobile phone shell.

---

## 🛠 Installation & Setup

These instructions assume you have **Node.js** and **npm** installed.

```bash
# 1. Clone this repo
git clone https://github.com/crossdd/moobi.git
cd moobi

# 2. Install dependencies
npm install

# 3. Set environment variables
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=

GOOGLE_SEARCH_ENGINE_ID=
GOOGLE_SEARCH_API_KEY=

WEATHER_API_SECRET_KEY=
GNEWS_API_KEY=

# 4. Run in development mode
npm run dev
```
## 🧠 How Moobi Works (Architecture Notes)

Here’s a quick dive into how the magic is wired:

### ✅ Frame & Root Shell
- The `Frame` component is always mounted.
- Inside it, the active screen (home, browser, clock, etc.) is swapped using **Zustand** + **dynamic imports**.

### ✅ State Management via Zustand
- `usePhoneStore` handles core state like:
    - `currentScreen`
    - `history`
    - control center visibility
    - volume & brightness
- App-specific stores (e.g., music, notes) manage only their internal states.

### ✅ Dynamic Imports & Memoization
- Each screen UI is **lazily loaded** to keep bundles lightweight.
- Once a screen is loaded, it’s memoized, so re-opening it won’t trigger the loader again.

### ✅ Live Dev Preview / Browser Mode
- URLs (e.g., `http://localhost:3000`) are embedded using an `<iframe>`.
- Proxy/headers may be used to bypass embed restrictions.

### ✅ Gesture Handling & UI Transitions
- Swipes (e.g., swipe-up to Home or AppSwitcher) handled with `react-swipeable` + custom logic.
- Transitions and animations rely on **CSS, Framer motion, and Motion**.

### ✅ App Registry & Metadata
- The `mobileApps` config defines:
    - App slugs → icons
    - App names
    - App colors
- Used to populate both the home screen grid and the AppSwitcher.

## 👥 Contributing

Moobi is MIT-licensed and open to collaboration.

### ✅ How to Contribute

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feat/your-feature
   ```
3. **Run lint/tests and verify functionality**
4. Submit a pull request
   Include a clear, concise description of your changes

   `Please use ESLint + Prettier for consistent formatting`
