# MyDJ

A music platform where artists upload their work and listeners discover it. Built with React on the frontend and Express + MongoDB on the backend.

---

## What it does

Artists can create an account, upload tracks, and organize them into albums. Listeners sign up separately and get access to the full library — browse tracks, play them with a persistent bottom player, and explore albums. The two roles are kept separate; listeners can't upload, artists can do both.

---

## Tech

**Frontend**
- React 18 + Vite
- Tailwind CSS
- React Router v6
- Context API (auth state, player state)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication (httpOnly cookies)
- Multer for file handling
- ImageKit for audio storage
- music-metadata for duration parsing
- bcrypt for password hashing

---

## Project structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky nav, auth-aware
│   │   ├── HeroSection.jsx     # Landing hero
│   │   ├── PlayerCard.jsx      # Hero player card (real songs)
│   │   ├── BottomPlayer.jsx    # Persistent playback bar
│   │   ├── GlobalPlayer.jsx    # Audio element, lives in App
│   │   ├── Cursor.jsx          # Custom cursor
│   │   ├── ProtectedRoute.jsx  # Auth + role guards
│   │   ├── Toast.jsx           # Toast notification system
│   │   ├── Skeleton.jsx        # Loading skeletons
│   │   └── ...landing sections
│   ├── context/
│   │   ├── AuthContext.jsx     # User session, login/logout
│   │   └── PlayerContext.jsx   # Track queue, playback state
│   ├── hooks/
│   │   ├── useScrollReveal.js  # Intersection observer animations
│   │   └── usePlayer.js        # Player card hook
│   └── pages/
│       ├── Landing.jsx
│       ├── Login.jsx
│       ├── Register.jsx
│       ├── MusicLibrary.jsx
│       ├── Albums.jsx
│       ├── AlbumDetail.jsx
│       ├── Upload.jsx
│       └── Profile.jsx
```

---

## Getting started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- ImageKit account

### Backend setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=3004
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Start the server:

```bash
node index.js
# or
nodemon index.js
```

### Frontend setup

```bash
cd frontend
npm install
```

Open `vite.config.js` and make sure the proxy points to your backend port:

```js
proxy: {
  '/api': {
    target: 'http://localhost:3004',
    changeOrigin: true,
  }
}
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173`

---

## API routes

### Auth
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/auth/register` | Public | Register with username, email, password, role |
| POST | `/api/auth/login` | Public | Login with email or username + password |
| POST | `/api/auth/logout` | Public | Clear auth cookie |

### Music
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/music/upload` | Artist only | Upload a track (multipart/form-data) |
| POST | `/api/music/album` | Artist only | Create an album with selected track IDs |
| GET | `/api/music` | Any logged in user | Fetch all tracks |
| GET | `/api/music/albums` | Any logged in user | Fetch all albums |
| GET | `/api/music/albums/:albumId` | Any logged in user | Fetch single album with tracks |

---

## Auth flow

Registration and login both set a JWT as an httpOnly cookie via `res.cookie("token", token)`. The frontend never touches the token directly — it just sends `credentials: 'include'` with every request and the browser handles the rest.

User data (username, email, role) is stored in `localStorage` via `AuthContext` so the UI knows who's logged in without hitting the server on every render. On logout, the cookie is cleared server-side and localStorage is wiped client-side.

---

## Roles

Two roles exist — `artist` and `user` (listener).

- `authArtist` middleware checks the JWT and verifies `role === "artist"`. Upload routes are behind this.
- `authUser` middleware allows both roles through. Library and album routes use this.

Trying to access `/upload` as a listener redirects to `/music`. Accessing any protected page without being logged in redirects to `/login`.

---

## Player

The audio element lives in `GlobalPlayer.jsx` which is mounted once at the app root, outside the route tree. This means music keeps playing as you navigate between pages — the same way Spotify works.

`PlayerContext` holds the current track, queue, playing state, and progress. Any component can call `playTrack(song, queue)` to start playback or `togglePlay()` to pause. The bottom player bar reads from the same context.

---

## Design

- **Font**: Syne (headings) + DM Sans (body)
- **Colors**: Dark green base (`#080c0a`), emerald accent (`#2dd87a`), lime secondary (`#a8f542`)
- **Custom cursor** with blend mode difference effect
- Scroll-triggered reveal animations throughout the landing page
- Animated waveform in the hero player card

---

## Known limitations

- No search on the backend — filtering happens client-side on the fetched track list
- No way to edit or delete tracks after uploading
- Album artwork is generated via CSS gradients, no image upload support yet
- No pagination — all tracks load at once

---

## License

MIT