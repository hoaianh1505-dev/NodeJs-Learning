import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePassword } from "src/services/user.service";

const configPassportLocal = async () => {
    passport.use(
        new LocalStrategy(async function verify(username, password, callback) {
            console.log(username, password);
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
            return callback(null, user);
        })
    );

}

export default configPassportLocal; 