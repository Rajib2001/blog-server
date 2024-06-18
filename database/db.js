import mongoose  from "mongoose"


const Connection=async(URL)=>{

    try {
        await mongoose.connect(URL,{useNewUrlParser:true})
        console.log('DATABASE Connected Successfully')
        
    } catch (error) {
        console.log('ERROR while connecting with the database',error)

        
    }

}

export default Connection;




