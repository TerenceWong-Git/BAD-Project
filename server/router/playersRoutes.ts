import express from "express";
import { playersController } from "../routes";
import { asyncWrapper } from "../utils/wrapper";

export const playersRoutes = express.Router();
playersRoutes.post("/register", asyncWrapper(playersController.register));
