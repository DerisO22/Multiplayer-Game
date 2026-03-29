import { playerQueries } from "../database/queries/playerQueries.js"

export const getAllPlayerInformation = async(pgClient, clerk_user_id) => {
    try {
        const query = playerQueries.GET_ALL_PLAYER_INFORMATION;
        const result = await pgClient.query(query, [clerk_user_id]);

        return result.rows;
    } catch (err) {
        console.error("Service Error fetching all player information: ", err);
    }
}