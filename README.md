# Johnson He Portfolio

A personal portfolio website with multiple switchable themes built with React + Vite + Tailwind CSS.

## Features

- **Two Themes**: Switch between "P.CV" (minimalist) and "Jarcos" (modern/bold) styles
- **Theme Persistence**: Your theme choice is saved in localStorage
- **Spotify Integration**: Collapsible music player that continues playing across page navigation
- **Photo Gallery**: Visions page with alternating layout and fullscreen lightbox
- **Responsive Design**: Works beautifully on mobile and desktop
- **Smooth Animations**: Subtle transitions throughout

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # Shared UI components
│   ├── ThemeSwitcher.jsx
│   ├── MusicPlayer.jsx
│   ├── Navigation.jsx
│   └── ImageLightbox.jsx
├── context/          # React Context providers
│   └── ThemeContext.jsx
├── pages/            # Route page components
│   ├── Home.jsx
│   ├── Visions.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   └── Contact.jsx
└── themes/           # Theme-specific layouts
    ├── pcv/
    └── jarcos/
```

## Customization

### Adding Images
Replace the placeholder SVGs in `public/images/visions/` with your own images.

### Updating Content
Edit the placeholder content in each page component:
- `src/pages/About.jsx` - Bio and experience
- `src/pages/Projects.jsx` - Project showcase
- `src/pages/Contact.jsx` - Contact info and social links

### Changing Colors
Modify the color palette in `tailwind.config.js` under `theme.extend.colors`.

## Tech Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router v6](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
