'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {z} from 'zod'
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { BackgroundGradient } from './ui/background-gradient';

const backend = process.env.BACKEND;

const schema = z.object({
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
    <div className='w-80'>
    <BackgroundGradient className="rounded-[22px]   bg-zinc-900">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-max pb-6 shadow-lg rounded-lg flex flex-col ">
          <h2 className=" font-GraphikBlack font-medium text-3xl mt-6 mb-4 mx-auto">Login</h2>
          <div className="relative z-0 w-full group font-GraphikBlack mb-4 px-8">
            <input {...register('email')} type="text" name="Staff_Email" className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0FADFF] focus:outline-none focus:ring-0 focus:border-[#0FADFF] peer" placeholder=" "  />
            <label htmlFor="Staff_Email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0FADFF] peer-focus:dark:text-[#0FADFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
          </div>
          <div className="relative z-0 w-full mb-5 group font-GraphikBlack px-8">
            <input {...register("password")} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0FADFF] focus:outline-none focus:ring-0 focus:border-[#0FADFF] peer" placeholder=" "  />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#0FADFF] peer-focus:dark:text-[#0FADFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>

          </div>
          {/* <p className=" text-sm font-semibold font-GraphikBlack text-[#0FADFF]">Forgot password ?</p> */}
          <button disabled={isSubmitting} className="bg-[#0FADFF] mt-2 mx-16 text-white rounded-full py-2 font-GraphikBlack">{isSubmitting ?'Loading...':"Submit"}</button>
          <p className=" text-sm font-meduim font-GraphikBlack text-white mt-2 w-max mx-auto">Dont have an account yet ? <Link href={'/register'}><span className="text-[#0FADFF]">Sign up</span></Link>  </p>
          {errors.root && <div className="text-red-500 font-GraphikBlack text-sm ">{errors.root?.message}</div> }
          {errors.email && <div className="text-red-500 font-GraphikBlack text-sm ">{errors.email?.message}</div> }
          {errors.password && <div className="text-red-500 font-GraphikBlack text-sm ">{errors.password?.message}</div> }
        </form>
    </BackgroundGradient>
      
      </div>
  )
}
