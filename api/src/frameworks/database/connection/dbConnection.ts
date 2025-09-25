import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export class conncetMongo {
  private databaseUrl: string

  constructor() {
    if (!process.env.MONGODB_URI) {
      throw new Error('mongodb url is not available')
    } else {
      this.databaseUrl = process.env.MONGODB_URI
    }
  }

  connectDB() {
    mongoose.connect(this.databaseUrl).then(() => console.log('db Connected')).catch((err) => console.log(err))
  }

}