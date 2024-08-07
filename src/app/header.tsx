"use client"

import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';
import ConnectWalletButton from './actions/connectWallet';
import { ethers } from "ethers";

import UploadTipForm from './actions/UploadTipForm';
import { Button } from '@/components/ui/button';
import { SignOutButton } from '@clerk/nextjs';
import { useWeb3 } from './Web3Context';
import { Tip } from './types';



const Header = () => {
  const { getTopTips, upvoteTip,  } = useWeb3();
  const [tips, setTips] = useState<Tip[]>([]);
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [topTip, setTopTip] = useState<Tip | null>(null);

  const TipsContractAddress = "0xbc54e54b31e345302D18991eB049008e0c9997d9";
  const TipsContractABI = require("../abis/TipsContractABI.json");

  
  useEffect(() => {
    if (provider && signer) {
      const contractInstance = new ethers.Contract(TipsContractAddress, TipsContractABI, signer);
      setContract(contractInstance);
    }
  }, [provider, signer]);

  useEffect(() => {
    const fetchTopTips = async () => {
      const tips = await getTopTips();
      if(tips.length > 0) {
        setTopTip(tips[0]);
      }
    };
    fetchTopTips()
  }, [getTopTips]);

 

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
    <header>
    <div>
      <div className='pt-2 text-[#ffea65] text-bold text-2xl pb-5 overflow-auto px-1'>
        All crypto tips welcome. We all have lessons we should share with others.
        {/* <div className='stars absolute left-3 top-[13rem]'>Whats trending in the arena
         <Image src='/stars.png' width={55} height={55} alt='stars_logo' className='relative left-3 top-[1.3rem]'/><br />
         <div className='relative top-0'>Link your frens</div> */}
      </div>
         <h1>Top Tip</h1>
      <div className='p-2'>Monthly top Voted tip {topTip ? (
        <div className='text-xl text-[#72f903]'>
          <h2 className='absolute left-[38rem] text-[#00ff6a] text-3xl'>#{topTip.id}</h2>
          <h2>{topTip.content}</h2>
          <p ><span className='text-[#f1c812] text-3xl'>Weekly top Author:</span> {topTip.author.slice(0,3)}..{topTip.author.slice(39, 42)}</p>
         
        </div>
      ) : (
        <p>Loading top tip...</p>
      )}
        <Separator className='my-4' />
        <div className='hidden md:flex justify-center h-5 items-center space-x-6 text-sm'>
          <div className='text-[#56a632]'>Coming soon.... coinfessions on chain</div>
          <Separator orientation='vertical' className='text-white' />
          <div className='text-[#56a632]'>Runner up toptip</div>
          <Separator orientation='vertical' />
          <div className='text-[#56a632]'>Third weekly top voted tip </div>




        </div>

      </div>
      <div>
        <div className='md:flex md:absolute md:top-2 md:right-2 p-2'>
          {!signer  ? (

            <ConnectWalletButton
              onAccountChange={handleAccountChange}
              onProviderChange={handleProviderChange}
              onSignerChange={handleSignerChange}
              onContractChange={handleContractChange}
              
            />

          ) : (
            
            <div className='space-y-1'>
              
              <Button variant="outline" className="bg-[#091157] text-[#fff] hover:-translate-x-1 hover:-translate-y-1">{account?.slice(0, 6) + '...' + account?.slice(38, 42)}</Button>
              
             
             
              <Separator orientation='horizontal' />
              <div className='w-[12rem] rounded-md border-2 bg-[#937373] hover:translate-x-1 hover:translate-y-1 text-[#e2e0e0]'>
              <SignOutButton>Diconnect Wallet</SignOutButton>
              </div>
            </div>
          )}
        </div>
      </div>
        <UploadTipForm contract={contract} />
      </div>
      </header>
      );
        };
      export default Header;
