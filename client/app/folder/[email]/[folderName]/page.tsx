import React from 'react'
import { Navbar } from '@/components/Navbar';
import {IconBookUpload} from '@tabler/icons-react'
import Image from 'next/image';
import { DirectionAwareHover } from '@/components/ui/direction-aware-hover';
import DeleteButton from '@/components/DeleteButton';

interface ImageInfo {
    _id: string;
    email: string;
    folderName: string;
    imageName: string;
    imageCloud: {
        _id:string;
        versionName: string;
        generatedName: string;
    };
    __v: number;
}

const backend = process.env.BACKEND;
const cloudName = process.env.CLOUD_NAME;

const getFolderData = async (email:string,folderName:string)=>{
      const res = await fetch(`${backend}/getFolderData/${email}/${folderName}`);
      return res.json();
      // return data;
    }

export default async function folderPage({params}:{
    params:{
        email:string;
        folderName:string;
    }
}) {

  const images:ImageInfo[] = await getFolderData(params.email,params.folderName);

  return (
    <main className='text-white'>
      <Navbar/>
      <section className='w-[80vw] mx-auto mt-6'>
        <div className='flex w-full justify-between'>
          <h1 className='text-4xl'>{params.folderName}</h1>
          <button className='bg-purple-700 px-6 text-sm gap-3 rounded-full flex items-center'>
            New <IconBookUpload size={20} stroke={1}/> 
          </button>
        </div>
        {/*  */}
        <div className={`w-max grid ${images.length >0 ? 'lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ':'grid-cols-1'} gap-8 mx-auto mt-6`}>
          {
            images.length >0
            ?
            images.map((data:ImageInfo)=>(
              <DirectionAwareHover key={data._id} imageUrl={`https://res.cloudinary.com/${cloudName}/image/upload/v${data.imageCloud.versionName}/${data.imageCloud.generatedName}`}>
                <p className="font-bold text-xl">{data.imageName}</p>
                <DeleteButton id={data._id}/>
              </DirectionAwareHover>
            ))
            :
            <div className='w-full h-max flex justify-center items-center mx-auto'>
              No Images available yet
            </div>
          }
        </div>
      </section>
    </main>
  )
}
