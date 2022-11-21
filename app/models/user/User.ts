import { Pool, QueryResult } from "pg"
import { IUser } from "./types";

class User {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async getOne(userId: number): Promise<QueryResult<IUser>> {
        try {
            const res = await this.pool.query(
                `select * from users where id = ${userId}`
            );
            return res
        } catch (error) {
            console.error(error)
        }
    }

}

export default User;