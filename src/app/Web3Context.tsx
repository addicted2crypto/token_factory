"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BigNumberish, BrowserProvider, ethers, Contract } from 'ethers';
import TipsContractABI from "../abis/TipsContractABI.json";
// import { TicketX } from 'lucide-react';
// import { network } from 'hardhat';
import { Tip } from './types';


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

  const contractAddress = "0xbc54e54b31e345302D18991eB049008e0c9997d9";
  


  useEffect(() =>{
    if (window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);

      ethProvider.listAccounts().then(accounts => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0].address);
          // setCurrentAccount(window.ethereum[0]);
         

          const signer = ethProvider.provider;
          const tipsContract = new ethers.Contract(contractAddress, TipsContractABI, signer );
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
    
    if (!contract || !provider) return;
    try{
      
      const signer = await provider.getSigner();
      const contractWithSigner = contract.connect(signer);
    // const  tx = await contractWithSigner.addListener(tipId, true, { value: ethers.parseEther("0.069") });
    // await tx.wait();

    }catch (error) {
      console.error('Error upvoting tip in web3Context:', error)
    }
  }

  const getTopTips = async () => {
    if (!contract) return [];
    // console.log("loading top tips:", contract?.getTopTips());
    try {
      const topTips = await contract.getTopTips();
     console.log('Top 10 tips found', topTips);
     if (!Array.isArray(topTips)) {
      throw new Error("Top tips data is not an array");
    }

     
      // return topTips.map((tip: any) => ({
        const tipsArray = [];
        for (let i = 0; i < topTips.length; i ++){
          // if(i + 4 >= topTips.length){
          //   throw new Error("Array length broke");
          // }
        
       const id = Number(topTips[i][0] as BigNumberish);
       const author = topTips[i][1];
       const content = topTips[i][2];
       const upvotes = Number(topTips[i][3] as BigNumberish);
      //  const downvotes = Number(topTips[i + 4]as BigNumberish);

       if (isNaN(id) || isNaN(upvotes))  {
        console.warn('Skipping invalid tip data:', { id, author, content, upvotes});
        continue;
       }
        tipsArray.push({id, author, content, upvotes});
    }

    console.log('Parsed tips array:', tipsArray)
      return tipsArray;
    } catch (error: any) {
      console.error("Error fetching top 10 tips you broke it:", error.message || error);
      return [];
    }
  };

  const getTop90Tips = async () => {
    if (!contract) return [];

    try {
    const top90Tips = await contract.getTop90Tips();
        console.log('Top 90 tips also found', top90Tips);
     return top90Tips.map((tip: any) => ({
      id: Number(tip[0] as BigNumberish),
      author: tip[1] ,
      content: tip[2],
      upvotes: Number(tip[3] as BigNumberish),
      // downvotes: Number(tip[4]as BigNumberish),
     }))
    } catch (error: any) {
      console.error("Error fetching top90Tips:", error.message || error);
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
      // console.log('window.request.chainId');
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
  if (!context){
    throw new Error('You need a web3 Provider');
  }
  return context;
};
