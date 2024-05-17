'use client'
import React from 'react'
import LoginForm from '@/components/LoginForm';
import { Vortex } from '@/components/ui/vortex';


export default function Login() {

  return (
    <Vortex backgroundColor="black" rangeY={800} particleCount={100} className="flex items-center flex-col justify-center px-2 md:px-10  py-4 dark h-screen w-screen ">
      <main className='dark h-screen w-screen grid place-content-center overflow-hidden'>
        <LoginForm/>
      </main>
    </Vortex>
  )
}
