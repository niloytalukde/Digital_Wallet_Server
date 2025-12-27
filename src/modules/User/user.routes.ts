import { Router } from "express";
import { approveAgent, blockUser, getAllUsers, getMe, updateMyProfile ,searchUserByEmailOrPhone, getAllAgent} from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.model";


const userRouter=Router();

userRouter.get("/all-users",checkAuth(Role.ADMIN), getAllUsers);
userRouter.get("/me",checkAuth(Role.USER,Role.AGENT,Role.ADMIN), getMe);
userRouter.get("/agent",checkAuth(Role.ADMIN), getAllAgent);
userRouter.patch("/update/:id",checkAuth(Role.USER,Role.AGENT,Role.ADMIN),updateMyProfile);
userRouter.patch("/block/:id",checkAuth(Role.ADMIN),blockUser);
userRouter.patch("/approve-agent/:id",checkAuth(Role.ADMIN),approveAgent);
userRouter.get("/search",checkAuth(Role.USER, Role.AGENT, Role.ADMIN),searchUserByEmailOrPhone
);
export const UserRoutes=userRouter ;