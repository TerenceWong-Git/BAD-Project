import express from "express";
import { playersController } from "../routes";
import { isLoggedInAPI } from "../utils/guard";
import { asyncWrapper } from "../utils/wrapper";

export const playersRoutes = express.Router();
playersRoutes.post("/register", asyncWrapper(playersController.register));
playersRoutes.post("/login", asyncWrapper(playersController.login));
playersRoutes.delete(
	"/logout",
	isLoggedInAPI,
	asyncWrapper(playersController.logout)
);
playersRoutes.get(
	"/profile/:profile",
	isLoggedInAPI,
	playersController.getProfile
);
playersRoutes.patch(
	"/profile/:profile",
	isLoggedInAPI,
	asyncWrapper(playersController.updateProfile)
);
playersRoutes.get("/check", asyncWrapper(playersController.checkLoggedInAPI));
