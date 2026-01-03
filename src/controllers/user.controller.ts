import { getAllUsers, handleCreateUser } from '../services/user.service';
import { Request, Response } from "express";
const getHomePage = async (req: Request, res: Response) => {
    //Get users
    const users = await getAllUsers();
    // console.log("All users", users)
    return res.render("home", {
        users: users
    })
}
const getCreateUserPage = (req: Request, res: Response) => {
    return res.render("create-user")
}
const postCreateUserPage = async (req: Request, res: Response) => {
    const { fullName, email, address } = req.body;
    //handle create user
    await handleCreateUser(fullName, email, address)
    return res.redirect("/")
}
export { getHomePage, getCreateUserPage, postCreateUserPage };