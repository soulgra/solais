'use client';

import * as Sentry from '@sentry/nextjs';
import { PrivyProvider } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import { Toaster } from 'sonner';
import useThemeManager from '@/store/ThemeManager';
import useIsMobile from '@/utils/isMobile';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const initClarity = () => {
  if (typeof window !== 'undefined') {
    const projectId = 'pprp6bdxj0';
    // Using dynamic import for Clarity to avoid SSR issues
    import('@microsoft/clarity').then((Clarity) => {
      Clarity.default.init(projectId);
    });
  }
};

const solanaConnectors = toSolanaWalletConnectors({
  shouldAutoConnect: true,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  // Access the current theme from Zustand
  const { theme } = useThemeManager();
  const isMobile = useIsMobile();
  const [privyError, setPrivyError] = useState(false);

  // Initialize Clarity on client-side
  useEffect(() => {
    initClarity();
  }, []);

  // Initialize Sentry
  useEffect(() => {
    Sentry.init({
      enabled: process.env.NODE_ENV === 'production',
      dsn: 'https://9b7886f252a8435b9083cf088a03039d@o4508596709097472.ingest.us.sentry.io/4508601347866624',
      integrations: [Sentry.browserTracingIntegration()],
      tracesSampleRate: 1.0,
      tracePropagationTargets: ['localhost'],
      replaysSessionSampleRate: 0.2,
      replaysOnErrorSampleRate: 1.0,
    });
  }, []);

  // Display toast notification for Privy error
  useEffect(() => {
    if (privyError) {
      toast.error('Authentication service failed to initialize, running in guest mode', {
        duration: 5000,
      });
    }
  }, [privyError]);

  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  // 如果Privy AppID未设置或之前已经尝试过初始化但失败，直接返回子组件
  if (!privyAppId || privyError) {
    if (!privyError && !privyAppId) {
      console.warn('NEXT_PUBLIC_PRIVY_APP_ID not set');
      setPrivyError(true);
    }
    return (
      <>
        <Toaster
          position={isMobile ? 'top-center' : 'bottom-right'}
          duration={1500}
          richColors
        />
        {children}
      </>
    );
  }

  // 尝试使用Privy，并捕获可能的错误
  try {
    return (
      <PrivyProvider
        appId={privyAppId}
        config={{
          loginMethods: ['email', 'wallet', 'twitter', 'discord'],
          externalWallets: {
            solana: {
              connectors: solanaConnectors,
            },
          },
          embeddedWallets: {
            solana: {
              createOnLogin: 'all-users',
            },
          },
          fundingMethodConfig: {
            moonpay: {
              paymentMethod: 'credit_debit_card',
              uiConfig: {
                accentColor: theme.primary || '#1D1D1F',
                theme: theme.baseTheme,
              },
            },
          },
          appearance: {
            theme: theme.name === 'dark' ? 'dark' : 'light',
            accentColor: theme.primary || '#1D1D1F',
            logo: '/solai.png',
            showWalletLoginFirst: true,
          },
        }}
        onError={(error) => {
          console.error('Privy initialization error:', error);
          setPrivyError(true);
          Sentry.captureException(error);
        }}
      >
        <Toaster
          position={isMobile ? 'top-center' : 'bottom-right'}
          duration={1500}
          richColors
        />
        {children}
      </PrivyProvider>
    );
  } catch (error) {
    console.error('Failed to initialize Privy:', error);
    setPrivyError(true);

    return (
      <>
        <Toaster
          position={isMobile ? 'top-center' : 'bottom-right'}
          duration={1500}
          richColors
        />
        {children}
      </>
    );
  }
};

export default AuthProvider;
