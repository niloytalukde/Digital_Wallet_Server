import  { model, Schema} from "mongoose";
import { IWallet } from "./wallet.interface";

export enum WalletStatus{
  ACTIVE="active",
  BLOCKED="blocked"
}

const WalletSchema: Schema<IWallet> = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, default: 50 },
  ownerEmail: { type: String, required: true },
  ownerNumber: { type: String, required: true },
  ownerName: { type: String },
  status: { type: String, enum: Object.values(WalletStatus), default: "active" },
}, { timestamps: true });

export const Wallet= model<IWallet>("Wallet", WalletSchema);
