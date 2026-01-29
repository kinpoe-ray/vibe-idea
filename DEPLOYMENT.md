# Vibe Idea - Deployment Guide

## Web Application Deployment

### Vercel Deployment

The web application is designed to be deployed on Vercel as a static site.

#### Deployment Steps:

1. **Prepare your repository**:
   - Ensure the repository root contains:
     - `index.html` - Single-page application
     - `vercel.json` - Vercel configuration

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Import the `vibe-idea` project
   - Use the default settings (no build command needed for static site)
   - Deploy

3. **Configuration**:
   - The `vercel.json` file handles routing to ensure all paths serve the main application
   - Static build configuration for optimal performance

#### Alternative Deployment:

If deploying manually to a web server:
- Upload the root files (`index.html`)
- Ensure the server serves `index.html` for all routes (SPA configuration)

### Mobile Application

The React Native mobile app (in `mobile-mvp/`) is designed for local development and testing. To deploy as a mobile app:

1. **Build for iOS**:
   ```bash
   cd mobile-mvp
   npx expo run:ios
   ```

2. **Build for Android**:
   ```bash
   cd mobile-mvp
   npx expo run:android
   ```

3. **Create standalone app**:
   ```bash
   cd mobile-mvp
   npx expo export --platform all
   ```

## Architecture

### Web App Structure
```
/
├── index.html          # Single-page application
├── vercel.json         # Vercel deployment configuration
└── DEPLOYMENT.md       # This file
```

The web app is completely self-contained in a single HTML file with embedded CSS and JavaScript, making it perfect for static hosting.

### Mobile MVP Structure
```
mobile-mvp/
├── App.js              # Main React Native component
├── utils/ideaEngine.js # Lightweight idea generation engine
├── package.json        # Dependencies
└── README.md          # Mobile app documentation
```

## Environment Requirements

### Web App
- Modern browser (Chrome, Firefox, Safari, Edge)
- No server-side requirements
- All processing happens client-side

### Mobile App
- Node.js 14+
- Expo CLI (optional, for development)
- iOS or Android device/emulator

## Troubleshooting

### Vercel Deployment Issues
- If getting 404 errors, ensure the root directory has `index.html` and `vercel.json`
- Check that `vercel.json` is properly configured for SPA routing
- Verify that all paths route to `index.html`

### Mobile App Issues
- Run `npm install` in the `mobile-mvp` directory
- Ensure Expo SDK is compatible with your development environment