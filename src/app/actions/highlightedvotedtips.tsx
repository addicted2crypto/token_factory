"use client"

import { Vote, ListChecks, Handshake, GlobeLock, Cctv } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useWeb3 } from '../Web3Context'


// 

const Highlightedvotedtips: React.FC = () => {
  const { getTopTips } = useWeb3();
  const [tips, setTips] = useState<any[]>([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
       const fetchedTips = await getTopTips();
       console.log("Dat data from tips:", fetchTips);
   
  
  

    const tipsArray = fetchedTips.map((tip: any, index: number) => {
      console.log(`Raw data to be parsed ${index + 1}:`, tip);

      const id = tip[0] && typeof tip[0].toNumber === 'function' ? tip[0].toNumber() : tip[0];

      const parsedTip = {
      id: tip.id,
      author: tip.author.slice(0, 4) + '...' + tip.author.slice(38, 42),
      content: tip.content,
      upvotes: tip.upvote,
      downvotes: tip.downvote,
      };
      console.log(`Parsed tip ${index + 1}:`, parsedTip);
      return parsedTip;

    }).filter((tip: any) => tip.id !== 0);

    setTips(tipsArray);
    console.log('Fetched tips in tipsarray log:', tipsArray);

  } catch (error) {

    console.error("Error fetching tips... again:", error);
  }
};
 
  fetchTips();
  
}, [getTopTips]);


  return (
    <div className='flex-col pt-3'>
      <div className='flex justify-center gap-3.5'>
        <ListChecks />
      <Vote className='items-center'/>
      <Vote className='items-center'/>
      <Vote className='items-center'/>
      <Vote className='items-center'/>
      <Vote className='items-center'/>
      <ListChecks />
      </div>
    <div className='text-3xl p-6 text-slate-950'>➡️ Top voted submissions. Dynamic depending on votes. ⬅️</div>
    <div className='text-lg pb-3'>
      <ol>
       
        {tips.map((tip, index) => (
        <li key={tip.id}>
          <span className='text-[#40f77d] absolute left-[18rem]'>{index + 1}.{tip.author} created </span>
           {tip.content}
          {/* {tips.content} - {tips.index} Votes + contract.fetchTip */}
        </li>
        ))}
        {/* <li>
          <span className='text-[#d4d2d2] absolute left-[18rem]'>2</span>EXAMPLE... dont eat yellow snow
        </li>
        <li>
          <span className='text-[#d4d2d2] absolute left-[18rem]'>3</span>EXAMPLE... stop following infulencers
        </li>
        <li>
          <span className='text-[#d4d2d2] absolute left-[18rem]'>4</span>EXAMPLE... think more
        </li>
        <li>
          <span className='text-[#d4d2d2] absolute left-[18rem]'>5</span>EXAMPLE... dont leave everything in the same wallet you click shit with
        </li>
        <li>
         <span className='text-[#d4d2d2] absolute left-[18rem]'>6</span>EXAMPLE...
        </li> */}
      </ol>
    </div>
    <div className='flex justify-center gap-3 pb-10'>
    <GlobeLock /> <Handshake /> <Cctv />
    </div>
    </div>
  );
};

export default Highlightedvotedtips;