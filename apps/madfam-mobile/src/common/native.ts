import { NativeModule, NativeModules } from 'react-native';

interface MadFamModule extends NativeModule
{
  getCurrentUserId(): Promise<string | null>;
  getGoogleApiKey(): Promise<string>;
  signIn(): void;
  signOut(): Promise<void>;
  updateLocation(): Promise<boolean>;
  updateLocationInBackground(interval: number): void;
  updateFcmToken(): Promise<boolean>;
  updateFcmTokenInBackground(interval: number): void;
}

const native = NativeModules.MadFamModule as MadFamModule;

export default native;
