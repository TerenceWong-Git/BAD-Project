import express from "express";
import { ballBallController } from "../routes";
import { isLoggedInAPI, isMatchIdAPI } from "../utils/guard";
import { asyncWrapper } from "../utils/wrapper";

export const ballBallRoutes = express.Router();

ballBallRoutes.post(
	"/reaction",
	isLoggedInAPI,
	isMatchIdAPI,
	asyncWrapper(ballBallController.providePoints)
);
