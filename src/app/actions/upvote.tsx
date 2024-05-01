import React, { useState } from 'react'

const [upvote, downvote] =  useState(0);
// upvote will ++ count and downvote will -- 
// the whole vote section will check which state has the most upvotes to store it at the top
export default function Upvote() {
  return (
    <div className='text-md'>upvote</div>
   
  )
}
