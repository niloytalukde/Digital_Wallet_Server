import bcrypt from "bcryptjs";
import { Wallet } from "../Wallet/wallet.model";
import { IUser } from "../User/user.interface";
import { User } from "../User/user.model";
import AppError from "../../errorHelper/errorHelper";
import { generateToken } from "../../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

interface LoginPayload {
  email?: string;
  phone?: string;
  password: string;
}

const createUser = async (payload: IUser) => {
  console.log(payload);
  const { name, phone, password, email, role } = payload;
  console.log(role,"For user services");
  const isExistUser = await User.findOne({ email: email });
  if (isExistUser) {
    throw new AppError(400, "User Already Exist");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role,
    });
    // auto wallet create
    const wallet = new Wallet({
      owner: user._id,
      ownerEmail: user.email,
      ownerNumber:user.phone,
      balance: 50,
    });
    await wallet.save();
    
    return user
};

export const loginUser = async (payload: LoginPayload) => {
  const { email, phone, password } = payload;

  if (!email && !phone) throw new AppError(400, "Email or phone is required");
  if (!password) throw new AppError(400, "Password is required");

  // detect if input is email or phone
  const isEmail = email?.includes("@");
  const user = await User.findOne({
    $or: [
      isEmail ? { email: email?.toLowerCase() } : {},
      !isEmail ? { phone: phone } : {},
    ].filter((cond) => Object.keys(cond).length > 0),
  });

  if (!user) {
    throw new AppError(400, "User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(400, "Invalid password");
  }

  const jwtPayload = {
    userId: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };

  const accessToken = generateToken(jwtPayload, process.env.JWT_SECRET!, "7d");
  const refreshToken = generateToken(
    jwtPayload,
    process.env.JWT_SECRET!,
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    user
  };
};

const changePassword = async (
 userId:string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await User.findById(userId);

  const isOldPasswordMatch = await bcryptjs.compare(
    oldPassword,
    user!.password as string
  );

  if (isOldPasswordMatch) {
    throw new AppError(400, "password are not match");
  }
  user!.password = await bcryptjs.hash(newPassword, Number(10));

  user!.save();

  return true;
};

export const authServices = { createUser, loginUser, changePassword };
