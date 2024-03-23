import { Router } from "express";

import {
    ShowAllUser,
    CreateUser,
} from "../controllers/controllesUsers.js"

const route = Router();

// Users

route.get('/show_all_users', ShowAllUser);
route.post('create_user', CreateUser);

export default route;
