import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.services";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId as string;
    const user = await UserService.getMe(userId);

    sendResponse(res, {
      success: true,
      message: "Money Added  successfully",
      statusCode: 200,
      data: user,
    });
  }
);
export const updateMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id as string;
    const updateData = req.body;
    await UserService.updateMyProfile(userId, updateData);

    sendResponse(res, {
      success: true,
      message: "Profile updated successfully",
      statusCode: 200,
      data: null,
    });
  }
);

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserService.getAllUsers();

    sendResponse(res, {
      success: true,
      message: "All User Retrive   successfully",
      statusCode: 200,
      data: users,
    });
  }
);

export const blockUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id as string;
    const user = await UserService.blockUser(userId,req.body);

    sendResponse(res, {
      success: true,
      message: "User blocked successfully",
      statusCode: 200,
      data: user,
    });
  }
);

export const approveAgent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id as string;
    const { agentStatus } = req.body;
    const user = await UserService.approveAgent(userId, agentStatus);

    sendResponse(res, {
      success: true,
      message: "Agent approved successfully",
      statusCode: 200,
      data: user,
    });
  }
);

export const getAllAgent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const agent = await UserService.getAllAgents()

    sendResponse(res, {
      success: true,
      message: "Agent approved successfully",
      statusCode: 200,
      data: agent,
    });
  }
);


// export const getUserByEmailORPhone = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {

//     const { email, phone } = req.body;

//     const user = UserService.getUserByEmailORPhone(email, phone, next);

//     sendResponse(res, {
//       success: true,
//       message: "User fetched successfully",
//       statusCode: 200,
//       data: user,
//     });
//   }
// );


export const searchUserByEmailOrPhone = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const { query } = req.query;
    console.log(query);

    const user = await UserService.searchUserByEmailOrPhone(
     query as string
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User found successfully",
      data: user,
    });
  }
);

