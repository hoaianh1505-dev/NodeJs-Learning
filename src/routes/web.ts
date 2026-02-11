import express, { Express } from 'express'
import { getCreateUserPage, getHomePage, getViewUser, postCreateUser, postDeleteUser, postUpdateUser } from '../controllers/user.controller';
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashBoardPage } from 'controllers/admin/dashboard.controller';
import fileUploadMiddleware from 'src/middleware/multer';
import { getCartPage, getProductPage, postAddProductToCart, postDeleteProductInCart, postUpdateCart } from 'controllers/client/product.controller';
import { getAdminCreateProductPage, getViewProduct, postAdminCreateProduct, postDeleteProduct, postUpdateProduct } from 'controllers/admin/product.controller';
import { getLoginPage, getRegisterPage, getSuccessRedirect, postLogout, postRegister } from 'controllers/client/auth.controller';
import passport from 'passport';
import { isAdmin, isLogin } from 'src/middleware/auth';
const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })
const router = express.Router();
const webRoutes = (app: Express) => {
    router.get("/", getHomePage)
    router.get("/product/:id", getProductPage)
    router.get("/register", isLogin, getRegisterPage)
    router.post("/register", postRegister)
    router.get("/login", getLoginPage)
    router.get("/success-redirect", getSuccessRedirect)
    router.post("/login", passport.authenticate('local', {
        successRedirect: '/success-redirect',
        failureRedirect: '/login',
        failureMessage: true
    }))
    router.post("/logout", postLogout);
    // Cart router
    router.post("/add-product-to-cart/:id", postAddProductToCart)
    router.get("/cart", getCartPage)
    router.post("/cart/update", postUpdateCart)
    router.post("/delete-product-in-cart/:id", postDeleteProductInCart)
    //admin routes
    router.get("/admin", getDashBoardPage)
    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/product", getAdminProductPage)
    router.get("/admin/create-product", getAdminCreateProductPage)
    router.post("/admin/create-product", fileUploadMiddleware("image", "images/product"), postAdminCreateProduct)
    router.post("/admin/delete-product/:id", postDeleteProduct)
    router.get("/admin/view-product/:id", getViewProduct)
    router.post("/admin/update-product/:id", fileUploadMiddleware("image", "images/product"), postUpdateProduct)
    router.get("/admin/order", getAdminOrderPage)
    router.get("/admin/create-user", getCreateUserPage)
    router.post("/admin/delete-user/:id", postDeleteUser)
    router.get("/admin/view-user/:id", getViewUser)
    router.post("/admin/update-user", fileUploadMiddleware('avatar'), postUpdateUser)
    router.post("/admin/handle-create-user", fileUploadMiddleware('avatar'), postCreateUser)
    app.use("/", isAdmin, router)
}
export default webRoutes;
