import express, { Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { indexRouter } from "./routes";
import globalErrorHandler from "./errorHelper/globalErrorHandeler";
const app = express()

app.use(
  cors({
    origin: ["http://localhost:5173", "https://digital-wallet-client-amber.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser()); 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req:Request, res:Response) => {
  res.send("Server is running");
});

app.use("/api/v1", indexRouter);
app.use(globalErrorHandler)

export default app