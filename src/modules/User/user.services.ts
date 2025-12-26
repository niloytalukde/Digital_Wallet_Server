import AppError from "../../errorHelper/errorHelper";
import { IUser } from "./user.interface";
import { User } from "./user.model";
const getMe=async(userId:string)=>{
    const user=await User.findById(userId); 
    return user;
}
const updateMyProfile=async(userId:string,updateData:Partial<IUser>)=>{
  if(!userId && updateData){
throw new AppError(401,'User Id or data not found ')
  }
    const user=await User.findByIdAndUpdate(userId,updateData,{new:true});
    return user;
}
const getAllUsers=async()=>{
    const users=await User.find();
    return users;
}  

const getAllAgents=async()=>{
    const users=await User.find({role:"agent"});
    return users;
}  

const blockUser=async(userId:string,status:string)=>{
    const user=await User.findByIdAndUpdate(userId,{status:status},{new:true});
    return user;
}   
const approveAgent=async(userId:string,agentStatus:string)=>{
    const user=await User.findByIdAndUpdate(userId,{isApproved:agentStatus},{new:true});
    return user;
}
export const searchUserByEmailOrPhone = async (searchText?: string) => {
  if (!searchText) {
    throw new AppError(400, "Search text is required");
  }

  const regex = new RegExp(searchText, "i"); 

  const user = await User.find({
    $or: [
      { email: regex },
      { phone: regex },
      { name: regex }, 
    ],
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
};

export const UserService={
    getMe,
    updateMyProfile,
    getAllUsers,
    blockUser,
    approveAgent,
    searchUserByEmailOrPhone,
    getAllAgents
};