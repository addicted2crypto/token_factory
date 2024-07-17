"use client"

import { useAuth, SignInButton, useUser } from '@clerk/nextjs';
import { Vote, ListChecks, Handshake, GlobeLock, Cctv, DiscAlbum } from 'lucide-react';

import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../Web3Context';





const Highlightedvotedtips: React.FC = () => {
  const {  currentAccount, getTopTips, connectWallet, switchNetwork, currentNetwork } = useWeb3();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const [tips, setTips] = useState<any[]>([]);
  
 
  const [networkWarning, setNetworkWarning] = useState(false);
const targetNetworkId ='0xaa36a7';
 //add networks here
  
  useEffect(() => {
    const fetchTips = async () => {
      if(isSignedIn && currentAccount) {
      try{
        
        const fetchedTips = await getTopTips();

        console.log("Dat data from tips:", fetchTips);
       
        const tipsArray = fetchedTips.map((tip: any, index: number) => {
          // console.log(`Raw data to be parsed ${index + 1}:`, tip);

          const id = tip[0] && typeof tip[0].toNumber === 'function' ? tip[0].toNumber() : tip[0];

          const parsedTip = {
            id: tip.id,
            author: tip.author.slice(0, 3) + '---' + tip.author.slice(38, 42),
            content: tip.content,
            upvotes: tip.upvote,
            downvotes: tip.downvote,
          };
          console.log(`Parsed tip ${index + 1}:`, parsedTip);
          
          return parsedTip;

        }).filter((tip: any) => tip.id !== 0);

        setTips(tipsArray);
        // console.error('Fetched tips in tipsarray log:', tipsArray);
        // const isLoggedIn = 
      
      } catch (error) {

        console.error("Error fetching tips... again:", error);
      }
    }
    };
  
    fetchTips();

  }, [isSignedIn, currentAccount, getTopTips]);

  useEffect(() => {
    const checkNetwork = async () => {
      if(window.ethereum) {
        const chainId = await window.ethereum.request({method: 'eth_chainId'});
        if(chainId !== targetNetworkId) {
          setNetworkWarning(true);
          //add change network id to == alert here`
        } else {
          setNetworkWarning(false);
        }
      }
    };
    checkNetwork();

    window.ethereum.on('chainChanged', (chainId: string) => {
      if (chainId !== targetNetworkId) {
        setNetworkWarning(true);

      } else {
        setNetworkWarning(false);
        window.location.reload();
      }
    });
    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('ChainChanged', checkNetwork);
      }
    };
  }, [targetNetworkId]);

  const handleSwitchNetwork = async () => {
    try {
      await switchNetwork(targetNetworkId);
    } catch (error){
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
        <SignInButton mode='modal'>
          <button className='btn-primary'>Sign in by Connecting Wallet</button>
        </SignInButton>
      ): networkWarning ? (
        <div>
          <p>
            Please switch to the Sepolia network.
            <button onClick={handleSwitchNetwork} className='btn-warning'>Switch Network</button>
          </p>
        </div>
      ) : (
      <div className='text-lg pb-3'>
        <ol>

          {/* add will have to map voted rankings in mapping */}

          {tips.map((tip, index) => (
            <li key={tip.id} className="p-2 overflow-auto">
              
              <span className='text-xl text-[#40f77d] absolute left-[.25rem] sm:left-[3rem] md:left-[14rem]'>{index + 1}. Created by {tip.author} </span>
             {/* import vote logic here if logged in */}
             <span className='text-xl text-[#000] text-center overflow-auto'>{tip.content}</span>

            </li>
          ))}
         
        </ol>
      </div>
      )}
      <div className='flex justify-center gap-3 pb-10'>
        <GlobeLock /> <Handshake /> <Cctv />
      </div>
    </div>
  );
};

export default Highlightedvotedtips;