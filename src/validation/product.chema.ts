import { z } from "zod";
export const ProductSchema = z.object({
    name: z.string().trim().min(3, "Tên phải có ít nhất 3 ký tự").max(100, "Tên phải có tối đa 100 ký tự"),
    price: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số tiền tối thiểu là 1",
        }),
    detailDesc: z.string().trim().min(1, "Mô tả chi tiết phải có ít nhất 1 ký tự").max(100, "Mô tả chi tiết phải có tối đa 100 ký tự"),
    shortDesc: z.string().trim().min(1, "Mô tả ngắn phải có ít nhất 1 ký tự").max(100, "Mô tả ngắn phải có tối đa 100 ký tự"),
    quantity: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số lượng tối thiểu là 1",
        }),
    factory: z.string().trim().min(1, "Xuất xứ phải có ít nhất 1 ký tự").max(100, "Xuất xứ phải có tối đa 100 ký tự"),
    target: z.string().trim().min(1, "Mục tiêu phải có ít nhất 1 ký tự").max(100, "Mục tiêu phải có tối đa 100 ký tự"),
})
export type TProductSchema = z.infer<typeof ProductSchema>  
