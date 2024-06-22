import { Vote, ListChecks, Handshake, GlobeLock, Cctv } from 'lucide-react'
import React from 'react'

export default function Highlightedvotedtips() {
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
    <div className='text-3xl p-6 text-slate-950'>➡️ Top voted submissions. Dynamic community chosen tips ⬅️</div>
    <div className='text-lg pb-3'>
      <ol>
        <li>
          <span className='text-[#d4d2d2] absolute left-[18rem]'>1</span>EXAMPLE... dont listen to shillers
        </li>
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
