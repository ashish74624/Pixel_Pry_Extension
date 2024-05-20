'use client'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

const backend = process.env.BACKEND;

const deleteImage =async (id:string) => {
    const res = await fetch(`${backend}/deleteImage/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    });
    const data = await res.json();
    if(res.ok){
      toast.success(data.msg);
      setTimeout(()=>{
        window.location.reload();
      },1000)
    }
  }

interface Props {
    id:string;
}  

export default function DeleteButton({id}:Props) {
  return (
    <button className=' text-red-500 hover:underline' onClick={()=>{deleteImage(id)}}>
        Delete
    </button>
  )
}
