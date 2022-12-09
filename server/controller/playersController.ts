import type { Request, Response } from "express";
import { PlayersService } from "../service/playersService";

export class PlayersController {
	constructor(private playersService: PlayersService) {}
	dummy = async (req: Request, res: Response) => {
		const data = await this.playersService.dummy();
		res.json(data);
	};
}
