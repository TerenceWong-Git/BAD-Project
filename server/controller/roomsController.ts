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
		const gameMode = parseInt(req.params.game);
		const roomName = Math.random().toString(32).slice(2, 12);
		logger.info("Room Name = ", roomName);
		logger.info("Length = ", roomName.length);
		const roomPass = Math.random().toString().slice(2, 10);
		logger.info("Room Pass = ", roomPass);
		logger.info("Length = ", roomPass.length);
		const result = await this.roomsService.createRoom(
			req.session.playerId,
			roomName,
			roomPass,
			gameMode
		);
		logger.info("room id is ", result?.rooms_id);
		logger.info("match id is ", result?.matches_live_id);
		res.status(200).json(result);
	};
	updateRoom = async (req: Request, res: Response) => {
		const roomId = parseInt(req.params.room);
		const gameMode = parseInt(req.params.game);
		const { roomName, roomPass } = req.body;
		await this.roomsService.updateRoom(roomId, roomName, roomPass, gameMode);
		res.status(200).json({ message: "update success" });
	};
	checkPlayerNum = async (req: Request, res: Response) => {
		// select * from matchlive where room id
		// if row count >2 => is spectator = true
	};
	joinRoom = async (req: Request, res: Response) => {};
	deleteRoom = async (req: Request, res: Response) => {};
	roleChange = async (req: Request, res: Response) => {};
}
