import  { Response, Request, NextFunction } from "express";
import { walletService } from "./wallet.services";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";

export const getMyWallet = catchAsync(async (req: Request, res: Response,next:NextFunction) => {
    const wallet = await walletService.getMyWallet(req.user?.userId);
    sendResponse(res, {
      success: true,
      message: "Wallet retrieved successfully",
      statusCode: 200,
      data: wallet,
    });
})

// export const depositMoney = catchAsync(async (req: Request, res: Response,next:NextFunction) => {
//   const userId = req.params.id;
//   const { amount } = req.body;
//     const newBalance = await walletService.depositMoney(userId, amount);
//     sendResponse(res, {
//       success: true,
//       message: "Money deposited successfully",
//       statusCode: 200,
//       data: newBalance,
//     });
  
// })

export const withdrawMoney =catchAsync( async (req: Request, res: Response,next:NextFunction) => {
  const userId = req.user?.userId;
  const { amount, to} = req.body;

  console.log(amount,to,"From WithdroController");
  
    const newBalance = await walletService.withdrawMoney(
      userId,
      amount,
      to
    );
    sendResponse(res, {
      success: true,
      message: "Money withdrawn successfully",
      statusCode: 200,
      data: newBalance,
    });


})

export const sendMoney = catchAsync(async (req: Request, res: Response,next:NextFunction) => {
  const userId = req.user?.userId;
  const result = await walletService.sendMoney(req.body, userId);
  sendResponse(res, {
    success: true,
    message: "Money sent successfully",
    statusCode: 200,
    data: result,
  });
});
