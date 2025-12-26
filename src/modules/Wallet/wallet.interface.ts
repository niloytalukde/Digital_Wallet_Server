import  { Schema, Types, } from "mongoose";

export interface IWallet  {
  owner:Types.ObjectId;
  ownerEmail: string;
  ownerNumber: string;
  ownerName?: string;
  balance: number;
  status: "active" | "blocked";
  _id?:Schema.Types.ObjectId
}