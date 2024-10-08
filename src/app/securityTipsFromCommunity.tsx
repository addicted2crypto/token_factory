
import React from 'react';
import Upvote from '@/components/ui/upvote';


import Highlightedvotedtips from './actions/highlightedvotedtips';


export default function SecurityTipsFromCommunity() {
  return (
    <div className='flex flex-col pt-8 pb-3'>
      
     <div className='text-3xl p-6 underline pb-4 text-[#58f907] font-mono'>Too upload Tips Login and upvote to highlight 👇</div>
    {/* add tab for 24 hr 3 days 1 week 1 month or all time toggle */}
    {/* <div className='hover:animate-pulse pl-6 text-indigo-600 italic'>Today's top 10</div> */}
    <div className='text-[#6a751b] p-6'>
      {/* add directions above form and form attributes from the blockchain */}
    <p>&rarr; Too vote: Login/Connect Wallet. Upvote up to 3 Tips per 24hrs. Upload 2 tips per 24hrs. Top 3 voted on tips, win a prize every Sunday.</p>
    </div>
      <section className='text-sm pl-12 pt-5 text-center'>
        <Highlightedvotedtips />
     
        <ol className=''>
          <li className='p-2 text-[#7cff6e] '><span className='text-[#ffffffeb]'> Example &rarr;</span> Create new wallets for all signatures and never sign from a wallet with assets</li>
         
        <li className='p-2'></li><span> <Upvote/></span>
        <li className='p-2'></li><span> <Upvote/></span>
        <li className='p-2'></li><span> <Upvote/></span>
        <li className='p-2'></li> 
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li>
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li><span></span>
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li><span>👍or👎 </span>
        
        </ol>
        
      </section>

      
    </div>
   
  )
};
