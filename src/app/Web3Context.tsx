"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BigNumberish, ethers } from 'ethers';
import TipsContractABI from "../abis/TipsContractABI.json";


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
  getTopTips: () => Promise<any[]>;
}



const Web3Context = createContext<Web3ContextProps | undefined>(undefined);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const contractAddress = "0xa8be1390d62b3e659ad060518d54c6b019a3cf0f";

  useEffect(() =>{
    if (window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);

      ethProvider.listAccounts().then(accounts => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0].address);
          const signer = ethProvider.provider;
          const tipsContract = new ethers.Contract(contractAddress, TipsContractABI, signer);
          setContract(tipsContract);
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) return;
    try {
      const accounts = await provider.send('eth_requestAccounts', []);
      // setCurrentAccount(accounts[0]);
      const signer = await provider.getSigner();
      const tipsContract = new ethers.Contract(contractAddress, TipsContractABI, signer);
      setContract(tipsContract);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setCurrentAccount(null);
    setContract(null);
  };

  const addTip = async (content: string) => {
    if (!contract) return;
    await contract.uploadTip(content, { value: ethers.parseEther("0.69") });
  };

  const upvoteTip = async (tipId: number) => {
    if (!contract) return;
    await contract.vote(tipId, true, { value: ethers.parseEther("0.069") });
  };

  const getTopTips = async () => {
    if (!contract) return [];
    // return await contract.getTopTips();
    try {
      const topTips = await contract.getTopTips();
      console.log("Fetched tips array:", topTips);

      return topTips.map((tip: any) => ({
        id: Number(tip[0] as BigNumberish),
        author: tip[1] ,
        content: tip[2],
        upvotes: Number(tip[3] as BigNumberish),
        downvotes: Number(tip[4]as BigNumberish),
      }));
    } catch (error) {
      console.error("Error fetching tips:", error);
      return [];
    }
  };

  return (
    <Web3Context.Provider value={{ connectWallet, disconnectWallet, currentAccount, provider, contract, addTip, upvoteTip, getTopTips }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = (): Web3ContextProps => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('use Web3 must be used within a Web3Provider');
  }
  return context;
};
