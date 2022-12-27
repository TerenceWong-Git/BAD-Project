import type { Request, Response } from "express";
import { RoomsService } from "../service/roomsService";
import { logger } from "../utils/logger";

export class RoomsController {
	constructor(private roomsService: RoomsService) {}
	createRoom = async (req: Request, res: Response) => {
		const gameMode = req.params.game;
		const roomName = Math.random().toString(32).slice(2, 12);
		logger.info(roomName);
		const roomPass = Math.random().toString().slice(2, 10);
		logger.info(roomPass);
		const result = await this.roomsService.createRoom(
			req.session.playerId,
			roomName,
			roomPass,
			Number(gameMode)
		);
		req.session.matchLiveId = result.matches_live_id;
		logger.info(req.session.matchLiveId);
		res.status(200).json(result);
	};
	updateRoom = async (req: Request, res: Response) => {
		const roomId = parseInt(req.params.room);
		const gameMode = parseInt(req.params.game);
		const { roomName, roomPass } = req.body;
		await this.roomsService.updateRoom(roomId, roomName, roomPass, gameMode);
		res.status(200).json({ message: "update success" });
	};
	checkPlayerNum = async (_req: Request, _res: Response) => {
		// select * from matchlive where room id
		// if row count >2 => is spectator = true
	};
	joinRoom = async (_req: Request, _res: Response) => {};
	deleteRoom = async (_req: Request, _res: Response) => {};
	roleChange = async (_req: Request, _res: Response) => {};
}
