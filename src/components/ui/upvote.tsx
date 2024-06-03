"use client"


import React, { useEffect, useState } from 'react'
import { LiaThumbsUp, LiaThumbsDown} from "react-icons/lia";
import  { ethers }  from 'ethers';
import TipsContractABI from "../../abi's/TipsContractABI.json";

import ConnectWalletButton from '@/app/actions/connectWallet';
import { Button } from './button';
const tipsContractAddress = "";

// upvote will ++ count and downvote will -- 
// the whole vote section will check which state has the most upvotes to store it at the top
//use state to manage top 25 stories
export default function Upvote() {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const[count, setCount] = useState(0);
  
  const [provider, setProvider] =useState<ethers.BrowserProvider| null>(null);
  // const [upVote, downvote] =  useState(false);
 const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
 const [tipsContract, setTipsContract] = useState<ethers.Contract | null>(null);
  // const [votes, setVotes] = useState(0);
  
  //add test for auth and sign ins
  // const handleSignin = (e: any) => {
  //   if(e)console.log(0)

  //   }
  // useEffect(() => {
  //   document.title = `This input has ${count} votes`;
  // });

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);
      
    }
  }, []);

  useEffect(() => {
    const initializedSignerAndContract = async () => {
    if (provider) {
      const ethSigner = await provider.getSigner();
      const account = await ethSigner.getAddress();
        setCurrentAccount(account);
        setSigner(ethSigner);
       
       
        const contract = new ethers.Contract(tipsContractAddress, TipsContractABI, ethSigner);
        setTipsContract(contract);
      }
    };

    initializedSignerAndContract();
      
    
  }, [provider]);
      
  //     provider.listAccounts().then(accounts => {
  //       if (accounts.length > 0) {
  //         const account = accounts[0] as string;
  //         setCurrentAccount(account);
         
  //         const ethSigner = provider.getSigner(accounts[0]);
  //         setSigner(ethSigner);
  //         const contract = new ethers.Contract(tipsContractAddress, TipsContractABI, ethSigner);
  //         setTipsContract(contract);
  //       }
  //     });
  //   }
  // }, [provider]);


  // made this its own component
  // const connectWallet = async () => {
  //   if (provider) {
  //     await provider.send("eth_requestAccounts", []);
  //     const ethSigner = await provider.getSigner();
  //     const account = await ethSigner.getAddress();
  //     setCurrentAccount(account);
  //     setSigner(ethSigner);
  //     const contract = new ethers.Contract(tipsContractAddress, TipsContractABI, ethSigner);
  //     setTipsContract(contract);
  //   }
  // };

  const upVoteTip = async (tipIndex: number) => {
    if (!tipsContract || !signer) return;
    try {
      const tx = await tipsContract.upvoteTip(tipIndex, { value: ethers.parseEther("0.069") });
      await tx.wait();
      setCount(count + 1);

    } catch (error) {
      console.error("Error upvoting tip:", error)
    }
  };



  return (
    <div>
      {!currentAccount ? (
          <div className='flex items-center'>
          <ConnectWalletButton 
          onAccountChange={setCurrentAccount}
          onProviderChange={setProvider}
          onSignerChange={setSigner}
          onContractChange={setTipsContract}
          
          />
          <p className="p-2 rounded-md"
        > Log in to upvote. <span className='text-[#35b635]'> Double click upload button </span> for AI buddy assistance
        </p>
        <Button variant='default'>Upload you tip/security</Button>
        </div>
      
      ) : (
        <>
        <p>Vote here</p>
        </>
      
       
       
       
        
       )}
          <div>
            {/* add logged in user compoment here */}
            <p className='p-1 text-pretty text-sm text-[#30cd00]'>Highlighted tip/story <span className='text-lg text-[#d2d53e]'>{count}</span> vote count</p>
          <button 
              onClick={() => upVoteTip(0)}><LiaThumbsUp className='text-3xl hover:text-4xl transition hover:-translate-y-2 hover:-translate-x-2 hover:text-[#fff]'/></button>
           
          <button 
              onClick={() => setCount(count -1)}><LiaThumbsDown className='text-3xl hover:text-4xl transition hover:translate-y-2 hover:translate-x-2 hover:text-[#fff]'/></button>
              </div>
           {currentAccount ? <LiaThumbsUp />: <LiaThumbsDown />}
           </div>

   
  );
}
