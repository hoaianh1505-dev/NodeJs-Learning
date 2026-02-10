import { hashPassword } from "src/services/user.service";
import { prisma } from "./client";
import { ACCOUNT_TYPE } from "./constant";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    const countProduct = await prisma.product.count();
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
    if (countProduct === 0) {
        const products = [
            {
                name: "Laptop Asus TUF Gaming F15",
                price: 17490000,
                detailDesc: "Laptop gaming bền bỉ chuẩn quân đội, hiệu năng ổn định cho học tập và giải trí.",
                shortDesc: "Intel Core i5-11400H, GTX 1650",
                quantity: 100,
                factory: "ASUS",
                target: "GAMING",
                image: "01e6bb1e-bcfb-4bb1-9946-1138b1e935c3.png"
            },
            {
                name: "Laptop Acer Nitro 5",
                price: 18990000,
                detailDesc: "Thiết kế hầm hố, tản nhiệt tốt, phù hợp game thủ phổ thông.",
                shortDesc: "Intel Core i5-12500H, RTX 3050",
                quantity: 80,
                factory: "ACER",
                target: "GAMING",
                image: "10417179-4863-4d24-91b4-b63bb016276e.png"
            },
            {
                name: "Laptop MSI Gaming GF63",
                price: 16990000,
                detailDesc: "Laptop mỏng nhẹ trong phân khúc gaming, hiệu năng ổn định.",
                shortDesc: "Intel Core i5-11400H, GTX 1650",
                quantity: 60,
                factory: "MSI",
                target: "GAMING",
                image: "2570c812-8f64-4d24-a495-91c95ba76829.png"
            },
            {
                name: "Laptop Dell G15",
                price: 20990000,
                detailDesc: "Hiệu năng mạnh mẽ, build chắc chắn, phù hợp làm việc và chơi game.",
                shortDesc: "Intel Core i5-12500H, RTX 3050",
                quantity: 70,
                factory: "DELL",
                target: "GAMING",
                image: "467ab90d-b5cb-41f4-b754-102a36c55067.png"
            },
            {
                name: "Laptop Lenovo Legion 5",
                price: 23990000,
                detailDesc: "Dòng gaming cao cấp với khả năng tản nhiệt vượt trội.",
                shortDesc: "Ryzen 7 5800H, RTX 3060",
                quantity: 50,
                factory: "LENOVO",
                target: "GAMING",
                image: "5a4d0cec-a751-4122-9df0-e07f41a63a5b.png"
            },
            {
                name: "Laptop HP Victus 16",
                price: 19590000,
                detailDesc: "Thiết kế hiện đại, phù hợp cả chơi game lẫn làm đồ họa.",
                shortDesc: "Ryzen 5 5600H, RTX 3050",
                quantity: 65,
                factory: "HP",
                target: "GAMING",
                image: "5b5ebca1-3459-4e3e-b912-05d8445a6e42.png"
            },
            {
                name: "MacBook Air M1",
                price: 18990000,
                detailDesc: "Hiệu năng cao, pin lâu, tối ưu cho học tập và làm việc.",
                shortDesc: "Apple M1, 8GB RAM",
                quantity: 120,
                factory: "APPLE",
                target: "OFFICE",
                image: "5cd829f6-ef61-4b44-97e7-14c825f579f4.png"
            },
            {
                name: "MacBook Pro M2",
                price: 32990000,
                detailDesc: "Laptop cao cấp cho lập trình và sáng tạo nội dung.",
                shortDesc: "Apple M2, 16GB RAM",
                quantity: 40,
                factory: "APPLE",
                target: "OFFICE",
                image: "7b5b74c2-78fc-46d6-9c1d-3c55e7892001.png"
            },
            {
                name: "Laptop Dell Inspiron 15",
                price: 13990000,
                detailDesc: "Laptop văn phòng bền bỉ, phù hợp sinh viên.",
                shortDesc: "Intel Core i5-1135G7",
                quantity: 150,
                factory: "DELL",
                target: "OFFICE",
                image: "8d2cf778-112d-49d5-a998-b68645645f84.png"
            },
            {
                name: "Laptop HP Pavilion 14",
                price: 14990000,
                detailDesc: "Thiết kế gọn nhẹ, hiệu năng ổn định cho công việc hằng ngày.",
                shortDesc: "Intel Core i5-1235U",
                quantity: 110,
                factory: "HP",
                target: "OFFICE",
                image: "a357cc66-d67a-4005-9c29-7936a5eccf06.png"
            },
            {
                name: "Laptop Asus Vivobook 15",
                price: 12990000,
                detailDesc: "Giá tốt, cấu hình ổn, phù hợp học tập.",
                shortDesc: "Intel Core i3-1215U",
                quantity: 200,
                factory: "ASUS",
                target: "STUDENT",
                image: "ac2d3bb6-0f88-49af-895e-0e5b7846d597.png"
            },
            {
                name: "Laptop Lenovo IdeaPad 3",
                price: 11990000,
                detailDesc: "Laptop sinh viên, pin ổn, dễ nâng cấp.",
                shortDesc: "Ryzen 5 5500U",
                quantity: 180,
                factory: "LENOVO",
                target: "STUDENT",
                image: "b109153a-338e-449a-a045-9185f2a4343d.png"
            },
            {
                name: "Laptop Acer Aspire 7",
                price: 15990000,
                detailDesc: "Vừa học vừa chơi game nhẹ, thiết kế đơn giản.",
                shortDesc: "Ryzen 5 5500U, GTX 1650",
                quantity: 90,
                factory: "ACER",
                target: "STUDENT",
                image: "bd4a78e6-fe3e-41d6-95c8-e964cfc9b3eb.png"
            },
            {
                name: "Laptop MSI Modern 14",
                price: 14990000,
                detailDesc: "Mỏng nhẹ, phù hợp dân văn phòng.",
                shortDesc: "Intel Core i5-1155G7",
                quantity: 100,
                factory: "MSI",
                target: "OFFICE",
                image: "c26b0863-dda6-424a-9aae-099f5f21c2df.png"
            },
            {
                name: "Laptop LG Gram 16",
                price: 34990000,
                detailDesc: "Siêu nhẹ, pin cực trâu, cao cấp.",
                shortDesc: "Intel Core i7-1260P",
                quantity: 30,
                factory: "LG",
                target: "OFFICE",
                image: "c8054385-d9fa-4988-b092-e3e2f83a1764.png"
            },
            {
                name: "Laptop Asus ROG Strix G15",
                price: 27990000,
                detailDesc: "Gaming cao cấp, RGB đẹp, hiệu năng mạnh.",
                shortDesc: "Ryzen 7 6800H, RTX 3060",
                quantity: 45,
                factory: "ASUS",
                target: "GAMING",
                image: "caae668f-c4f4-4015-a8ab-9a5abe380a0a.png"
            },
            {
                name: "Laptop Acer Predator Helios 300",
                price: 29990000,
                detailDesc: "Gaming hiệu năng cao, màn hình tần số quét lớn.",
                shortDesc: "Intel Core i7-12700H, RTX 3060",
                quantity: 35,
                factory: "ACER",
                target: "GAMING",
                image: "d492c16b-ce9e-4f5a-9202-15d47e4f5b7a.png"
            },
            {
                name: "Laptop Dell XPS 13",
                price: 28990000,
                detailDesc: "Thiết kế cao cấp, màn hình đẹp.",
                shortDesc: "Intel Core i7-1250U",
                quantity: 40,
                factory: "DELL",
                target: "OFFICE",
                image: "d4939fd3-1b8c-4829-a7ec-a34670c63e46.png"
            },
            {
                name: "Laptop Lenovo ThinkPad X1 Carbon",
                price: 35990000,
                detailDesc: "Laptop doanh nhân cao cấp, cực kỳ bền.",
                shortDesc: "Intel Core i7-1260P",
                quantity: 25,
                factory: "LENOVO",
                target: "BUSINESS",
                image: "dbf3bc61-5306-415c-8642-76125a7f7126.png"
            },
            {
                name: "Laptop HP EliteBook 840",
                price: 27990000,
                detailDesc: "Bảo mật cao, phù hợp doanh nghiệp.",
                shortDesc: "Intel Core i7-1165G7",
                quantity: 30,
                factory: "HP",
                target: "BUSINESS",
                image: "ee8a47e7-466e-42b1-88bd-1bd2b665a47c.png"
            }
        ];
        await prisma.product.createMany({
            data: products
        });
    }

    if (countRole !== 0 && countUser !== 0 && countProduct !== 0) {
        console.log("alldrealy init data")
    }

}
export default initDatabase;