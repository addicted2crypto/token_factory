
import React from 'react'
import Upvote from './actions/upvote';
import { ImPacman } from "react-icons/im";


export default function SecurityTipsFromCommunity() {
  return (
    <div className='flex flex-col'>
     
    <div className='text-4xl pl-3 -sans underline pb-4 text-[#58f907] font-mono'>Community Tips Login and upvote to highlight 👇</div>
    <div className='hover:animate-pulse pl-6 text-indigo-600 italic'>Loading Today top 10</div>
    <div className='text-[#d2e252]'>
    <form>To vote: Login and upvote up to 3 Tips per 24hrs top 3 win a price every Sunday</form>
    </div>
      <section className='text-sm pl-12 pt-5 text-center'>
    
        <ol >
          <li className='p-2'>example &rarr; New wallets for all signatures</li>
          <ImPacman />
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li><span>👍or👎 <Upvote/></span>
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li><span>👍or👎 <Upvote/></span>
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li><span>👍or👎 <Upvote/></span>
        <li className='p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus nemo inci</li><span>👍or👎 <Upvote/></span>
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
