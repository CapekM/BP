import {postGetAllUsers} from "./controller/postGetAllUsers";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/users",
        method: "get",
        action: postGetAllUsers
    },
];