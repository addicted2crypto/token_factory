"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';


//add Will need to add abi import
//add import TipsContractABI from '@contracts/TipsContractABI.json'; 


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

   
    // add  const tipsContract = new ethers.Contract(contractAddress, TipsContractABI, ethProvider.getSigner());
    // const tipsContract = new ethers.Contract(contractAddress, window.ethereum)
    //   setContract(tipsContract);
    ethProvider.listAccounts().then(accounts => {
        if(accounts.length > 0) {
            setCurrentAccount(accounts[0].address);
        }
    });
    }
  }, []);

  const contractAddress = "0x2840e02418542A9095A85E766d840375C01E4E4E";
  const contractABI = [[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"addressToTips","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTips","outputs":[{"components":[{"internalType":"string","name":"content","type":"string"},{"internalType":"address","name":"submitter","type":"address"},{"internalType":"uint256","name":"upvotes","type":"uint256"}],"internalType":"struct CommunityTips.Tip[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getTipsByAddress","outputs":[{"components":[{"internalType":"string","name":"content","type":"string"},{"internalType":"address","name":"submitter","type":"address"},{"internalType":"uint256","name":"upvotes","type":"uint256"}],"internalType":"struct CommunityTips.Tip[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_content","type":"string"}],"name":"submitTip","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tips","outputs":[{"internalType":"string","name":"content","type":"string"},{"internalType":"address","name":"submitter","type":"address"},{"internalType":"uint256","name":"upvotes","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"upvoteTip","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"votingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]];

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
