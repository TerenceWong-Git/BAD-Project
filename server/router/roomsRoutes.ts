import express from "express";
import { roomsController } from "../routes";
import { asyncWrapper } from "../utils/wrapper";

export const roomsRoutes = express.Router();
roomsRoutes.post("/game/:game", asyncWrapper(roomsController.createRoom));
