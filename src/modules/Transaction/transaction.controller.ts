import { Request, Response } from "express";
import { TransactionService } from "./transaction.services";


export const getMyTransactions = async (req:Request, res:Response) => {
  try {
    const userId = req.user.userId;        
    const transactions = await TransactionService.getTransactionsByUserId(userId);
    res.status(200).json({ success: true, data: transactions });
  } catch (error : any) {
    res.status(500).json({ success: false, message: error.message });
  }         
};

export const getAllTransactions = async (req:Request, res:Response) => {        
    try {
      const transactions = await TransactionService.getAllTransactions(req.query);
        res.status(200).json({ success: true, data: transactions });
    } catch (error : any) {
        res.status(500).json({ success: false, message: error.message });
    }       
};


