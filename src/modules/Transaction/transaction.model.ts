
import { Schema,model,  } from "mongoose";
import { ITransaction, TransactionType, TransactionStatus } from "./transaction.interface";

const TransactionSchema: Schema<ITransaction> = new Schema(
  {
   from: { type: Schema.Types.ObjectId, ref: "Wallet", required: true },
    to: { type: Schema.Types.ObjectId, ref: "Wallet", required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: Object.values(TransactionType), required: true },
    status: { type: String, enum: Object.values(TransactionStatus), default: TransactionStatus.COMPLETED },
    fee: { type: Number, default: 0 },
    commission: { type: Number, default: 0 },

  },
  { timestamps: true }
);

export const Transaction = model<ITransaction>("Transaction", TransactionSchema);
