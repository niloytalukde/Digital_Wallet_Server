import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/errorHelper";
import { User } from "../modules/User/user.model";

export const checkAuth = (...authRole: string[]) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  let accessToken = req.headers.authorization || req.cookies.accessToken;

  try {
    if (!accessToken) {
      throw new AppError(400, "No Access Token");
    }
    if (accessToken.startsWith("Bearer ")) {
      accessToken = accessToken.split(" ")[1];
    }

    const verifiedToken = verifyToken(
      accessToken,process.env.JWT_SECRET!
    ) as JwtPayload;

    const isUserExist = await User.findOne({ email: verifiedToken.email });

    if (!isUserExist) {
      throw new AppError(400, "User does not exist");
    }

   

    if (!authRole.includes(verifiedToken.role)) {
      throw new AppError(400, "You are Not Permitted");
    }

    req.user = verifiedToken;
    
    next();
  } catch (error) {
    next(error);
  }
};


 // if (
    //   isUserExist.isActive === isActive.BLOCK ||
    //   isUserExist.isActive === isActive.INACTIVE
    // ) {
    //   throw new AppError(400, `User is ${isUserExist.isActive}`);
    // }

    // if (isUserExist.isDeleted) {
    //   throw new AppError(400, "User is deleted");
    // }

    // if (!isUserExist.isVerified) {
    //   throw new AppError(400, "User is not verified");
    // }