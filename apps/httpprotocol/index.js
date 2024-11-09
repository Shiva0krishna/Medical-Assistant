import express from 'express'
import {userRouter} from './routes/Route1.js'
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(express.json())
app.use("/api/",userRouter);

 
app.listen(PORT,()=>{
    console.log("app is runnig on port "+ PORT)
})


