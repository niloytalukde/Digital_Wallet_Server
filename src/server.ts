import mongoose from "mongoose"
import dotenv from "dotenv"
import app from "./app"
import { seedAdmin } from "./utils/seedSuperAdmin"

dotenv.config()

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB Connected")
    app.listen(process.env.PORT || 5000, () => {
      console.log(`SERVER RUNNING ON ${process.env.PORT }`)
    })
    seedAdmin();
  })
