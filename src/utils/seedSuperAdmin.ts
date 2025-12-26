import { Role, User } from "../modules/User/user.model";
import bcrypt from "bcryptjs";
export const seedAdmin = async () => {
  const password = "SuperAdmin@123";
  const phone = "1234567890";
  const hashedPassword = await bcrypt.hash(password, 10);
  const isExistingAdmin = await User.findOne({ phone: "1234567890" });
  if (!isExistingAdmin) {
    // Create super admin user
    console.log("Seeding super admin user...");
    await User.create({
      name: "Super Admin",
      email: "admin@example.com",
      phone: phone,
      password: hashedPassword,
      role: Role.ADMIN,
    });
  } else {
    console.log("Super admin user already exists.");
  }
};
