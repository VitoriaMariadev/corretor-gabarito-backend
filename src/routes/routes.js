import { Router } from "express";

import {
    ShowAllUser,
    CreateUser,
    Login,
    DeleteUserID
} from "../controllers/controllesUsers.js"

import { TokenValid, DeleteToken } from "../controllers/controllesToken.js";

import { ShowAllFoldersByUser, ShowFolderById, CreateFolders, DeleteFolder } from "../controllers/controllesFolders.js";

import { ShowAllFilesByFolder, CreateFile } from "../controllers/controllesFiles.js";

const route = Router();

// Users

route.get('/show_all_users', ShowAllUser);
route.post('/create_user', CreateUser);
route.post("/login", Login);
route.delete("/delete_user/:id_user", DeleteUserID);

// Token 

route.post("/validar_token", TokenValid);
route.post("/deletar_token", DeleteToken);

// Folders

route.post('/show_all_folders', ShowAllFoldersByUser)
route.get('/show_folder_id/:id', ShowFolderById)
route.post('/create_folder', CreateFolders)
route.delete('/delete_folder/:id', DeleteFolder)

// Files 

route.get('/show_all_files/:id', ShowAllFilesByFolder)
route.post('/create_file', CreateFile)

export default route;
