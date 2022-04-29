import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lpiotia.whoisit',
  appName: 'leaveMeAlone',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  }
};

export default config;
