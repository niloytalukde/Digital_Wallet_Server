
import AppError from "../../errorHelper/errorHelper";
import { Wallet } from "../Wallet/wallet.model";
import { Transaction } from "./transaction.model";
export const getTransactionsByUserId = async (userId: string) => {
 
  const wallet = await Wallet.findOne({ owner: userId });

  if (!wallet) {
    throw new AppError(404, "Wallet not found");
  }
  const transactions = await Transaction.find({
    $or: [{ from: wallet._id }, { to: wallet._id }],
  })
    .populate("from to")
    .sort({ createdAt: -1 });

  return transactions;
};
interface GetAllTransactionsParams {
  searchText?: string;      
  type?: string;            
  status?: string;          
  minAmount?: number;
  maxAmount?: number;
  page?: number;            
  limit?: number;           
  sortBy?: string;          
  sortOrder?: "asc" | "desc";
}

// export const getAllTransactions = async (params: GetAllTransactionsParams) => {
//   const {
//     searchText,
//     type,
//     status,
//     minAmount,
//     maxAmount,
//     page = 1,
//     limit = 10,
//     sortBy = "createdAt",
//     sortOrder = "desc",
//   } = params;

//   const filter: any = {};

//   if (type) {
//     filter.type = type;
//   }


//   if (status) {
//     filter.status = status;
//   }


//   if (minAmount !== undefined || maxAmount !== undefined) {
//     filter.amount = {};
//     if (minAmount !== undefined) filter.amount.$gte = minAmount;
//     if (maxAmount !== undefined) filter.amount.$lte = maxAmount;
//   }

  
//   if (searchText) {
//     filter.$or = [
//       { "userEmail": { $regex: searchText, $options: "i" } },
//       { "userPhone": { $regex: searchText } },
//       { "wallet": searchText }, // wallet id exact match
//     ];
//   }

//   // Pagination and Sorting
//   const skip = (page - 1) * limit;
//   const sortOption: any = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

//   const [transactions, total] = await Promise.all([
//     Transaction.find(filter)
//       .sort(sortOption)
//       .skip(skip)
//       .limit(limit)
//       .populate("user", "name email phone") 
//       .populate("wallet"),                  
//     Transaction.countDocuments(filter),
//   ]);

//   return {
//     data: transactions,
//     total,
//     page,
//     limit,
//     totalPages: Math.ceil(total / limit),
//   };
// };


type PaginationParams = {
  page?: number;
  limit?: number;
};

export const getAllTransactions = async ({
  page = 1,
  limit = 10,
}: PaginationParams) => {
  const skip = (page - 1) * limit;

  const [transactions, total] = await Promise.all([
    Transaction.find()
      .populate("from to")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Transaction.countDocuments(),
  ]);

  return {
    data: transactions,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};





export const TransactionService = {
  getTransactionsByUserId,
    getAllTransactions
};