const express =require ('express')
const app=express()
const connectDB=require('./config/db')
const PORT=process.env.PORT||5000
//db connection
connectDB()
app.use(express.json())
// api endpoint
app.use('/api/user',require('./routes/api/user'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/post',require('./routes/api/post'))
app.use('/api/auth',require('./routes/api/auth'))

app.listen(PORT,()=>{
    console.log(`server runnning on port ${PORT}`)
})