"use client"

import { Vote, ListChecks, Handshake, GlobeLock, Cctv } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useWeb3 } from '../Web3Context'




const Highlightedvotedtips: React.FC = () => {
  const {currentAccount, getTopTips } = useWeb3();
  const [tips, setTips] = useState<any[]>([]);

  useEffect(() => {
    const fetchTips = async () => {
      try{
        
        const fetchedTips = await getTopTips();
        console.log("Dat data from tips:", fetchTips);
        



        const tipsArray = fetchedTips.map((tip: any, index: number) => {
          console.log(`Raw data to be parsed ${index + 1}:`, tip);

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
        console.error('Fetched tips in tipsarray log:', tipsArray);

      } catch (error) {

        console.error("Error fetching tips... again:", error);
      }
    };
  
    fetchTips();

  }, [currentAccount, getTopTips]);


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
      <div className='text-3xl p-6 text-slate-950'>➡️ Top voted submissions. Dynamic depending on votes. ⬅️</div>
      <div className='text-lg pb-3'>
        <ol>

          {/* add will have to map voted rankings in mapping */}

          {tips.map((tip, index) => (
            <li key={tip.id}>
              <span className='text-xl text-[#40f77d] absolute left-[14rem]'>{index + 1}. Created by {tip.author} </span>
             {/* import vote logic here if logged in */}
              <span className='text-xl text-[#000] text-center p-2'>{tip.content} 👎or 👍</span>

            </li>
          ))}
         
        </ol>
      </div>
      <div className='flex justify-center gap-3 pb-10'>
        <GlobeLock /> <Handshake /> <Cctv />
      </div>
    </div>
  );
};

export default Highlightedvotedtips;