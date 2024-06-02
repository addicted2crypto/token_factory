"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { ethers } from 'ethers';


const ConnectWalletButton = ({ onAccountChange, onProviderChange, onSignerChange, onContractChange }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const tipsContractAddress = "";
  const TipsContractABI = require("../../abi's/TipsContractABI.json");

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      await ethProvider.send("eth_requestAccounts", []);
      const ethSigner = await ethProvider.getSigner();
      const account = await ethSigner.getAddress();

      setProvider(ethProvider);
      setSigner(ethSigner);

      if(onProviderChange) onProviderChange(ethProvider);
      if(onSignerChange) onSignerChange(ethSigner);
      if(onAccountChange) onAccountChange(account);

      const contract = new ethers.Contract(tipsContractAddress, TipsContractABI, ethSigner);
      if(onContractChange) onContractChange(contract);


    }
  };




  return (
    <div className='p-1'>
      
      <Button variant='default'onClick={connectWallet}>Wallet connect</Button>
   
    </div>
  );
};
export default ConnectWalletButton;