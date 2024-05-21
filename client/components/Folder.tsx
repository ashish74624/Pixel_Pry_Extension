import { useEffect, useState } from "react"
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconDotsVertical } from '@tabler/icons-react'
import { IconFolder } from '@tabler/icons-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"

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
                const res = await fetch(`${backend}/${userData.email}/getFolders`);
                const data = await res.json();
                setFolders(data.folderList);
            }
        }
        getFolders();
    },[userData])
    // console.log(folders);
  return (
  <div className=" w-[90vw] md:w-[80vw] xl:w-[50vw] py-4 px-2 border rounded-lg shadow sm:p-8 bg-zinc-900 border-gray-700 h-max mt-10 mx-auto ">
    <div className="flex items-center justify-between mb-4 mx-auto w-full ">
        <h5 className="text-2xl font-bold leading-none text-white">Your Folders</h5>
        {/* <button className="bg-purple-700 px-6 text-sm gap-3 py-2 text-white rounded-full flex items-center">
            
        </button> */}
        <Dialog>
            <DialogTrigger className="bg-purple-700 px-6 text-sm gap-3 py-2 text-white rounded-full flex items-center">
                <IconFolder size={20} />
            <p>
                Add Folder
            </p>
            </DialogTrigger>
            <DialogContent className="dark">
                <DialogHeader className=" space-y-4">
                {/* <DialogTitle>Add New Folder</DialogTitle> */}
                <DialogDescription className="">
                <form onSubmit={(e)=>{createFolder(e)}} className='w-full h-max space-y-4'>
                    <div className="">
                        <label htmlFor="folder" className="block mb-2 text-lg font-medium dark:text-white text-gray-900 ">Folder Name</label>
                        <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 " onChange={(e) => {setFolderName(e.target.value)}} required/>
                    </div>
                    <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Create Folder</button>
                </form>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
   </div>
   <div className="">
        <div role="list" className="grid grid-cols-3 gap-4">
            {
            folders
            ?
            folders.map((folder:FolderList )=>(
                <Link  href={`/folder/${userData?.email}/${folder?.folderName}`} key={folder._id} className="flex items-center space-x-4 hover:bg-gray-700 justify-between w-full rounded-lg transition-all p-2  duration-300">
                    <div className=" flex w-full space-x-4  bg-none  ">
                        <span className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-600 via-violet-800 to-blue-500 "></span>
                        <p className="text-lg w-full font-medium text-white">
                            {folder?.folderName}
                        </p>
                    </div>
                    <DropdownMenu >
                    <DropdownMenuTrigger className="p-1 rounded-full">
                        <IconDotsVertical color="white" size={20}/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white text-black transition-all duration-300">
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-neutral-800 hover:text-white transition-all" >Profile</DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-neutral-800 hover:text-white transition-all">Billing</DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-neutral-800 hover:text-white transition-all">Team</DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-neutral-800 hover:text-white transition-all">Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>

                </Link>
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
