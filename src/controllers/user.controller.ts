import { getAllRoles, getAllUsers, getUserById, handleCreateUser, handleDeleteUser, updateUserById } from '../services/user.service';
import { Request, Response } from "express";
const getHomePage = async (req: Request, res: Response) => {
    //Get users
    const users = await getAllUsers();
    // console.log("All users", users)
    return res.render("home", {
        users: users
    })
}
const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    // console.log(roles)
    return res.render("admin/user/create.ejs", {
        roles // này tương tự như viết roles: roles;
    }
    )
}
const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, email, address } = req.body;
    //handle create user
    const a = await handleCreateUser(fullName, email, address)
    return res.redirect("/")
}

const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect("/")
}
const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    // get user by id
    const user = await getUserById(id);
    return res.render("../views/view-user.ejs", {
        id: id,
        user: user
    })

}
const postUpdateUser = async (req: Request, res: Response) => {
    const { id, email, address, fullName } = req.body;
    // get user by id
    const a = await updateUserById(id, email, address, fullName);
    return res.redirect("/");

}


export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };