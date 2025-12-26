import mongoose from "mongoose";
import AppError from "../../errorHelper/errorHelper";
import { Wallet } from "../Wallet/wallet.model";
import { Transaction } from "../Transaction/transaction.model";


interface ISendMoneyPayload {
  amount: number;
 addUserWallet:string
}

export const addMoneyToUser = async (
  payload: ISendMoneyPayload,
  fromUserId: string
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, addUserWallet,  } = payload;

    if (!amount || amount <= 0) {
      throw new AppError(400, "Amount must be greater than 0");
    }

    
    if (!addUserWallet) {
      throw new AppError(400, "Receiver phone or email is required");
    }

    
    const fromWallet = await Wallet.findOne({ owner: fromUserId }).session(
      session
    );

    if (!fromWallet) {
      throw new AppError(404, "Sender wallet not found");
    }

    if (fromWallet.status === "blocked") {
      throw new AppError(403, "Sender wallet is blocked");
    }

    if (fromWallet.balance < amount) {
      throw new AppError(400, "Insufficient balance");
    }

   
    const orConditions: any[] = [];

    if (addUserWallet) {
      orConditions.push({ ownerPhone: addUserWallet });
    }

    if (addUserWallet ) {
      orConditions.push({ ownerEmail: addUserWallet });
    }

    if (orConditions.length === 0) {
      throw new AppError(400, "Receiver phone or email is required");
    }
    const toWallet = await Wallet.findOne({
      $or: orConditions,
    }).session(session);

    if (!toWallet) {
      throw new AppError(404, "Receiver wallet not found");
    }

    if (toWallet.status === "blocked") {
      throw new AppError(403, "Receiver wallet is blocked");
    }

    
    if (fromWallet._id.toString() === toWallet._id.toString()) {
      throw new AppError(400, "Cannot send money to your own wallet");
    }

    
    fromWallet.balance -= amount;
    toWallet.balance += amount;

    await fromWallet.save({ session });
    await toWallet.save({ session });

   
    await Transaction.create(
      [
        {
          from: fromWallet._id,
          to: toWallet._id,
          amount,
          type: "cash-in",
          status: "completed",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      message: "Money sent successfully",
      data: {
        fromBalance: fromWallet.balance,
        toBalance: toWallet.balance,
      },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const cashOutFromUser = async (
  payload: ISendMoneyPayload,
  fromUserId: string // agent userId
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, addUserWallet } = payload;

    if (!amount || amount <= 0) {
      throw new AppError(400, "Amount must be greater than 0");
    }


    if (!addUserWallet) {
      throw new AppError(400, "User phone or email is required");
    }

    const agentWallet = await Wallet.findOne({
      owner: fromUserId,
      status: "active",
    }).session(session);

    if (!agentWallet) {
      throw new AppError(404, "Agent wallet not found or blocked");
    }

   
    let userWallet;

    if (addUserWallet.includes("@")) {
      userWallet = await Wallet.findOne({
        ownerEmail: addUserWallet,
        status: "active",
      }).session(session);
    } else {
      userWallet = await Wallet.findOne({
        ownerPhone: addUserWallet,
        status: "active",
      }).session(session);
    }

    if (!userWallet) {
      throw new AppError(404, "User wallet not found or blocked");
    }

  
    if (agentWallet._id.toString() === userWallet._id.toString()) {
      throw new AppError(400, "Cannot cash out to same wallet");
    }


    if (userWallet.balance < amount) {
      throw new AppError(400, "Insufficient user balance");
    }


    userWallet.balance -= amount;
    agentWallet.balance += amount;

    await userWallet.save({ session });
    await agentWallet.save({ session });

    await Transaction.create(
      [
        {
          from: userWallet._id,
          to: agentWallet._id,
          amount,
          type: "cash-out",
          status: "completed",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      message: "Cash out successful",
      data: {
        userBalance: userWallet.balance,
        agentBalance: agentWallet.balance,
      },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

