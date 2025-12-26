import { Request, Response, NextFunction } from "express";
import { addMoneyToUser, cashOutFromUser } from "./agent.services";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const addMoneyToUserAsAgent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const fromUserId = req.user.userId;
    const payload = req.body;
    const result = await addMoneyToUser(payload, fromUserId);

    sendResponse(res, {
      success: true,
      message: "Money Added  successfully",
      statusCode: 200,
      data: result,
    });
  }
);
export const cashOutFromUserAsAgent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const fromUserId = req.user.userId;
    const payload = req.body;
    const result = await cashOutFromUser(payload, fromUserId);

    sendResponse(res, {
      success: true,
      message: "Money Added  successfully",
      statusCode: 200,
      data: result,
    });
  }
);
