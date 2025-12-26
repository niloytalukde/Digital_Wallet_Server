import { Request, Response } from "express";
import { authServices } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";
import { setAuthCookie } from "../../utils/setAuthcooike";
export const registerUser = async (req: Request, res: Response) => {
  const user = authServices.createUser(req.body);
  
  console.log(req.body,"From auth controller ");
  return sendResponse(res, {
    success: true,
    message: "User created successfully",
    statusCode: 200,
    data: user,
  });
};

export const login = async (req: Request, res: Response) => {                                                                                                                    
  const user= await authServices.loginUser(req.body);
  const tokenInfo ={
    accessToken :user.accessToken,
    refreshToken:user.refreshToken
  }
  setAuthCookie(res, tokenInfo);
 return sendResponse(res, {
    success: true,
    message: "User Login successfully",
    statusCode: 200,
    data:user,
  });
};

export const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
const decodedToken=req.user

   await authServices.changePassword(decodedToken,oldPassword,newPassword);

  sendResponse(res, {
    success: true,
    message: "Password change successful",
    statusCode: 200,
    data:true ,
  });
};

export const logOut = async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  sendResponse(res, {
    success: true,
    message: "Logout Successfully",
    statusCode: 200,
    data: null,
  });
};
