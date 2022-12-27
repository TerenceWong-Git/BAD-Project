import express from "express";
import { roomsController } from "../routes";
import { isLoggedInAPI } from "../utils/guard";
import { asyncWrapper } from "../utils/wrapper";

export const roomsRoutes = express.Router();
roomsRoutes.post(
	"/game/:game",
	isLoggedInAPI,
	asyncWrapper(roomsController.createRoom)
);
