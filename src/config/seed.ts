import { prisma } from "./client";

const initDayabase = async () => {
    const countUser = await prisma.user.count();
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
    } else {
        console.log("alldrealy init data")
    }

}
export default initDayabase;