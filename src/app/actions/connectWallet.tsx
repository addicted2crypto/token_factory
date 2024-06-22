"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { ethers, parseEther } from 'ethers';


//parseEther for avax as well to minimize e18
const eth = parseEther("1.0")

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

  const tipsContractAddress = "0xe97a956f0xfB2241f13118a2a8991766dd02AF3822B68FEB1A";
  const TipsContractABI = require("../../abi's/TipsContractABI.json");

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
    <Button variant="destructive" onClick={connectWallet}>Wallet Connect</Button>
    );

    };
  




  
export default ConnectWalletButton;