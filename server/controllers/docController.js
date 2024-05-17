import Doc from '../models/Doc.js'
import Folder from '../models/Folder.js'
import User from '../models/user.js'
// Start with functions now

export const addFolder = async(req,res)=>{
    if(!req.body.folderName){
        console.log("No folder");
        res.status(400).json({msg:'Please add a Folder Name'});
    }
    const folderName= req.body.folderName
    try{
        const user = await User.findOne({ email: req.params.email})
        const doc = await Doc.findOne({ email: req.params.email});//Checking if doc exist or not
        if(!doc){

            const doc = new Doc({
                email:req.params.email,
                folders : [{folderName:folderName}]//If doc does not already exist we create a new doc and add folderName to if
            });
            await doc.save();
            res.status(201).json({msg:'Folder Created'});
        }else{
            //Creating Folder in the existing document
            const doc1 = await Doc.findOneAndUpdate({email:req.params.email},{
                $push:{
                    folders: {folderName:folderName} // use this method it's better
                }
            })
            // doc.folders.push({folderName:folderName})//Ye push/pop wala push h na ki push/pull wala
            await doc1.save()
            res.status(201).json({msg:'Folder Created'});
            

        } 
    }catch(e){
        res.status(500).json({msg:"Unable to create folder at the moment"})
    }
}

export const deleteFolder=async(req,res)=>{
    try{
        const doc1 = await Doc.findOne({email:req.body.email});
        if (!doc1) {
            res.status(404).json({msg:'User Not Found'});
        }
        // console.log(doc.folders)
        const doc = await Doc.findOneAndUpdate({email:req.body.email},{
            $pull :{
                folders:{_id:req.body.id}
            }
        })   
        const folder = await Folder.deleteMany({folderName:req.body.folderName})
        res.status(200).json({msg:'Deleted Successfully'})
    }catch{
        res.status(500).json({msg:'Bad Request'})
    }
}

export default {addFolder,deleteFolder};