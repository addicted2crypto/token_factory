import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import TipsContractABI from './TipsContractABI.json';


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
  contract: ethers.Contract | null;
  addTip: (content: string) => Promise<void>;
  upvoteTip: (tipId: number) => Promise<void>;
  getTips: () => Promise<any[]>;
}

const Web3Context = createContext<Web3ContextProps | undefined>(undefined);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);

      const contractAddress = "0x2840e02418542A9095A85E766d840375C01E4E4E";
      const tipsContract = new ethers.Contract(contractAddress, TipsContractABI, ethProvider.getSigner());
      setContract(tipsContract);
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

  const addTip = async (content: string) => {
    if (!contract) return;
    await contract.addTip(content);
  };

  const upvoteTip = async (tipId: number) => {
    if (!contract) return;
    await contract.upvoteTip(tipId);
  };

  const getTips = async () => {
    if (!contract) return [];
    return await contract.getTips();
  };

  return (
    <Web3Context.Provider value={{ connectWallet, disconnectWallet, currentAccount, provider, contract, addTip, upvoteTip, getTips }}>
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
