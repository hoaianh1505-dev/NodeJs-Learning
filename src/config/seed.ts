import { hashPassword } from "src/services/user.service";
import { prisma } from "./client";
import { ACCOUNT_TYPE } from "./constant";

const initDayabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();

    if (countRole === 0) {

        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Admin full quyền"
                },
                {
                    name: "USER",
                    description: "User thông thường "
                },
            ]
        })
    }
    if (countUser === 0) {
        const defaultPassword = await hashPassword("123456")
        const adminRole = await prisma.role.findFirst({
            where: { name: "ADMIN" }
        })
        if (adminRole)
            await prisma.user.createMany({
                data: [
                    {
                        fullName: "Hazi_anhh",
                        username: "hazi_anh@gmail.com",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    },
                    {
                        fullName: "Admin",
                        username: "hazianh@gmail.com",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    },
                ]
            })
    }
    if (countRole !== 0 && countUser !== 0) {
        console.log("alldrealy init data")
    }

}
export default initDayabase;