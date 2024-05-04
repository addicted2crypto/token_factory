"use client"

import React, { useState } from 'react'
import { LiaThumbsUp, LiaThumbsDown} from "react-icons/lia";

// upvote will ++ count and downvote will -- 
// the whole vote section will check which state has the most upvotes to store it at the top
//use state to manage top 25 stories
export default function Upvote() {
  const [upVote, downvote] =  useState(false);
  const [storedVotes] = useState(0);
  return (
    <button
        onClick={() => downvote((previous) => !previous)}
        className="p-2 rounded-md bg-[#0e3701]"
        >
          
          {upVote ? <LiaThumbsUp/>: <LiaThumbsDown />}
          </button>
   
  );
}
