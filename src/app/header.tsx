

import { Separator } from '@/components/ui/separator';
import React from 'react';
import ConnectWallet from './actions/connectWallet';
import SignIn from './actions/signIn';

export default function Header() {
  return (
   <div>
    <div>
      <SignIn />
        {/* <div className='stars absolute left-3 top-[13rem]'>Whats trending in the arena
         <Image src='/stars.png' width={55} height={55} alt='stars_logo' className='relative left-3 top-[1.3rem]'/><br />
         <div className='relative top-0'>Link your frens</div> */}
         </div>

    <div className='p-2'>Sections
    <Separator className='my-4'/>
    <div className='flex justify-center h-5 items-center space-x-6 text-sm'>
          <div>Section 1</div>
          <Separator orientation='vertical'  />
          <div>Section 2</div>
          <Separator orientation='vertical'/>
          <div>Section 3</div>




    </div>
          
    </div>
    
    <div className='absolute right-3 top-0'>
        
       <ConnectWallet />
    </div>
    </div>
    
  )
}
