import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { hashPassword } from "../user.service";

const registerNewUser = async (fullName: string, email: string, password: string) => {
    const existingUser = await prisma.user.findUnique({
        where: { username: email }
    });

    if (existingUser) {
        throw new Error("Email này đã được sử dụng. Vui lòng chọn email khác.");
    }

    const hashedPassword = await hashPassword(password);

    const userRole = await prisma.role.findFirst({
        where: {
            name: "USER"
        }
    });

    const newUser = await prisma.user.create({
        data: {
            fullName: fullName,
            username: email,
            password: hashedPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: userRole?.id // Fallback to 1 if role not found
        }
    });

    return newUser;
}
export { registerNewUser }
