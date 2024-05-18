"use client"


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
     
      <button
       onClick={() => downvote((upVote) => !upVote)}
       className="p-2 rounded-md bg-[#c1c94bb6]"
        > Log in to upvote posts you enjoy. Downvote the posts you dislike</button>
    
          <div>
            {/* add logged in user compoment here */}
            <p className='p-1 text-pretty text-sm text-[#30cd00]'>Highlighted tip/story <span className='text-lg text-[#d2d53e]'>{count}</span> vote count</p>
          <button 
              onClick={() => setCount(count +1)}><LiaThumbsUp className='text-3xl hover:text-4xl transition hover:-translate-y-2 hover:-translate-x-2 hover:text-[#fff]'/></button>
             
          <button 
              onClick={() => setCount(count -1)}><LiaThumbsDown className='text-3xl hover:text-4xl transition hover:translate-y-2 hover:translate-x-2 hover:text-[#fff]'/></button>
              </div>
           {upVote ? <LiaThumbsUp />: <LiaThumbsDown />}
           </div>

   
  );
}
