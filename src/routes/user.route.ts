import { Router } from "express";
import UserController from "../controller/UserController";

const userRoutes: Router = Router();
const userController = new UserController();

userRoutes.post("/create", userController.createUser);

export default userRoutes;
