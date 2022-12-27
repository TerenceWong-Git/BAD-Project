import type { Request, Response } from "express";
import { RoomsService } from "../service/roomsService";
import { logger } from "../utils/logger";

export class RoomsController {
	constructor(private roomsService: RoomsService) {}
	createRoom = async (req: Request, res: Response) => {
		const gameMode = req.params.game;
		console.log(gameMode);
		const roomName = Math.random().toString(32).slice(2, 12);
		const roomPass = Math.random().toString().slice(2, 10);
		const result = await this.roomsService.createRoom(
			req.session.playerId,
			roomName,
			roomPass,
			Number(gameMode)
		);
		console.log(result);
		req.session.matchLiveId = result.matches_live_id;
		res.status(200).json(result);
	};
}
