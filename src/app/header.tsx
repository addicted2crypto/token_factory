import Image from 'next/image';
import React from 'react';

export default function Header() {
  return (
   
    <div>
        <div className=' left-3 top-[13rem]'>Whats trending in the arena
         <Image src='/stars.png' width={55} height={55} alt='stars_logo' className='absolute left-3 top-[13rem]'/>
         </div>
    <div>Sections</div>
    
    <div className='absolute right-3 top-0'>
        
        <button className='pr-8 pt-4'>Connect Wallet</button>
    </div>
    
    </div>
  )
}
