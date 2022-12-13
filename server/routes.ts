import { knex } from "./main";
import express from "express";

import { BallBallService } from "./service/ballBallService";
import { BallBallController } from "./controller/ballBallController";
import { LaserService } from "./service/laserService";
import { LaserController } from "./controller/laserController";
import { PlayersService } from "./service/playersService";
import { PlayersController } from "./controller/playersController";
import { RoomsService } from "./service/roomsService";
import { RoomsController } from "./controller/roomsController";

const ballBallService = new BallBallService(knex);
export const ballBallController = new BallBallController(ballBallService);

const laserService = new LaserService(knex);
export const laserController = new LaserController(laserService);

const playersService = new PlayersService(knex);
export const playersController = new PlayersController(playersService);

const roomsService = new RoomsService(knex);
export const roomsController = new RoomsController(roomsService);

import { ballBallRoutes } from "./router/ballBallRoutes";
import { laserRoutes } from "./router/laserRoutes";
import { playersRoutes } from "./router/playersRoutes";
import { roomsRoutes } from "./router/roomsRoutes";

export const routes = express.Router();
routes.use("/ballBall", ballBallRoutes);
routes.use("/laser", laserRoutes);
routes.use("/players", playersRoutes);
routes.use("/rooms", roomsRoutes);

// list of router
// player (register, login, leaderBoard, userProfile)
// ball
// laser
//
