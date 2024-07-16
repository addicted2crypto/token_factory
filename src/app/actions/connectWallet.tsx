"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { ethers, parseEther } from 'ethers';
import { SignInButton } from '@clerk/nextjs';


//parseEther for avax as well to minimize e18
// const eth = parseEther("1.0")

interface ConnectWalletButtonProps {
  onAccountChange: (account: string | null) => void;
  onProviderChange: (provider: ethers.BrowserProvider | null) => void;
  onSignerChange: (signer: ethers.JsonRpcSigner | null) => void;
  onContractChange: (contract: ethers.Contract | null) => void; 
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  onAccountChange,
  onProviderChange,
  onSignerChange,
  onContractChange
}) => {
  // const [provider, setProvider] = useState(null);
  // const [signer, setSigner] = useState(null);

  const tipsContractAddress = "0xCb4AaF0c0cC6080cA85e5D9B4c0Afa3674A4e363";
  const TipsContractABI = require( "../../abis/TipsContractABI.json");

  const connectWallet = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const ethProvider = new ethers.BrowserProvider((window as any).ethereum);
      await ethProvider.send("eth_requestAccounts", []);
      const ethSigner = await ethProvider.getSigner();
      const account = await ethSigner.getAddress();
      

      
      // setProvider(ethProvider);
      // setSigner(ethSigner);

      if(onProviderChange) onProviderChange(ethProvider);
      if(onSignerChange) onSignerChange(ethSigner);
      if(onAccountChange) onAccountChange(account);
        
      const contract = new ethers.Contract(tipsContractAddress, TipsContractABI, ethSigner);
       onContractChange(contract);
    // } else {
    //   console.log("Wallet extension is no where to be found in window, please connect your wallet");
    }
    };
    return (
    <Button variant="destructive" onClick={connectWallet}><SignInButton />Wallet Connect</Button>
    );

    };
  




  
export default ConnectWalletButton;