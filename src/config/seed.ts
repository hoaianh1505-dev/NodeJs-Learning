import { prisma } from "./client";

const initDayabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    if (countUser === 0) {
        await prisma.user.createMany({
            data: [
                {
                    username: "hazi_anh@gmail.com",
                    password: "12345",
                    accountType: "SYSTEM"
                },
                {
                    username: "hazianh@gmail.com",
                    password: "12345",
                    accountType: "SYSTEM"
                },
            ]
        })
    }
    else if (countRole === 0) {
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
    else {
        console.log("alldrealy init data")
    }

}
export default initDayabase;