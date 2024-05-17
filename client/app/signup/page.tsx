import React from 'react'
import SignUpForm from '@/components/SignUpForm'
import { Vortex } from '@/components/ui/vortex'

export default function Signup() {
  return (
    <Vortex backgroundColor="black" rangeY={800} particleCount={100} className="flex items-center flex-col justify-center px-2 md:px-10  py-4 dark h-screen w-screen ">
      <main className='dark h-screen w-screen grid place-content-center overflow-hidden'>
        <SignUpForm/>
      </main>
    </Vortex>
  )
}
