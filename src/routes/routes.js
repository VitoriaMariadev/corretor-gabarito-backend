import { Router } from "express";

import {
    ShowAllUser,
    CreateUser,
    Login
} from "../controllers/controllesUsers.js"

import { TokenValid, deleteToken } from "../controllers/controllesToken.js";

const route = Router();

// Users

route.get('/show_all_users', ShowAllUser);
route.post('/create_user', CreateUser);
route.post("/login", Login);

// Token

// token
route.post("/validar_token", TokenValid);
route.post("/deletar_token", deleteToken);

export default route;
