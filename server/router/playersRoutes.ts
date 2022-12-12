import express from "express";
import { playersController } from "../routes";
import { isLoggedInAPI } from "../utils/guard";
import { asyncWrapper } from "../utils/wrapper";

export const playersRoutes = express.Router();
playersRoutes.post("/register", asyncWrapper(playersController.register));
playersRoutes.post("/login", asyncWrapper(playersController.login));
playersRoutes.get("/profile", isLoggedInAPI, playersController.getProfile);
playersRoutes.post(
	"/profile",
	isLoggedInAPI,
	asyncWrapper(playersController.updateProfile)
);
