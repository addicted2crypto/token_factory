
import React from 'react';
import Upvote from '@/components/ui/upvote';


import Highlightedvotedtips from './actions/highlightedvotedtips';


export default function SecurityTipsFromCommunity() {
  return (
    <div className='flex flex-col'>
      
     <div className='text-4xl pl-3 -sans underline pb-4 text-[#58f907] font-mono'>Community Tips Login and upvote to highlight 👇</div>
    {/* add tab for 24 hr 3 days 1 week 1 month or all time toggle */}
    <div className='hover:animate-pulse pl-6 text-indigo-600 italic'>Today's top 10</div>
    <div className='text-[#6a751b]'>
      {/* add directions above form and form attributes from the blockchain */}
    <form>To vote: Login and upvote up to 3 Tips per 24hrs. Top 3 voted on tips, win a prize every Sunday</form>
    </div>
      <section className='text-sm pl-12 pt-5 text-center'>
        <Highlightedvotedtips />
     
        <ol className=''>
          <li className='p-2 text-[#7cff6e] '><span className='text-[#ffffffeb]'> example &rarr;</span> Create new wallets for all signatures and never sign from a wallet with assets</li>
         
        <li className='p-2'></li><span> <Upvote/></span>
        <li className='p-2'></li><span><Upvote/></span>
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li><span><Upvote/></span>
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li><span><Upvote/></span>
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li><span>👍or👎 <Upvote/></span>
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li><span>👍or👎</span>
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li><span>👍or👎</span>
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li><span>👍or👎</span>
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li><span>👍or👎</span>
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li><span>👍or👎</span>
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li><span>👍or👎</span>
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li><span>👍or👎</span>
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li><span>👍or👎</span>
        
        </ol>
        
      </section>

      
    </div>
   
  )
};
