"use client"

import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';
import ConnectWalletButton from './actions/connectWallet';
import { ethers } from "ethers";

import UploadTipForm from './actions/UploadTipForm';


const Header = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const TipsContractAddress = "0xc87326de704671D76d4Ba3F860BB43a3d649A0cc";
  const TipsContractABI = require("../abi's/TipsContractABI.json");

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
    <div className='pt-2'>
      wallet object for logged in user
        {/* <div className='stars absolute left-3 top-[13rem]'>Whats trending in the arena
         <Image src='/stars.png' width={55} height={55} alt='stars_logo' className='relative left-3 top-[1.3rem]'/><br />
         <div className='relative top-0'>Link your frens</div> */}
         </div>

    <div className='p-2'>Monthly top Voted tip `$[addtopvotedobject][totalvotesobject]`
    <Separator className='my-4'/>
    <div className='flex justify-center h-5 items-center space-x-6 text-sm'>
          <div className='text-[#56a632]'>Leading weekly top voted tip $[topvotedobject(1)][totalvotesobject]</div>
          <Separator orientation='vertical'className='text-white' />
          <div className='text-[#56a632]'>Second weekly top voted tip [totalvotesobject]</div>
          <Separator orientation='vertical'/>
          <div className='text-[#56a632]'>Third weekly top voted tip [totalvotesobject]</div>




    </div>
          
    </div>
    
    <div className='absolute right-3 top-2'>
        
       <ConnectWalletButton 
        onAccountChange={handleAccountChange}
        onProviderChange={handleProviderChange}
        onSignerChange={handleSignerChange}
        onContractChange={handleContractChange}
       /> :
    </div>
   
    <UploadTipForm contract={contract}/>
    </div>
  );
        };
        export default Header;
