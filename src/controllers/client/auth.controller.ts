import { NextFunction, Request, Response } from "express";
import { RegisterSchema } from "src/validation/register.schema";
import { registerNewUser } from "src/services/client/auth.service";

const getRegisterPage = (req: Request, res: Response) => {
    return res.render("client/auth/register")
}

const getLoginPage = (req: Request, res: Response) => {
    const session = req.session as any;
    const messages = session?.messages ?? [];
    // Clear messages after reading to avoid displaying them again on refresh
    if (session?.messages) {
        delete session.messages;
    }
    return res.render("client/auth/login", { messages })
}

const postRegister = async (req: Request, res: Response) => {
    const { fullname, username, password, passwordConfirm } = req.body as {
        fullname: string;
        username: string;
        password: string;
        passwordConfirm: string;
    };

    const validate = await RegisterSchema.safeParseAsync(req.body);
    if (!validate.success) {
        //error
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map(item => `${item.message} (${item.path[0]})`);

        const oldData = {
            fullname, username, password, passwordConfirm
        }
        return res.render("client/auth/register.ejs", {
            errors, oldData
        });
    }

    // //success
    try {
        await registerNewUser(fullname, username, password);
    } catch (error: any) {
        const oldData = { fullname, username, password, passwordConfirm };
        return res.render("client/auth/register.ejs", {
            errors: [error.message || "Đã xảy ra lỗi khi đăng ký"],
            oldData
        });
    }

    return res.redirect("/login");
}

const getSuccessRedirect = (req: Request, res: Response) => {
    const user = req.user as any;
    if (user?.role?.name === "ADMIN") {
        return res.redirect("/admin");
    }
    return res.redirect("/");
}
const postLogout = (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
}
export {
    getRegisterPage,
    getLoginPage,
    postRegister,
    getSuccessRedirect,
    postLogout
}
