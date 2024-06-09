"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { ethers } from 'ethers';



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
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const tipsContractAddress = "0x2840e02418542A9095A85E766d840375C01E4E4E";
  const TipsContractABI = require("../../abi's/TipsContractABI.json");

  const ConnectWalletButton = async () => {
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
    } else {
      console.log("Ethereum object is no where to be found in window, please connect your wallet");

    }


    };
  




  return (
    <div className='p-1'>
      
      <Button variant='destructive' onClick={ConnectWalletButton}>Wallet connect</Button>
   
    </div>
  );
};
export default ConnectWalletButton;