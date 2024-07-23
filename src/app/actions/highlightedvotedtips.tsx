"use client"

import { Button } from '@/components/ui/button';
import { useAuth, SignInButton, useUser } from '@clerk/nextjs';
import { Vote, ListChecks, Handshake, GlobeLock, Cctv } from 'lucide-react';

import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../Web3Context';





const Highlightedvotedtips: React.FC = () => {
  const { currentAccount, getTopTips, switchNetwork, currentNetwork, getAllTips } = useWeb3();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const [tips, setTips] = useState<any[]>([]);
  const [allTips, setAllTips] = useState<any[]>([]);


  const [networkWarning, setNetworkWarning] = useState(false);
  const targetNetworkId = '0xaa36a7';
  //add networks here

  useEffect(() => {
    const fetchTips = async () => {
      if (isSignedIn && currentAccount && !networkWarning) {
        try {

          const fetchedTips = await getTopTips();
          const tipsArray = fetchedTips.map((tip: any, index: number) => ({
           
            id: tip.id,
            author: tip.author.slice(0, 3) + '...' + tip.author.slice(39, 42),
            content: tip.content,
            upvotes: tip.upvote,
            downvotes: tip.downvote,
           
          })).filter((tip: any) => tip.id !== 0);

          setTips(tipsArray);
          // console.error('Fetched tips in tipsarray log:', tipsArray);
          // const isLoggedIn = 

        } catch (error) {

          console.error("Error fetching tips... again:", error);
        }
      }
    };

    fetchTips();

  }, [isSignedIn, currentAccount, getTopTips, networkWarning]);

  useEffect(() => {
    const fetchAllUploadedTips = async () => {
    if (isSignedIn && currentAccount && !networkWarning) {
      try {
        const fetchedAllTips = await getAllTips();

        const allTipsArray = fetchedAllTips.map((tips: any, index: number) => ({

          id: tips.id,
          author: tips.author.slice(0, 3) + '...' + tips.author.slice(39, 42),
          content: tips.content,
          upvotes: tips.upvote,
          downvotes: tips.downvote,
        })).filter((tips: any) => tips.id !== 0);

        setAllTips(allTipsArray);

      } catch (error) {

          console.error("Error fetching tip all the tips:", error);
        }
      }
    };
    fetchAllUploadedTips();
  }, [isSignedIn, currentAccount, getAllTips, networkWarning])




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
    <div className='flex-col pt-3'>
      <div className='flex justify-center gap-3.5'>
        <ListChecks />
        <Vote className='items-center' />
        <Vote className='items-center' />
        <Vote className='items-center' />
        <Vote className='items-center' />
        <Vote className='items-center' />
        <ListChecks />
      </div>
      <div className='text-3xl p-6 text-slate-950'>➡️ Top voted submissions. Dynamic depending on votes. Share your <span className='text-[#5c0000]'> pain</span> to help others learn! ⬅️</div>
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
        <div className='text-lg pb-3'>
          <ol>

            {/* add will have to map voted rankings in mapping */}

            {tips.map((tip, index) => (
              <li key={tip.id} className="p-2 overflow-auto">

                <span className='text-xl text-[#40f77d] absolute left-[.25rem] sm:left-[3rem] md:left-[14rem]'>{index + 1}. Created by {tip.author} </span>
                
                <span className='text-xl text-[#000] text-center overflow-auto'>{tip.content}</span>

              </li>
            ))}

          </ol>
          <div className='text-md p-1'>
          <ol>
            {allTips.map((tips, index) => (
             <li key={tips.id} className="p-2 overflow-auto">
              <span className='text-xl text-[#000] absolute left-[.25] sm:left-[3rem] md:left-[14rem]'>{index + 1}.Created by {tips.author}
                {tips.content}
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