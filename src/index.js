import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import cors from 'cors';
import pinsRouter from './routes/pinsRouter.js';
import userRouter from './routes/userRouter.js';

const app = new express();
app.use(cors({ origin: [ "http://localhost:3000" ] }));
app.use(express.json())

app.use('/api/pins/', pinsRouter);
app.use('/api/users/', userRouter);

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB Connected!")
    app.listen(process.env.PORT, () => { 
        console.log( `The server is listening at port ${process.env.PORT}...`)
    })
})
.catch(err => console.log(err));

