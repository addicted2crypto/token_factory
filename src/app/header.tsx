"use client"

import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';
import ConnectWalletButton from './actions/connectWallet';
import { ethers } from "ethers";

import UploadTipForm from './actions/UploadTipForm';
import { Button } from '@/components/ui/button';
import { SignedIn, SignInButton, SignOutButton } from '@clerk/nextjs';


const Header = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  

  const TipsContractAddress = "0xbc54e54b31e345302D18991eB049008e0c9997d9";
  const TipsContractABI = require("../abis/TipsContractABI.json");

  useEffect(() => {
    if (provider && signer) {
      const contractInstance = new ethers.Contract(TipsContractAddress, TipsContractABI, signer);
      setContract(contractInstance);
    }
  }, [provider, signer]);


  const handleAccountChange = (account: string | null) => {
    setAccount(account);
    // console.log('Account changed:', account);
  };

  const handleProviderChange = (provider: ethers.BrowserProvider | null) => {
    setProvider(provider);
    // console.log('Provider changed:', provider);
  };

  const handleSignerChange = (signer: ethers.JsonRpcSigner | null) => {
    setSigner(signer);
    // console.log('Signer changed:', signer);
  };

  const handleContractChange = (contract: ethers.Contract | null) => {
    setContract(contract);
    // console.log('Contract changed:', contract);
  };



  return (
    <div>
      <div className='pt-2'>
        Crypto coinfessions.
        {/* <div className='stars absolute left-3 top-[13rem]'>Whats trending in the arena
         <Image src='/stars.png' width={55} height={55} alt='stars_logo' className='relative left-3 top-[1.3rem]'/><br />
         <div className='relative top-0'>Link your frens</div> */}
      </div>

      <div className='p-2'>Monthly top Voted tip `$[addtopvotedobject][totalvotesobject]`
        <Separator className='my-4' />
        <div className='flex justify-center h-5 items-center space-x-6 text-sm'>
          <div className='text-[#56a632]'>Leading weekly top voted tip $[topvotedobject(1)][totalvotesobject]</div>
          <Separator orientation='vertical' className='text-white' />
          <div className='text-[#56a632]'>Second weekly top voted tip [totalvotesobject]</div>
          <Separator orientation='vertical' />
          <div className='text-[#56a632]'>Third weekly top voted tip [totalvotesobject]</div>




        </div>

      </div>
      <div>
        <div className='absolute top-2 right-2 p-2'>
          {!signer  ? (

            <ConnectWalletButton
              onAccountChange={handleAccountChange}
              onProviderChange={handleProviderChange}
              onSignerChange={handleSignerChange}
              onContractChange={handleContractChange}
              
            />

          ) : (
            
            <div className='md:w-[max] space-y-1'>
              
              <Button variant="outline" className="bg-[#091157] text-[#fff] hover:-translate-x-1 hover:-translate-y-1">{account?.slice(0, 6) + '...' + account?.slice(38, 42)}</Button>
              
              <div className='rounded-md bg-slate-600'>
                {/* <button className='p-2'>Disconnnect wallet
                 add fix this to show logged in disconnect*/}
                {/* </button> */}
               
              </div>
              <Separator orientation='horizontal' />
              <div className='rounded-md border-2 bg-[#937373] hover:translate-x-1 hover:translate-y-1 text-[#e2e0e0]'>
              <SignOutButton />
              </div>
            </div>
          )}
        </div>
      </div>
        <UploadTipForm contract={contract} />
      </div>
      );
        };
      export default Header;
