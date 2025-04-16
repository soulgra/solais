'use client';

import OnboardingHeader from '@/app/_components/onboarding/OnboardingHeader';
import BackgroundPattern from '@/app/_components/onboarding/BackgroundPatterns';
import Hero from '@/app/_components/onboarding/Hero';
import BentoGrid from '@/app/_components/onboarding/BentoGrid';
import { useLogin, usePrivy } from '@privy-io/react-auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useIsMobile from '@/utils/isMobile';
import { usePwaStatus } from '@/hooks/usePwaStatus';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Footer from './_components/onboarding/Footer';

export default function Home() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { isInstallPromptAvailable, promptInstall } = usePwaStatus();
  const [showMobileView, setShowMobileView] = useState(false);
  const [privyError, setPrivyError] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Mock login function for demo mode when Privy is not available
  const mockLogin = () => {
    toast.info('Demo mode: Entering application...', {
      duration: 1500
    });
    setTimeout(() => {
      router.push('/dashboard/chat');
    }, 1500);
  };

  // Initialize login functionality with error handling
  let login = mockLogin; // Default to mock login
  let ready = true; // Default ready state
  let authenticated = false; // Default authentication state

  useEffect(() => {
    try {
      // Check if Privy is properly configured
      const isPrivyConfigured = process.env.NEXT_PUBLIC_PRIVY_APP_ID !== undefined;

      if (isPrivyConfigured) {
        // Try to use Privy hooks
        try {
          const privyHook = usePrivy();
          ready = privyHook.ready;
          authenticated = privyHook.authenticated;

          const loginHook = useLogin({
            onComplete: (params) => {
              console.log(params);
              router.push('/dashboard/chat');
            },
            onError: (error) => {
              console.error(error);
              toast.error('Login failed, please try again later');
              setPrivyError(true);
            },
          });

          if (loginHook && loginHook.login) {
            login = loginHook.login;
          } else {
            setPrivyError(true);
          }
        } catch (error) {
          console.error('Unable to use Privy hooks:', error);
          setPrivyError(true);
        }
      } else {
        console.warn('Privy not configured: missing NEXT_PUBLIC_PRIVY_APP_ID');
        setPrivyError(true);
      }
    } catch (error) {
      console.error('Error initializing Privy:', error);
      setPrivyError(true);
    } finally {
      setIsInitializing(false);
    }
  }, [router]);

  // Used for disabling login button
  const disabled = !ready || authenticated || privyError || isInitializing;

  // Ensure mobile view state is reset when device type changes
  useEffect(() => {
    if (isMobile) {
      setShowMobileView(false);
    }
  }, [isMobile]);

  const handleLogin = () => {
    if (privyError) {
      // In demo mode, use the mock login
      mockLogin();
    } else {
      // Use the real login if available
      if (typeof login === 'function') {
        login();
      } else {
        toast.error('Login service is temporarily unavailable');
      }
    }
  };

  // Display error message or normal content
  return (
    <div className="relative isolate bg-gradient-to-b from-gray-950 to-black min-h-screen w-full overflow-x-hidden">
      <BackgroundPattern />

      {privyError && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white p-2 text-center">
          Running in demo mode - Some features may not be available
        </div>
      )}

      <OnboardingHeader
        login={handleLogin}
        disabled={isInitializing} // Allow login in demo mode
      />
      <main className="isolate">
        <AnimatePresence mode="wait">
          <Hero
            login={handleLogin}
            disabled={isInitializing} // Allow login in demo mode
            isMobile={isMobile}
            showMobileView={showMobileView}
            setShowMobileView={setShowMobileView}
            promptInstall={promptInstall}
            isInstallPromptAvailable={isInstallPromptAvailable}
          />
        </AnimatePresence>
        <BentoGrid />
      </main>
      <Footer />
    </div>
  );
}
