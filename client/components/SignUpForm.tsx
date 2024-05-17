'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {z} from 'zod'
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { BackgroundGradient } from './ui/background-gradient';
import Label from './Label';

const backend = process.env.BACKEND;

const schema = z.object({
  firstName:z.string(),
  lastName:z.string(),
  email:z.string().email(),
  password: z.string()
});

type FormField = z.infer<typeof schema>

export default function SignUpForm() {

  const router = useRouter()
    const { register , handleSubmit , setError ,formState:{errors,isSubmitting}} = useForm<FormField>(
    {
      resolver:zodResolver(schema)
    });
    const onSubmit:SubmitHandler<FormField>=async(data)=>{
    try{
      const res = await fetch(`${backend}/api/users/register`,{
        method:"POST",
        headers:{
          'Content-type':"application/json"
        },
        body:JSON.stringify(data)
      });
      const output = await res.json();
      if(!res.ok){
        setError('root',{
        message:'Bad request'
      })
      }else{
        router.push('/home')
      }
    }catch(err:any){
      setError('root',{
        message:err
      })
    }
  }

  return (
    <div className='w-80 lg:w-96'>
    <BackgroundGradient className="rounded-[22px]   bg-zinc-900">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-max pb-6 shadow-lg rounded-lg flex flex-col ">
          <h2 className=" font-GraphikBlack font-medium text-3xl mt-6 mb-4 mx-auto">Sign Up</h2>
          <div className="grid w-[80%] mx-auto md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-3 md:mb-6 group">
                  <input {...register('firstName')} type="text" name="firstName" id="firstName" className="input-class peer" placeholder=" " required />
                  <Label htmlFor='firstName' text='First Name' />
              </div>
              <div className="relative z-0 w-full mb-3 md:mb-6 group">
                  <input {...register('lastName')} type="text" name="lastName" id="lastName" className="input-class peer" placeholder=" " required />
                  <Label htmlFor='lastName' text='Last Name' />
              </div>
            </div>
          <div className="input-container group">
            <input {...register('email')} type="text" name="email" className="input-class peer" placeholder=" "  />
            <Label htmlFor='email' text='Email'/>
          </div>
          <div className="input-container group">
            <input {...register("password")} type="password" name="password" id="password" className="input-class peer" placeholder=" "  />
            <Label htmlFor='password' text='Password'/>
          </div>
          {/* <p className=" text-sm font-semibold font-GraphikBlack text-[#0FADFF]">Forgot password ?</p> */}
          <button disabled={isSubmitting} className="bg-[#0FADFF] mt-2 mx-16 text-white rounded-full py-2 font-GraphikBlack">{isSubmitting ?'Loading...':"Submit"}</button>
          <p className=" text-sm font-meduim font-GraphikBlack text-white mt-2 w-max mx-auto">Already have an account ? <Link href={'/login'}><span className="text-[#0FADFF]">Login</span></Link>  </p>
          {errors.root && <div className="text-red-500 font-GraphikBlack mx-auto text-sm ">{errors.root?.message}</div> }
          {errors.email && <div className="text-red-500 font-GraphikBlack mx-auto text-sm ">{errors.email?.message}</div> }
          {errors.password && <div className="text-red-500 font-GraphikBlack mx-auto text-sm ">{errors.password?.message}</div> }
        </form>
    </BackgroundGradient>
      
      </div>
  )
}
