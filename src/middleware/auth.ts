import { NextFunction, Request, Response } from "express";

const isLogin = (req: Request, res: Response, next: NextFunction) => {
    const isAuth = req.isAuthenticated();
    const path = req.path;

    if (isAuth) {
        // Nếu đã đăng nhập mà cố vào Login/Register thì đẩy về Home
        if (path === '/login' || path === '/register') {
            return res.redirect('/');
        }
    } else {
        // Nếu chưa đăng nhập mà cố vào Admin thì đẩy về Login
        if (path.startsWith('/admin')) {
            return res.redirect('/login');
        }
    }

    // Các trường hợp khác cho đi tiếp
    next();
}
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith("/admin")) {
        const user = req.user;
        if (user?.role?.name === "ADMIN") {
            return next(); // Trả về ngay sau khi gọi next() để tránh gọi lại bên dưới
        } else {
            return res.render("Status/403.ejs");
        }
    }
    next();
}
export { isLogin, isAdmin }