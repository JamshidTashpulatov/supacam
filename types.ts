export enum ScreenName {
  SPLASH = 'SPLASH',
  ONBOARDING = 'ONBOARDING',
  GENDER = 'GENDER',
  PAYWALL = 'PAYWALL',
  HOME = 'HOME',
  LIBRARY = 'LIBRARY',
  SETTINGS = 'SETTINGS',
  PHOTO_PICKER = 'PHOTO_PICKER',
  DUAL_PHOTO_PICKER = 'DUAL_PHOTO_PICKER',
  GENERATE = 'GENERATE',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR_GEN = 'ERROR_GEN',
  ERROR_NET = 'ERROR_NET',
  EMPTY_LIB = 'EMPTY_LIB',
  EMPTY_TRENDS = 'EMPTY_TRENDS'
}

export type Gender = 'Male' | 'Female' | 'Non-Binary' | null;
export type GenMode = 'SINGLE' | 'DUAL';

export interface GeneratedImage {
  id: string;
  url: string;
  timestamp: number;
}

export enum PaywallVariant {
  A = 'A',
  B = 'B',
  C = 'C'
}