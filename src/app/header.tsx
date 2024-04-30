import Image from 'next/image';
import React from 'react';
import ConnectWallet from './actions/connectWallet';

export default function Header() {
  return (
   
    <div>
        <div className='stars absolute left-3 top-[13rem]'>Whats trending in the arena
         <Image src='/stars.png' width={55} height={55} alt='stars_logo' className='relative left-3 top-[1.3rem]'/><br />
         <div className='relative top-0'>Link your frens</div>
         </div>

    <div>Sections</div>
    
    <div className='absolute right-3 top-0'>
        
       <ConnectWallet />
    </div>
    
    </div>
  )
}
