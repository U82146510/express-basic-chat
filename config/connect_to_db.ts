import mongoose from "mongoose";


export const connectDB  = async()=>{
    try {
        if(!process.env.CONNECTION_STRING){
            throw new Error('connection string is missing');
        }
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('MongoDB on');
    } catch (error) {
        console.error(error);
    }
}
const db = mongoose.connection;

db.on('error',(err)=>{
    console.error('Mongoose connection error',err);
});

db.on("disconnected",()=>{
    console.warn('Mongoose disconnected.Reconnecting...');
});

db.on("reconnected",()=>{
    console.log("Mongoose reconnected");
});

