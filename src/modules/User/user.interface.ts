import { ObjectId } from "mongoose"


export interface IUser {
  name: string
  phone: string
  password: string
  email:string
  role: "user" | "agent" | "admin"
  isApproved ?: boolean
  _id?:ObjectId
  status:string
}