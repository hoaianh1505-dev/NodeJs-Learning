import getConnection from "../config/database";

const handleCreateUser = (
    fullName: string,
    email: string,
    address: string) => {
    //insert into database
    // return resolve
    // console.log("add user")
}
const getAllUsers = async () => {
    const connection = await getConnection();
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users`'
        );
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }

}
export { handleCreateUser, getAllUsers }