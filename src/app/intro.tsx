import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Intro() {
  return (
    <div className='p-8 flex flex-col'>
        <Image src="/favicon.ico" width={55} height={55} alt="logo for addicted inc"/>
        <header className='text-[2.22rem] p-6 font-extrabold pl-8'>1 click token creation</header>
        <span className='font-semibold text-[1.5rem]'>ERC721 ERC20 ERC1155 & 🔓ERC404</span>
        <span className='text-[1.5rem] text-[#bf7272] p-3'>Learn how to manage your token</span>
        <span className='text-lg text-pretty text-[#d9d6d6] p-12'>Add a website <span className='text-[#3a43eb]'>click</span> here.</span>
        <div className='flex flex-col p-6'>Don't trust &rarr; verify. Trusted avax links and resources
        <Link href="https://snowscan.xyz/" className='text-[#0b77be] p-6'>snowscan</Link>
        <Link href="https://debank.com/" className='text-[#0b77be] p-6'>debank</Link>
        </div>
    </div>
  )
}

export default Intro