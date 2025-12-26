
import mongoose, { Schema, Types } from "mongoose";
export enum TransactionType {
  ADD = "add",
  WITHDRAW = "withdraw",
  SEND = "send",
  CASH_IN = "cash-in",
  CASH_OUT = "cash-out",
}

export enum TransactionStatus {
  COMPLETED = "completed",
  FAILED = "failed",
}

export interface ITransaction {
  from: Schema.Types.ObjectId;
  to: Schema.Types.ObjectId;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  fee?: number;
  commission?: number;
}
