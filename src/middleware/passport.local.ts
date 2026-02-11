import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserSumCart, getUserWithRoleById } from "../services/client/auth.service";
import { comparePassword } from "src/services/user.service";

const configPassportLocal = async () => {
    passport.use(
        new LocalStrategy({
            passReqToCallback: true
        }, async function verify(req, username, password, callback) {
            const { session } = req as any;
            // if (session?.messages.length) {
            //     session.messages = [];
            // }
            const messages = session.messages || [];

            console.log(req.body);

            //check user exist
            const user = await prisma.user.findUnique({
                where: { username: username }
            });
            if (!user) {
                // throw new Error(`User:${username} not found`);
                return callback(null, false, { message: "User not found" });
            }
            //check password
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                // throw new Error("wrong password");
                return callback(null, false, { message: "Wrong password" });
            }
            return callback(null, user as any);
        })
    );
    passport.serializeUser(function (user: any, callback) {
        callback(null, { id: user.id, username: user.username });
    });

    passport.deserializeUser(async function (user: any, callback) {
        const { id, username } = user;
        const userInDB: any = await getUserWithRoleById(id);
        const sumCart = await getUserSumCart(id);

        return callback(null, { ...userInDB, sumCart: sumCart });
    });

}

export default configPassportLocal; 