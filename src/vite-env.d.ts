/// <reference types="vite/client" />

declare global {
  interface Window {
    __REACT_QUERY_STATE__?: any;
  }
}

export {};
