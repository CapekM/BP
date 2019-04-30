import {postGetAllUsers} from "./controller/postGetAllUsers";
import { login } from "./controller/login";
import { postModel, deleteModel, putModel } from "./controller/model";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/users",
        method: "get",
        action: postGetAllUsers
    },
    {
        path: "/login",
        method: "post",
        action: login
    },
    {
        path: "/model/:modelID",
        method: "delete",
        action: deleteModel
    },
    {
        path: "/model",
        method: "put",
        action: putModel
    },
    {
        path: "/model/:modelID",
        method: "post",
        action: postModel
    },
];