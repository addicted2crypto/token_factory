import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import React from 'react'

export default function SignIn() {
  return (
   <div className='pt-3'>
    <Button className= 'text-[#6b2a2a]'variant="outline">
        Sign in
        {/* hidden for users until logged in then reverse  */}
    <div className=' hidden text-sm leading-none text-muted-foreground'>Sign out</div>
    </Button>
    <Separator className='my-4'/>
    </div>
//    else add logged in auth user then button
  
  )
}
