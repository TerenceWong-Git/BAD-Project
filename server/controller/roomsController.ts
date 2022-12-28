import type { Request, Response } from "express";
import { RoomsService } from "../service/roomsService";

export class RoomsController {
	constructor(private roomsService: RoomsService) {}

	createRoom = async (req: Request, res: Response) => {
		const gameMode = +req.params.game;
		const roomName = Math.random().toString(32).slice(2, 12);
		const roomPass = Math.random().toString().slice(2, 10);
		const result = await this.roomsService.createRoom(
			req.session.playerId!,
			roomName,
			roomPass,
			gameMode
		);
		req.session.matchLiveId = result.matches_live_id;
		res.status(200).json(result);
	};

	updateRoom = async (req: Request, res: Response) => {
		const roomId = parseInt(req.params.room);
		const gameMode = parseInt(req.params.game);
		const { roomName, roomPass } = req.body;
		await this.roomsService.updateRoom(roomId, roomName, roomPass, gameMode);
		res.status(200).json({ message: "update success" });
	};

	checkPlayerNum = async (_req: Request, _res: Response) => {};
	joinRoom = async (_req: Request, _res: Response) => {};
	deleteRoom = async (_req: Request, _res: Response) => {};
	roleChange = async (_req: Request, _res: Response) => {};
}
