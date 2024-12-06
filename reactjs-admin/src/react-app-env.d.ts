declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
  }
}
