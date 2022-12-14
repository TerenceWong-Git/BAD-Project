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
playersRoutes.get("/profile", isLoggedInAPI, playersController.getProfile);
playersRoutes.patch(
	"/profile",
	isLoggedInAPI,
	asyncWrapper(playersController.updateProfile)
);
playersRoutes.get("/check", asyncWrapper(playersController.checkLoggedInAPI));
playersRoutes.get(
	"/my_ranking",
	isLoggedInAPI,
	asyncWrapper(playersController.individualRanking)
);
playersRoutes.get(
	"/ranking",
	isLoggedInAPI,
	asyncWrapper(playersController.getRanking)
);
