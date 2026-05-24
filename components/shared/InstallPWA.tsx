'use client';

import { useEffect, useState } from 'react';
import { Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(display-mode: standalone)').matches;
  });

  useEffect(() => {
    // Si ya está en standalone, no necesitamos listeners
    if (isInstalled) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      toast.success('¡BarberFlow instalado!', {
        description: 'La app ahora funciona como aplicación nativa.',
      });
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      toast.success('¡Gracias!', {
        description: 'BarberFlow se está instalando en tu celular.',
      });
    }

    setDeferredPrompt(null);
  };

  // No mostrar si ya está instalada o no hay prompt disponible
  if (isInstalled || !deferredPrompt) {
    return null;
  }

  return (
    <Button
      onClick={handleInstall}
      size="lg"
      variant="outline"
      className="group border-amber-400/60 hover:bg-amber-400/10 hover:border-amber-400 text-amber-400 gap-2"
    >
      <Smartphone className="w-4 h-4" />
      Instalar en el celular
      <Download className="w-4 h-4 group-hover:translate-y-0.5 transition" />
    </Button>
  );
}
