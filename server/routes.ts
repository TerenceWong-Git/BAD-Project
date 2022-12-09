import { knex } from "./main";
import express from "express";

import { BallBallService } from "./service/ballBallService";
import { BallBallController } from "./controller/ballBallController";
import { LaserService } from "./service/laserService";
import { LaserController } from "./controller/laserController";
import { PlayersService } from "./service/playersService";
import { PlayersController } from "./controller/playersController";

const ballBallService = new BallBallService(knex);
export const ballBallController = new BallBallController(ballBallService);

const laserService = new LaserService(knex);
export const laserController = new LaserController(laserService);

const playersService = new PlayersService(knex);
export const playersController = new PlayersController(playersService);

import { ballBallRoutes } from "./router/ballBallRoutes";
import { laserRoutes } from "./router/laserRoutes";
import { playersRoutes } from "./router/playersRoutes";

export const routes = express.Router();
routes.use("/ballBall", ballBallRoutes);
routes.use("/laser", laserRoutes);
routes.use("/players", playersRoutes);

// list of router
// player (register, login, leaderBoard, userProfile)
// ball
// laser
//
