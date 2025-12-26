
import { IUser } from "../modules/User/user.interface";
import { generateToken } from "./jwt";

export const createUserToken = async (user: Partial<IUser>) => {
  const jwtPayload = {
    email: user.email,
    role: user.role,
    userId: user._id,
  };

  const accessToken = generateToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET!,
   process.env.JWT_ACCESS_SECRET!
  );

  const refreshToken = generateToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET!,
    process.env.JWT_ACCESS_SECRET!
  );

  return {
    accessToken,
    refreshToken
  };
};
