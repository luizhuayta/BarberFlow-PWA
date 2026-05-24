'use client';

import { useEffect } from 'react';

export function RegisterSW() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registrado con éxito:', registration.scope);
        })
        .catch((error) => {
          console.error('[PWA] Error registrando Service Worker:', error);
        });
    }
  }, []);

  return null;
}
