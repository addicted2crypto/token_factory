"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { ethers } from 'ethers';
import * as ethers from 'ethers';


declare global {
    interface Window {
      ethereum?: any;
    }
  }
  

interface Web3ContextProps {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  currentAccount: string | null;
  provider: ethers.BrowserProvider | null;
}

const Web3Context = createContext<Web3ContextProps | undefined>(undefined);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.ethers.BrowserProvider | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const ethProvider = new ethers.ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) return;
    try {
      const accounts = await provider.send('eth_requestAccounts', []);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setCurrentAccount(null);
  };

  return (
    <Web3Context.Provider value={{ connectWallet, disconnectWallet, currentAccount, provider }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = (): Web3ContextProps => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
