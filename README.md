# Vanhsika Website

A simple React project for publishing a static website.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build` folder.

## Adding Your Custom HTML

You can add your custom HTML content in two ways:

### Option 1: Edit the React Component

Edit `src/App.js` and add your HTML inside the `<div className="App">` element.

### Option 2: Use Pure HTML (No React)

If you want to use pure HTML without React:

1. Add your HTML content to `public/index.html`
2. Remove the `<div id="root"></div>` line
3. Add your content directly in the `<body>` tag

## Deploying Your Site

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Connect your repository
4. Build command: `npm run build`
5. Publish directory: `build`

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy!

### Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:

```json
"homepage": "https://yourusername.github.io/vanhsika",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then run:

```bash
npm run deploy
```

## Styling

All styles use SCSS. Edit:

-   `src/App.scss` - Main app styles
-   `src/index.scss` - Global styles
