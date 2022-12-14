import { knex } from "./main";
import express from "express";

import { BallBallService } from "./service/ballBallService";
import { BallBallController } from "./controller/ballBallController";
import { PlayersService } from "./service/playersService";
import { PlayersController } from "./controller/playersController";
import { RoomsService } from "./service/roomsService";
import { RoomsController } from "./controller/roomsController";

const ballBallService = new BallBallService(knex);
export const ballBallController = new BallBallController(ballBallService);

const playersService = new PlayersService(knex);
export const playersController = new PlayersController(playersService);

const roomsService = new RoomsService(knex);
export const roomsController = new RoomsController(roomsService);

import { ballBallRoutes } from "./router/ballBallRoutes";
import { playersRoutes } from "./router/playersRoutes";
import { roomsRoutes } from "./router/roomsRoutes";

export const routes = express.Router();
routes.use("/ballBall", ballBallRoutes);
routes.use("/players", playersRoutes);
routes.use("/rooms", roomsRoutes);
