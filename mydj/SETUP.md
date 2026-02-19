# MyDJ — Setup Guide

## Prerequisites
Make sure you have these installed:
- **Node.js** v18 or higher → https://nodejs.org
- **npm** v9+ (comes with Node)

Check your versions:
```bash
node -v   # should be v18+
npm -v    # should be v9+
```

---

## 1. Unzip the project

```bash
unzip mydj-react.zip
cd mydj
```

---

## 2. Install dependencies

```bash
npm install
```

This installs React, React Router, Tailwind CSS, Vite, and everything else.

---

## 3. Connect to your backend

Open `vite.config.js` and update the proxy target to match your backend's port:

```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3004', // 👈 change to your backend port
      changeOrigin: true,
    },
  },
},
```

For example if your Express server runs on port `5000`:
```js
target: 'http://localhost:5000',
```

This means any request to `/api/...` from the frontend will automatically
be forwarded to your backend — no CORS issues in development.

---

## 4. Start the dev server

```bash
npm run dev
```

Open your browser at **http://localhost:5173**

> Make sure your backend is also running at the same time.

---

## 5. Build for production

```bash
npm run build
```

This creates a `dist/` folder with optimized static files.
You can serve it with:
```bash
npm run preview
```

Or deploy the `dist/` folder to Vercel, Netlify, or any static host.

---

## Project Structure

```
mydj/
├── index.html                  # Vite entry point
├── vite.config.js              # Dev server + proxy config
├── tailwind.config.js          # Design tokens (colors, fonts, animations)
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx                # React root
    ├── App.jsx                 # Router + routes
    ├── index.css               # Tailwind base + global styles
    ├── hooks/
    │   ├── useScrollReveal.js  # Intersection Observer for scroll animations
    │   └── usePlayer.js        # Music player state (play/pause/progress)
    ├── pages/
    │   └── Landing.jsx         # Landing page (composes all sections)
    └── components/
        ├── Cursor.jsx          # Custom animated cursor
        ├── Navbar.jsx          # Sticky nav with scroll effect
        ├── HeroSection.jsx     # Hero with animated heading
        ├── PlayerCard.jsx      # Animated waveform player card
        ├── MarqueeStrip.jsx    # Scrolling text marquee
        ├── FeaturesSection.jsx # 3-column feature grid
        ├── StatsSection.jsx    # Animated stat numbers
        ├── HowItWorks.jsx      # Step-by-step + upload mockup
        ├── CTASection.jsx      # Bottom call to action
        └── Footer.jsx          # Simple footer
```

---

## Adding New Pages

New pages go in `src/pages/`. To wire them up, uncomment the routes in `src/App.jsx`:

```jsx
// Already stubbed out — just uncomment:
<Route path="/login"      element={<Login />} />
<Route path="/register"   element={<Register />} />
<Route path="/music"      element={<MusicLibrary />} />
<Route path="/albums"     element={<Albums />} />
<Route path="/albums/:id" element={<AlbumDetail />} />
```

---

## Making API Calls

With the Vite proxy set up, call your API like this from any component:

```js
// Login
const res = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
  credentials: 'include', // if you use cookies/sessions
})
const data = await res.json()

// Get all music (requires auth)
const res = await fetch('/api/music', {
  credentials: 'include',
})
```

> Adjust `/api/auth/login` to match your exact route paths.

---

## Fonts

The project uses two Google Fonts loaded via `index.css`:
- **Syne** — headings, logo, buttons
- **DM Sans** — body text, labels

No extra setup needed — they load automatically from Google's CDN.
