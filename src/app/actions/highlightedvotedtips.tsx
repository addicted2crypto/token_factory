import { Vote } from 'lucide-react'
import React from 'react'

export default function Highlightedvotedtips() {
  return (
    <div className='flex-col'>
      <div className='flex justify-center gap-2'>
      <Vote className='items-center'/>
      <Vote className='items-center'/>
      <Vote className='items-center'/>
      <Vote className='items-center'/>
      <Vote className='items-center'/>
      </div>
    <div className='text-3xl'>This weeks top voted submissions. Community voted tips<Vote /></div>
    </div>
  )
}
