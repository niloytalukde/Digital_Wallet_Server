import mongoose, { Types } from "mongoose";
import AppError from "../../errorHelper/errorHelper";
import { Wallet } from "./wallet.model";
import { Transaction } from "../Transaction/transaction.model";
import {
  TransactionType,
  TransactionStatus,
  ITransaction,
} from "../Transaction/transaction.interface";

const getMyWallet = async (userId: string) => {
  console.log(userId);
  try {
    const wallet = await Wallet.findOne({ owner: userId });
    if (!wallet) throw new AppError(404, "Wallet not found");

    return wallet;
  } catch (err: any) {
    console.log(err);
  }
};

// const depositMoney = async (userId: string, amount: number) => {
//   console.log(userId, amount);
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     if (!amount || amount <= 0) {
//       throw new AppError(400, "Amount must be a positive number");
//     }

//     if (!userId) throw new AppError(401, "Unauthorized");

//     const wallet = await Wallet.findOne({ owner: userId }).session(session);

//     if (!wallet || wallet.status === "blocked") {
//       throw new AppError(400, "Wallet not found or blocked");
//     }

//     // Update balance
//     wallet.balance += Number(amount);
//     await wallet.save({ session });

//     // Create transaction
//     const transactionData: ITransaction = {
//       from: wallet._id,
//       to: wallet._id,
//       amount: Number(amount),
//       type: TransactionType.ADD,
//       status: TransactionStatus.COMPLETED,
//     };

//     await Transaction.create([transactionData], { session });

//     await session.commitTransaction();
//     session.endSession();
//     return wallet.balance;
//   } catch (err: any) {
//     await session.abortTransaction();
//     session.endSession();
//     console.log(err);
//   }
// };

export const withdrawMoney = async (
  fromUserId: string,
  amount: number,
  to: string
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // amount validation
    const amountNum = Number(amount);
    if (!amountNum || amountNum <= 0) {
      throw new Error("Amount must be greater than 0");
    }

    // Sender wallet
    const fromWallet = await Wallet.findOne({
      owner: fromUserId,
      status: "active",
    }).session(session);

    if (!fromWallet) {
      throw new Error("Sender wallet not found or blocked");
    }

    // Receiver wallet (email / phone detect)
    let toWallet;

    if (to.includes("@")) {
      toWallet = await Wallet.findOne({
        ownerEmail: to,
        status: "active",
      }).session(session);
    } else {
      toWallet = await Wallet.findOne({
        ownerPhone: to,
        status: "active",
      }).session(session);
    }

    if (!toWallet) {
      throw new Error("Receiver wallet not found or blocked");
    }

    // Same wallet check
    if (fromWallet._id.toString() === toWallet._id.toString()) {
      throw new Error("Sender and receiver wallet cannot be the same");
    }

    // Balance check
    if (fromWallet.balance < amountNum) {
      throw new Error("Insufficient balance");
    }

    // Transfer
    fromWallet.balance -= amountNum;
    toWallet.balance += amountNum;

    await fromWallet.save({ session });
    await toWallet.save({ session });

    // Transaction record
    await Transaction.create(
      [
        {
          from: fromWallet._id,
          to: toWallet._id,
          amount: amountNum,
          type: "withdraw",
          status: "completed",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      message: "Money transferred successfully",
      balance: fromWallet.balance,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};


const sendMoney = async (
  payload: { to: string; amount: number },
  userId: string
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { to, amount } = payload;
    
    const amountNum = Number(amount);
    if (!amountNum || amountNum <= 0) {
      throw new AppError(400, "Amount must be greater than 0");
    }

// Sender wallet
    const fromWallet = await Wallet.findOne({ owner: userId }).session(session);
    if (!fromWallet || fromWallet.status === "blocked") {
      throw new AppError(400, "Sender wallet not found or blocked");
    }

    if (fromWallet.balance < amountNum) {
      throw new AppError(400, "Insufficient balance");
    }

   // Receiver wallet
const orConditions: any[] = [];

if (!to) {
  throw new Error("Receiver identifier is required");
}


const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to);

if (isEmail) {
  orConditions.push({ ownerEmail: to });
} else {
  orConditions.push({ ownerNumber: to });
}

    const toWallet = await Wallet.findOne({
      $or: orConditions,
    }).session(session);

    if (!toWallet || toWallet.status === "blocked") {
      throw new AppError(400, "Receiver wallet not found or blocked");
    }

    if (fromWallet._id.toString() === toWallet._id.toString()) {
      throw new AppError(400, "You cannot send money to yourself");
    }

    fromWallet.balance -= amountNum;
    toWallet.balance += amountNum;

    await fromWallet.save({ session });
    await toWallet.save({ session });

  
    await Transaction.create(
      [
        {
          from: fromWallet._id,
          to: toWallet._id,
          amount: amountNum,
          type: "send",
          status: "completed",
        },
      ],
      { session }
    );

    
    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      fromBalance: fromWallet.balance,
      toBalance: toWallet.balance,
    };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};




export const walletService = {
  depositMoney,
  getMyWallet,
  withdrawMoney,
  sendMoney,
};
