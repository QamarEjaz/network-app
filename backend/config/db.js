const mongoose=require('mongoose')
const config=require('config')
const URI=config.get('mongooseURL')

const connectDB=async()=>{
     try {
        await mongoose.connect(URI)
        console.log("mondb connected")
     } catch (error) {
        console.log(error.message)
        process.exit(1)
     }
}
module.exports=connectDB