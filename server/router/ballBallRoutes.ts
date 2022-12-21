import express from "express";
import { ballBallController } from "../routes";
import { isLoggedInAPI } from "../utils/guard";
import { asyncWrapper } from "../utils/wrapper";

export const ballBallRoutes = express.Router();

ballBallRoutes.post(
	"/reaction",
	isLoggedInAPI,
	asyncWrapper(ballBallController.providePoints)
);
ballBallRoutes.get(
	"/reaction",
	isLoggedInAPI,
	asyncWrapper(ballBallController.getPoints)
);
