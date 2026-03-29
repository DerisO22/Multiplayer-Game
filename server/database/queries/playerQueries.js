export const playerQueries = {
    GET_ALL_PLAYER_INFORMATION: 
        `SELECT *
        FROM players p
        JOIN player_keybinds pk ON p.clerk_user_id = pk.clerk_user_id
        JOIN player_stats pst ON p.clerk_user_id = pst.clerk_user_id
        JOIN player_sounds pso ON p.clerk_user_id = pso.clerk_user_id
        WHERE p.clerk_user_id = $1;`,
}