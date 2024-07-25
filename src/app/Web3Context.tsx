"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BigNumberish, ethers } from 'ethers';
import TipsContractABI from "../abis/TipsContractABI.json";
// import { network } from 'hardhat';



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
  getTop90Tips: () => Promise<any[]>;
  deleteTips: (tipId: number) => Promise<void>;
  switchNetwork: (networkId: string) => Promise<void>;
  currentNetwork: string;
}



const Web3Context = createContext<Web3ContextProps | undefined>(undefined);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  
  const [currentNetwork, setCurrentNetwork] = useState<string>('');

  const contractAddress = "0x0730081d970DaB266f4265eC0D6f90d6cD67E2Fd";
  


  useEffect(() =>{
    if (window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);

      ethProvider.listAccounts().then(accounts => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0].address);
          // setCurrentAccount(window.ethereum[0]);
         

          const signer = ethProvider.provider;
          const tipsContract = new ethers.Contract(contractAddress, TipsContractABI, signer);
          setContract(tipsContract);
        }
      });
      window.ethereum.request({method: 'eth_chainId'}).then((chainId: string) => {
        setCurrentNetwork(chainId);
      });
      window.ethereum.on('chainChanged', (chainId: string) => {
        setCurrentNetwork(chainId);
        window.location.reload();
      });
    }
  }, []);


  const SendWalletData = async () => {
    console.log(SendWalletData.arguments)
  }

  const connectWallet = async () => {
    // const network = await provider?.getNetwork();
    // const chainId = network?.chainId;
   
    if (!provider) return;
    try {
      const accounts = await provider.send('eth_requestAccounts', []);
      setCurrentAccount(accounts[0]);
      const signer = await provider.getSigner();
      const tipsContract = new ethers.Contract(contractAddress, TipsContractABI, signer);
      setContract(tipsContract);
      
     
      const network = await provider.getNetwork();

      setCurrentNetwork(network.chainId.toString());
     
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

  const deleteTips = async (tipId: number) => {
    if(getTopTips.caller === getTopTips.arguments) return;
   
  };



  const upvoteTip = async (tipId: number) => {
    if (!contract) return;
    await contract.vote(tipId, true, { value: ethers.parseEther("0.069") });
  };

  const getTopTips = async () => {
    if (!contract) return [];
   
    try {
      const topTips = await contract.getTopTips();
     console.log('Top 10 tips found', getTopTips);
      return topTips.map((tip: any) => ({
       
        id: Number(tip[0] as BigNumberish),
        author: tip[1] ,
        content: tip[2],
        upvotes: Number(tip[3] as BigNumberish),
        downvotes: Number(tip[4]as BigNumberish),
      }))
     
      
    } catch (error: any) {
      console.error("Error fetching tips:", error.message || error);
      return [];
    }
  };

  const getTop90Tips = async () => {
    if (!contract) return [];

    try {
    const top90Tips = await contract.getTop90Tips();
        console.log('Top 90 tips also found', getTop90Tips);
     return top90Tips.map((tip: any) => ({
      id: Number(tip[0] as BigNumberish),
      author: tip[1] ,
      content: tip[2],
      upvotes: Number(tip[3] as BigNumberish),
      downvotes: Number(tip[4]as BigNumberish),
     }))
    } catch (error) {
      console.error("Error fetching top90Tips:", error);
      return [];
    }
    };

  

  const switchNetwork = async (networkId: string) => {
    if (!window.ethereum) return;
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkId }],
       
      });
      console.log('window.request.chainId');
    } catch (error) {
      console.error('Error switching networks do better: ', error);
    }
  };

  return (
    <Web3Context.Provider value={{ connectWallet, disconnectWallet, currentAccount, provider, contract, addTip, upvoteTip, getTopTips, getTop90Tips, deleteTips, currentNetwork, switchNetwork }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = (): Web3ContextProps => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('You need a web3 Provider');
  }
  return context;
};
