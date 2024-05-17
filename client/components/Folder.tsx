import { useEffect, useState } from "react"
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';
  
interface tokenType {
  _id:string;
  email:string;
  firstName:string;
  lastName:string;
  iat:number
}

interface FolderProps {
  userData :tokenType 
}

interface FolderList  {
        folderName: string;
        _id: string;
    }

// interface FolderInfo {
//     _id: string;
//     folders: FolderList[];
//     __v: number;
// }

const backend = process.env.BACKEND;

export default  function Folder({userData}:FolderProps) {
    const [folders,setFolders] = useState<FolderList[]>([]);
    const [folderName, setFolderName] = useState('');
    // console.log(userData)
    const createFolder=async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
    //   toast.loading("Creating Folder...");
      try{
        const res = await fetch(`${backend}/api/doc/${userData?.email}/addFolder/`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body : JSON.stringify({
              folderName:folderName
            })
          });
          const data = await res.json();
          if(res.ok){
            // toast.dismiss();
            setTimeout(()=>{
                toast.success(data.msg);
                window.location.reload()
            },100)
          }
          else{
            // toast.dismiss();
            setTimeout(()=>{
                toast.error(data.msg);
            },100)
          }
      }catch{
        // toast.dismiss();
            setTimeout(()=>{
                toast.error("Folder Not Created - Server Down");
            },100)
      }
    }

    const deleteFolder=async(email:string,id:string,folderName:string)=>{
        try{
            const res = await fetch(`${backend}/api/doc/deleteFolder`,{
                method:"DELETE",
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email:email,
                    id:id,
                    folderName:folderName
                })
            });
            if(res.ok){
                toast.dismiss();
                setTimeout(()=>{
                    toast.success('Deleted Successfully');
                    window.location.reload();
                },100)
            }else{
                toast.dismiss();
                setTimeout(()=>{
                    toast.error(`Error in deleting`); 
                    },50)
                }
        }catch{
            toast.dismiss();
                setTimeout(()=>{
                    toast.error(`Error in deleting`); 
                    },50)
        }
    }

    useEffect(()=>{
        console.log(userData);
        const getFolders =async () => {
            if(userData?.email){

                const res = await fetch(`${backend}/${userData?.email}/getFolders`);
                const data:{ folderList: FolderList[] } = await res.json();
                setFolders(data.folderList)
            }
        }
        getFolders();
    },[userData])
    // console.log(folders);
  return (
  <div className=" w-[90vw] md:w-[80vw] xl:w-[50vw] py-4 px-2 border rounded-lg shadow sm:p-8 bg-zinc-900 border-gray-700 h-max mt-10 mx-auto ">
    <div className="flex items-center justify-between mb-4 mx-auto w-max ">
        <h5 className="text-2xl font-bold leading-none text-white">Your Folders</h5>
        
   </div>
   <div className="">
        <div role="list" className="grid grid-cols-3 gap-4">
            {
            folders
            ?
            folders.map((folder:FolderList )=>(
                <div key={folder._id} className="flex items-center space-x-4 justify-between w-full ">
                    <Link className=" flex w-full space-x-4 hover:bg-gray-700 bg-none sm:py-4 px-2 rounded-lg" href={`/folder/${userData?.email}/${folder?.folderName}`}>
                        <span className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 via-violet-800 to-blue-500 px-4"></span>
                        <p className="text-lg w-full font-medium text-white">
                            {folder?.folderName}
                        </p>
                    </Link>
                    
                </div>
            ))
            :
            <li className="flex items-center space-x-4 justify-between w-full ">
                You have not created any folders yet
            </li>
        }
        </div>
   </div>
   <Toaster/>
</div>
  )
}
