import grid from "gridfs-stream"
import mongoose from "mongoose"


let  gfs,gridfsBucket;
const conn=mongoose.connection;
conn.once('open',()=>{
    gridfsBucket=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs'
    });
    gfs=grid(conn.db,mongoose.mongo)
    gfs.collection("fs")

})

const url ='http://localhost:8001'
export const uploadImage=(request,response)=>{
    if(!request.file){
        return response.status(400).json({
            msg:"Rabi your File not Found"
        })
    }

    const imageUrl=`${url}/file/${request.file.filename}`
    return response.status(200).json(imageUrl)

}


export const getImage=async(request,response)=>{
    try {
        const file=await gfs.files.findOne({filename:request.params.filename})
        const readStream=gridfsBucket.openDownloadStream(file._id)
        readStream.pipe(response)

        
    } catch (error) {
        return response.status(500).json({msg:"Error while downloading image from MongoDb",error})
        
    }
}