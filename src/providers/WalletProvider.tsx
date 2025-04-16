'use client';

import React, { useEffect, useState } from 'react';
import { useSolanaWallets } from '@privy-io/react-auth/solana';
import { useWalletHandler } from '@/store/WalletHandler';
import { PrivyProvider } from '@privy-io/react-auth';

// 演示模式检测函数
const isDemoMode = () => {
  // 检查是否缺少某些关键环境变量或Privy认证失败
  const missingKeys = !process.env.NEXT_PUBLIC_PRIVY_APP_ID || !document.cookie.includes('privy');
  return missingKeys;
};

export const WalletProvider: React.FC<{
  children: React.ReactNode;
  isAuthenticated: boolean;
}> = ({ children, isAuthenticated }) => {
  const { ready, wallets } = useSolanaWallets();
  const setWallets = useWalletHandler((state) => state.setWallets);
  const initWalletManager = useWalletHandler(
    (state) => state.initWalletManager
  );
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 避免重复初始化
    if (isInitialized) return;

    // 检查是否处于演示模式
    if (isDemoMode()) {
      console.log('Running in demo mode, skipping wallet initialization');
      setIsInitialized(true);
      return;
    }

    // 正常模式下初始化钱包
    try {
      if (ready && isAuthenticated) {
        setWallets(wallets);
        initWalletManager();
        setIsInitialized(true);
      }
    } catch (error) {
      console.error('Error initializing wallet manager:', error);
    }
  }, [ready, isAuthenticated, initWalletManager, isInitialized]);

  return <>{children}</>;
};
