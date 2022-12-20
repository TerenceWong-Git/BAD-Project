import express from "express";
import { ballBallController } from "../routes";
import { asyncWrapper } from "../utils/wrapper";

export const ballBallRoutes = express.Router();

ballBallRoutes.post(
	"/reaction",
	asyncWrapper(ballBallController.providePoints)
);
