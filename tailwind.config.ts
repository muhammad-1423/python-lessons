import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070A13',
        panel: '#101525',
        brand: '#7C3AED',
        aqua: '#2DD4BF'
      },
      boxShadow: {
        glow: '0 0 80px rgba(124, 58, 237, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;
