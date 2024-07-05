"use client"


import { Vote, ListChecks, Handshake, GlobeLock, Cctv } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useWeb3 } from '../Web3Context'


const contract = "0xa8be1390d62b3e659ad060518d54c6b019a3cf0f"
export default function Highlightedvotedtips() {
  const { getTopTips } = useWeb3();
  const [topTips, setTopTips] = useState<any[]>([]);

  useEffect(() => {
  const fetchTips = async () => {
    const tipsFromContract = await getTopTips();
    setTopTips(tipsFromContract);
    console.log('Fetched tips:', tipsFromContract)
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
        {topTips.map((tips, index) => (
        <li key={tips.id}>
          <span className='text-[#d4d2d2] absolute left-[18rem]'>{index + 1}...{tips.author}</span>
          {tips.content} -{tips.index}Votes
          {/* {tips.content} - {tips.index} Votes + contract.fetchTip */}
        </li>
        ))}
        <li>
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
        </li>
      </ol>
    </div>
    <div className='flex justify-center gap-3'>
    <GlobeLock /> <Handshake /> <Cctv />
    </div>
    </div>
  )
}
