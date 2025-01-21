import mongoose from "mongoose";
//check existing connection, else make a new connection
export function mongooseConnect() {
    const uri = process.env.MONGODB_URI;
    //readyState 1 means connected and 0 means no connection
   if ( mongoose.connection.readyState ===1){
    return mongoose.connection.asPromise();

   }else{
    const uri = process.env.MONGODB_URI;
    return mongoose.connect(uri);
   }
}