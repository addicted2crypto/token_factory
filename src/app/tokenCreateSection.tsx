import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Intro() {
  return (
    <div className='p-8 flex flex-col'>
        <Image src="/favicon.ico" width={55} height={55} alt="logo for addicted inc"/>
        <header className='text-[2.22rem] p-6 pl-8 font-mono text-[#78ffdd] hover:animate-bounce hover:cursor-pointer '>1 click token creation</header>
        <span className='font-semibold text-[1.5rem] hover:translate-x-1 hover:translate-y-1 hover: cursor-pointer'>ERC721 ERC20 ERC1155 & 🔓ERC404</span>
        <span className='text-[1.5rem] text-[#bf7272] p-3'>Learn how to manage your tokens and contracts<br /> Support is a click away</span>
            {/* add form for website creation */}

        <span className='text-2xl text-pretty text-[#d9d6d6] p-12'><span className='text-[#3a43eb]'>Click here</span> to add a website.</span>

        <div className=' flex flex-col p-6 text-[#007bff]'>Don't trust &rarr; verify. Trusted crypto links and resources.<span className='text-[#2ba008] pt-3 text-sm'>Enter your site to be vetted/highlighted here 👉</span>
        {/* add form for data collection here with toat of website captured/upvote? */}

        <Link href="https://snowscan.xyz/" target="_blank" className='text-[#0b77be] pt-5'>snowscan</Link>
        <Link href="https://debank.com/" target="_blank" className='text-[#0b77be] p-8'>debank</Link>
        
        </div>
        </div>
    
  )
}

export default Intro