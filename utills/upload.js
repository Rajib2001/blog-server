import multer from "multer"
import {GridFsStorage} from "multer-gridfs-storage"
import dotenv from "dotenv"

dotenv.config();

const username=process.env.DB_USERNAME
const password=process.env.PASSWORD


const storage=new GridFsStorage({
    url:`mongodb+srv://riyaloverabi2414:riya2414@cluster0.ozniqmf.mongodb.net/test`,
    options:{useNewUrlParser:true},
    file:(request,file)=>{
        const match=["image/png","image/jpg"]
        if(match.indexOf(file.memeType)===-1){
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName:"photos",
            filename:`${Date.now()}-blog-${file.originalname}`,
        }




    }

     
})

export default multer({storage});