import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import colors from "colors"

const connectDB = async () => {
      try {
           const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
           console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`.bgMagenta.white)
      } catch (error) {
            console.log(`MongoDB connection error ${error}`.bgRed.white);
            process.exit(1)
      }
}

export default connectDB