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
const getUserWithRoleById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id: +id },
        include: {
            role: true
        },
        omit: {
            password: true
        }
    })
    return user;
}
const getUserSumCart = async (id: string) => {
    const cart = await prisma.cart.findUnique({
        where: { userId: +id },
        include: {
            cartDetails: true
        }
    })
    if (!cart) return 0;

    // Calculate total quantity from current items in cart
    const total = cart.cartDetails.reduce((acc, item) => acc + item.quantity, 0);
    return total;
}
export { registerNewUser, getUserWithRoleById, getUserSumCart }
