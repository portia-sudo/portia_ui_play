# Portia UI Play

A React application built with Vite for rapid development and deployment.

## Features

- ⚡ **Vite** - Lightning fast build tool
- ⚛️ **React 18** - Modern React with hooks
- 🔥 **Hot Module Replacement** - Instant updates during development
- 📱 **Responsive Design** - Works on all devices
- 🌙 **Dark/Light Theme** - Automatic theme switching

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd portia-ui-play
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

### Deploy to Vercel

This project is configured for easy deployment to Vercel:

1. **Option 1: Deploy via Vercel CLI**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Option 2: Deploy via GitHub**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically deploy on every push

3. **Option 3: Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Import your project
   - Deploy with one click

The `vercel.json` configuration file is already set up for optimal deployment.

## Project Structure

```
src/
├── main.jsx          # React entry point
├── App.jsx           # Main App component
├── App.css           # App-specific styles
└── index.css         # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
