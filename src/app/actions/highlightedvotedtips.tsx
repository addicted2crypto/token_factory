"use client"

import { Button } from '@/components/ui/button';
import { useAuth, SignInButton, useUser } from '@clerk/nextjs';
import UploadTipForm from '../actions/UploadTipForm';
import { Vote, ListChecks, Handshake, GlobeLock, Cctv } from 'lucide-react';
import { ethers } from "ethers";
import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../Web3Context';
import { Tip } from '../types';









const Highlightedvotedtips: React.FC = () => {
  const { currentAccount, getTopTips, switchNetwork, currentNetwork, getTop90Tips, upvoteTip } = useWeb3();
  const [tips, setTips] = useState<Tip[]>([]);
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const [topTips, setTopTips] = useState<any[]>([]);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [allTips, setAllTips] = useState<any[]>([]);


  const [networkWarning, setNetworkWarning] = useState(false);
  const targetNetworkId = '0xaa36a7';
  //avax chain target id = '0xA86A'
  //add networks here

  useEffect(() => {
    const fetchTips = async () => {
      if (isSignedIn && currentAccount && !networkWarning && currentNetwork) {
        try {
          console.log('Fetching top tips...');

          const fetchedTips = await getTopTips();

          if (Array.isArray(fetchedTips)) {


            const tipsArray = fetchedTips.map((tip: any, index: number) => ({

              id: Number(tip.id),
              author: tip.author.slice(0, 3) + '...' + tip.author.slice(39, 42),
              content: tip.content,
              votes: Number(tip.votes),
              timestamp: Number(tip.timestamp)


            }));

            tipsArray.sort((a, b) => b.votes - a.votes);

            setTopTips(tipsArray);
            console.log('Mapped tips:', fetchedTips)

          } else {
            console.error('Fetched tips is not and array error do better dummy:', fetchTips);
          }
        } catch (error: any) {

          console.error("Error fetching tips... again:", error.message || error);
        }
      }
    };

    fetchTips();

  }, [isSignedIn, currentAccount, networkWarning, currentNetwork]);


  useEffect(() => {
    const fetchAllUploadedTips = async () => {
      if (isSignedIn && currentAccount && !networkWarning) {
        try {
          const fetchedAllTips = await getTop90Tips();

          const allTipsArray = fetchedAllTips.map((tips: any) => ({

            id: tips.id,
            author: tips.author.slice(0, 3) + '...' + tips.author.slice(39, 42),
            content: tips.content,
            votes: Number(tips.votes),
            timestamp: Number(tips.timestamp),
          })).filter((tips: any) => tips.id !== 0);

          setAllTips(allTipsArray);

        } catch (error) {

          console.error("Error fetching all the tips:", error);
        }
      }
    };
    fetchAllUploadedTips();
  }, [isSignedIn, currentAccount, getTop90Tips, networkWarning])

  const handleUpvote = async (tipId: number) => {
    if (!currentAccount) return;
    try {

      await upvoteTip(tipId, true);

      await getTopTips();

    } catch (error) {
      console.error('Error voting on tip:', error);
    }
  };





  useEffect(() => {
    const checkNetwork = async () => {
      if (window.ethereum) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== targetNetworkId) {
          setNetworkWarning(true);
          //add change network id to == alert here`
        } else {
          setNetworkWarning(false);
        }
      }
    };
    checkNetwork();
    const handleChainChanged = (chainId: string) => {
      if (chainId !== targetNetworkId) {
        setNetworkWarning(true);
      } else {
        setNetworkWarning(false);
        window.location.reload();
      }
    };

    window.ethereum.on('chainChanged', handleChainChanged);



    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('ChainChanged', handleChainChanged);
      }
    };
  }, [targetNetworkId]);

  const handleSwitchNetwork = async () => {
    try {
      await switchNetwork(targetNetworkId);
    } catch (error) {
      console.log('Failed to switch to the correct network', error);
    }
  };


  return (
    <div className=' flex-col pt-3  '>
      <UploadTipForm contract={contract} />
      <div className='hidden md:flex justify-center gap-3.5'>
        <ListChecks />
        <Vote className='items-center ' />
        <Vote className='items-center' />
        <Vote className='items-center' />
        <Vote className='items-center' />
        <Vote className='items-center' />
        <ListChecks />
      </div>
      <div className='text-3xl p-6 text-slate-950 overflow-auto'>➡️ Top voted submissions. Dynamic depending on votes. Share your<span className='text-[#5c0000]'> pain</span> to help others learn! ⬅️</div>
      <div className='text-1xl p-3 text-[#aeadad] overflow-auto'>Launching on your favorite EVM blockchain soon! <span className='text-[#ce0f0f]'>0.69 </span>avax to upload <span className='text-[#ce0f0f]'>0.069</span> avax to vote</div>
      {!isLoaded ? (
        <p className='animate'>Loading...</p>
      ) : !isSignedIn ? (
        <SignInButton mode='modal'>Sign in by Connecting Wallet

        </SignInButton>
      ) : networkWarning ? (
        <div className='gap-1'>
          <p className='text-2xl text-[#bc0000] p-2'>
            Please switch to the Sepolia network.
            <Button onClick={handleSwitchNetwork} className='btn-warning'>Switch Network</Button>
          </p>
        </div>
      ) : (
        <div className='p-3'>
          <ol>

            {/* add will have to map voted rankings in mapping */}

            {topTips.map((tip: any, index: number) => (
              <li key={tip.id || index} className="p-2 overflow-auto">

                <span className='text-xl text-[#003411] overflow-auto lg:absolute lg:left-[8.75rem] sm:left-[3rem] md:left-[14rem]'>{tip.votes > 0 ? `Rank ${index + 1}` : `ID ${tip.id}`}.Created by {tip.author}</span>
                <span className='absolute right-[10rem] text-sm text-[#d86464]'>Upvotes:{tip.votes}</span>

                <span className='text-xl text-[#001d22] text-center overflow-auto'> {tip.content} <Button variant='ghost' className='text-[#000] hover:translate-x-2 hover:translate-y-2' onClick={() => handleUpvote(tip.id)}>Upvote</Button></span>

              </li>
            ))}

          </ol>

          <div className='text-md p-1'>
            <ol>
              <p className='text-3xl text-[#b4ae04] pt-10'>
                Votes 11 though 100.
              </p>
              {allTips.map((tips, indx) => (
                <li key={tips.id} className="p-2 overflow-auto">
                  <span className='text-xl text-[#000] absolute left-[.25rem] sm:left-[3rem] md:left-[14rem]'>{tips.id}.Created by {tips.author}
                    <span className='text-xl text-center text-[#01282fcc]'> {tips.content}</span>
                    <span className='absolute right-[10rem] text-sm text-[#d86464]'>Upvotes:{tips.votes}</span>
                  </span>
                </li>

              ))}




            </ol>
          </div>
        </div>
      )}
      <div className='flex justify-center gap-3 pb-10'>
        <GlobeLock /> <Handshake /> <Cctv />
      </div>
    </div>
  );
};

export default Highlightedvotedtips;