import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import pinsRouter from './routes/pinsRouter.js';
import userRouter from './routes/userRouter.js';

const app = new express();



mongoose.connect(process.env.MONGO_URL)
    .then(() => {
    console.log("MongoDB Connected!")
})
    .catch(err => console.log(err));

app.use(express.json())

app.use('/api/pins/', pinsRouter);
app.use('/api/user/', userRouter);


app.listen(process.env.PORT, () => { 
   console.log( `The server is listening at port ${process.env.PORT}...`)
})

