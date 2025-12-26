import { Schema, model,} from "mongoose"
import { IUser } from "./user.interface"
export enum Role {
  USER = "user",
  AGENT = "agent",
  ADMIN = "admin",
}
export enum AgentStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum userStatus{
  ACTIVE="active",
  BLOCKED="block",
  UNBLOCKED="unblocked"
}

const userSchema = new Schema<IUser>({
  name: String,
  phone: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: Object.values(Role), default: "user" },
  isApproved: { type: String, enum: Object.values(AgentStatus), default: "pending" },
  status :{type:String,enum:Object.values(userStatus),default:"active"}
}, { timestamps: true })
export const User= model<IUser>("User", userSchema)
