import type { Request, Response } from "express";
import { RoomsService } from "../service/roomsService";
import { logger } from "../utils/logger";

export class RoomsController {
	constructor(private roomsService: RoomsService) {}
	dummy = async (req: Request, res: Response) => {
		const data = await this.roomsService.dummy();
		res.json(data);
	};
	createRoom = async (req: Request, res: Response) => {
		const gameMode = +req.params.game;
		const roomName = Math.random().toString(32).slice(2, 12);
		logger.info("Room Name = ", roomName);
		logger.info("Length = ", roomName.length);
		const roomPass = Math.random().toString().slice(2, 10);
		logger.info("Room Pass = ", roomPass);
		logger.info("Length = ", roomPass.length);
		await this.roomsService.createRoom(
			req.session.playerId,
			roomName,
			roomPass,
			gameMode
		);
		res.status(200).json({ message: "create room success" });
	};
	updateRoom = async (req: Request, res: Response) => {};
	checkPlayerNum = async (req: Request, res: Response) => {};
	joinRoom = async (req: Request, res: Response) => {};
	deleteRoom = async (req: Request, res: Response) => {};
	roleChange = async (req: Request, res: Response) => {};
}
