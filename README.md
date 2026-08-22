# ADITYA.OS

Personal portfolio for **Aditya Kumar Jha**, presented as an interactive operating-system-style
interface for showcasing development, data, AI/ML, projects, internships, hackathons, roles,
certificates, and contact details.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Lucide React

## Getting started

### Requirements

- Node.js 18 or newer
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173/`.

### Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Project structure

```text
.
├── public/
│   ├── certs/
│   │   ├── ambassadors/
│   │   ├── certifications/
│   │   └── participation/
│   ├── hackathons/
│   ├── images/
│   └── internships/
├── src/
│   ├── components/          # Portfolio sections and shared UI
│   ├── data/portfolio.ts     # Main content configuration
│   ├── lib/hooks.ts          # Browser and UI hooks
│   ├── App.tsx               # Application shell and theme state
│   ├── index.css             # Tokens, themes, glassmorphism, and global styles
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
```




## Adding the profile photo

Place the image here:

```text
public/images/profile.webp
```

The configured path is `photoPath` in `personalInfo`. WebP, JPEG, and PNG files are supported if
the `photoPath` value is updated to match the filename.

## Adding certificates

Use the folder that matches the certificate type:

| Certificate type | Folder |
| --- | --- |
| Common participation certificates | `public/certs/participation/` |
| Course and job certifications | `public/certs/certifications/` |
| Ambassador role certificates | `public/certs/ambassadors/` |
| Internship certificates | `public/internships/` |
| Hackathon certificates | `public/hackathons/` |

Supported image formats include `.jpeg`, `.jpg`, `.png`, and `.webp`.

After adding an image, add or update its entry in `src/data/portfolio.ts`. Public assets use a
root-relative path, for example:

```ts
{
  title: "My New Certificate",
  issuer: "Issuing Organization",
  date: "2026",
  image: "/certs/certifications/my-new-certificate.jpeg",
}
```

Internship, hackathon, and ambassador entries use the same `image` property. Their previews are
clickable and open in the full-size image modal.

## Interface features

- Day/night view toggle in the navigation
- Persistent theme and accent-color preferences using `localStorage`
- Solar Gold, Electric Cyan, Signal Coral, and Laser Lime accent palettes
- Glassmorphism navigation, cards, status panel, and modal surfaces
- Ambient neon background lighting
- Native browser pointer and normal scrolling
- Responsive layout for desktop, tablet, and mobile
- Reduced-motion support through `prefers-reduced-motion`
- Footer system panel with live time, battery status, network status, and active status
- Interactive terminal panel with portfolio commands

## Deployment

Create the production build:

```bash
npm run build
```

Deploy the generated `dist/` directory to any static hosting provider such as Vercel, Netlify,
GitHub Pages, or another service that supports Vite output.

## Notes

- Battery information uses the browser Battery Status API when available; otherwise the UI shows
  `N/A`.
- The contact form opens the visitor's email client and does not send data to a backend.
- Keep certificate filenames simple when possible. If a filename contains spaces, URL encoding is
  handled by the browser, but descriptive hyphenated filenames are easier to maintain.
