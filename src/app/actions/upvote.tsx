"use client"

import { UNSTABLE_REVALIDATE_RENAME_ERROR } from 'next/dist/lib/constants';
import React, { useEffect, useState } from 'react'
import { LiaThumbsUp, LiaThumbsDown} from "react-icons/lia";

// upvote will ++ count and downvote will -- 
// the whole vote section will check which state has the most upvotes to store it at the top
//use state to manage top 25 stories
export default function Upvote() {
  const [upVote, downvote] =  useState(false);
  const[count, setCount] = useState(0);
  const [votes, setVotes] = useState(0);
  
  //add test for auth and sign ins
  const handleSignin = (e: any) => {
    if(e)console.log(0)

    }
  useEffect(() => {
    document.title = `This input has ${count} votes`;
  });

  return (
    <div>
      <div>Login
        <form method='POST' onSubmit={handleSignin}></form>
      </div>
      
    <button
       onClick={() => downvote((previous) => !previous)}
       className="p-2 rounded-md bg-[#555908]"
        ></button>
          <div>
            <p className='p-1 text-pretty text-sm text-[#397427]'>Has {count} votes</p>
          <button 
              onClick={() => setCount(count +1)}><LiaThumbsUp className='hover:text-lg transition hover:-translate-y-1 hover:-translate-x-1'/></button>
             
          <button 
              onClick={() => setCount(count -1)}><LiaThumbsDown className='hover:text-2xl transition hover:translate-y-1 hover:translate-x-1 '/></button>
              </div>
           {upVote ? <LiaThumbsUp />: <LiaThumbsDown />}
           </div>

   
  );
}
