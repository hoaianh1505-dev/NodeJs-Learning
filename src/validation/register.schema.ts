import { z } from "zod";

export const RegisterSchema = z.object({
    fullname: z.string().trim().min(3, "Họ tên phải có ít nhất 3 ký tự").max(100, "Họ tên tối đa 100 ký tự"),
    username: z.string().trim().email("Email không hợp lệ"),
    password: z.string().trim().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    passwordConfirm: z.string().trim().min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["passwordConfirm"],
});

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
