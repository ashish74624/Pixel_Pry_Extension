"use client"
import React, { useEffect,useState } from 'react'
import { Navbar } from '@/components/Navbar';
import {IconBookUpload} from '@tabler/icons-react'
import { DirectionAwareHover } from '@/components/ui/direction-aware-hover';
import DeleteButton from '@/components/DeleteButton';
import { Suspense } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import DropZone from '@/components/DropZone';
import ImageSkel from '@/components/ImageSkel';

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


 const FolderPage=({params}:{params: {email:string;folderName:string;}}) =>{
  const [images,setImages] = useState<ImageInfo[]>([]);
  const [loading,setLoading] = useState(true);
  
  useEffect(()=>{
    const getFolderData = async ()=>{
        const res = await fetch(`${backend}/getFolderData/${params.email}/${params.folderName}`,{cache:'no-store'});
        const data = await res.json();
        setImages(data);
        setLoading(false);
      }
    getFolderData();
  },[loading])

    
  

  // const images:ImageInfo[] = await getFolderData(params.email,params.folderName);

  return (

    <main className='text-white'>
      <Navbar/>
      <section className='w-[80vw] mx-auto mt-6'>
        <div className='flex w-full justify-between'>
          <h1 className='text-4xl'>{params.folderName}</h1>
          <Drawer>
            <DrawerTrigger className='bg-purple-700 px-6 text-sm gap-3 rounded-full flex items-center'>New <IconBookUpload size={20} stroke={1}/> </DrawerTrigger>
            <DrawerContent className='dark'>
              <DropZone folderName={params.folderName as string} email={params.email as string} loading={loading} setLoading={setLoading} />
            </DrawerContent>
          </Drawer>

        </div>
        {/*  */}
        {
          loading
          ?
          <ImageSkel/>
          :
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
        }
        
      </section>
    </main>
  )
}

export default FolderPage;