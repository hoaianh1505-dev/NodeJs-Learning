import { User as UserPrisma, Role as RolePrisma } from "@prisma/client";

declare global {
    namespace Express {
        interface User extends UserPrisma {
            role?: RolePrisma;
            sumCart?: number;
        }
    }
}