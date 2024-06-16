"use client"

import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';
import ConnectWalletButton from './actions/connectWallet';
import {ethers } from "ethers";
import SignIn from './actions/signIn';
import UploadTipForm from './actions/UploadTipForm';

const Header = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const TipsContractAddress = "0xe97a956fcca1c7bd23dd8e1fa840d97e8d2ef3be";
  const TipsContractABI = require("../../abi's/TipsContractABI.json");

  useEffect(() => {
    if(provider && signer) {
      const contractInstance = new ethers.Contract(TipsContractAddress, TipsContractABI, signer);
      setContract(contractInstance);
    }
  }, [provider, signer]);


const handleAccountChange = (account: string | null) => {
  setAccount(account);
  console.log('Account changed:', account);
};

const handleProviderChange = (provider: ethers.BrowserProvider | null) => {
  setProvider(provider);
  console.log('Provider changed:', provider);
};

const handleSignerChange = (signer: ethers.JsonRpcSigner | null) => {
  setSigner(signer);
  console.log('Signer changed:', signer);
};

const handleContractChange = (contract: ethers.Contract | null) => {
  setContract(contract);
  console.log('Contract changed:', contract);
};



  return (
   <div>
    <div>
      <SignIn />
        {/* <div className='stars absolute left-3 top-[13rem]'>Whats trending in the arena
         <Image src='/stars.png' width={55} height={55} alt='stars_logo' className='relative left-3 top-[1.3rem]'/><br />
         <div className='relative top-0'>Link your frens</div> */}
         </div>

    <div className='p-2'>Sections
    <Separator className='my-4'/>
    <div className='flex justify-center h-5 items-center space-x-6 text-sm'>
          <div>Section 1</div>
          <Separator orientation='vertical'className='text-white' />
          <div>Section 2</div>
          <Separator orientation='vertical'/>
          <div>Section 3</div>




    </div>
          
    </div>
    
    <div className='absolute right-3 top-0'>
        
       <ConnectWalletButton 
        onAccountChange={handleAccountChange}
        onProviderChange={handleProviderChange}
        onSignerChange={handleSignerChange}
        onContractChange={handleContractChange}
       />
    </div>
   
    <UploadTipForm contract={contract}/>
    </div>
  );
        };
        export default Header;
