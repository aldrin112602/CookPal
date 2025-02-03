import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'CookPal',
  webDir: 'dist',
  plugins: {
    keyboard: {
      resize: "ionic" // Change this to "ionic" or "none"
    }
  }
};

export default config;
