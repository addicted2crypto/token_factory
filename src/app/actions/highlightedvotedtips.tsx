import { Vote, ListChecks, Handshake, GlobeLock } from 'lucide-react'
import React from 'react'

export default function Highlightedvotedtips() {
  return (
    <div className='flex-col'>
      <div className='flex justify-center gap-2'>
        <ListChecks />
      <Vote className='items-center'/>
      <Vote className='items-center'/>
      <Vote className='items-center'/>
      <Vote className='items-center'/>
      <Vote className='items-center'/>
      <ListChecks />
      </div>
    <div className='text-3xl'>This weeks top voted submissions. Top 10 community voted tips</div>
    <div className='flex justify-center gap-3'>
    <GlobeLock /> <Handshake />
    </div>
    </div>
  )
}
