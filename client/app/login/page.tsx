'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {z} from 'zod'
import Link from "next/link";
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/LoginForm';
import { Vortex } from '@/components/ui/vortex';
const backend = process.env.BACKEND;

const schema = z.object({
  Staff_Email:z.string().email(),
  password: z.string()
});

type FormField = z.infer<typeof schema>

export default function Login() {
    const router = useRouter()
  const { register , handleSubmit , setError ,formState:{errors,isSubmitting}} = useForm<FormField>(
    {
      resolver:zodResolver(schema)
    });
    const onSubmit:SubmitHandler<FormField>=async(data)=>{
    try{
      const res = await fetch(`${backend}/staff/login`,{
        method:"POST",
        headers:{
          'Content-type':"application/json"
        },
        body:JSON.stringify(data)
      });
      const output = await res.json();
      if(!output.done){
        throw output.msg
      }else{
        router.push('/menu')
      }
    }catch(err:any){
      setError('root',{
        message:err
      })
    }
  }

  return (
    <Vortex backgroundColor="black" rangeY={800} particleCount={100} className="flex items-center flex-col justify-center px-2 md:px-10  py-4 dark h-screen w-screen ">
      <main className='dark h-screen w-screen grid place-content-center overflow-hidden'>
        <LoginForm/>
      </main>
    </Vortex>
  )
}
