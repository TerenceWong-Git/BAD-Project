import type { Request, Response } from "express";
// import { Player } from "../service/model";
import { PlayersService } from "../service/playersService";
import { InvalidInfoError } from "../utils/error";
import { logger } from "../utils/logger";

export class PlayersController {
	constructor(private playersService: PlayersService) {}
	dummy = async (req: Request, res: Response) => {
		const data = await this.playersService.dummy();
		res.json(data);
	};
	register = async (req: Request, res: Response) => {
		const { name, email, password } = req.body;
		console.log("name = ", name);
		console.log("email = ", email);
		console.log("password = ", password);
		if (!email || !password) {
			throw new InvalidInfoError();
		}
		const id = await this.playersService.checkExistingAcc(email, password);
		logger.info("hello", { message: `This is player ${id}` });
		req.session.playerId = id;
		logger.info(req.session.playerId);
		res.json({ message: "success" });
	};
	login = async (req: Request, res: Response) => {};
}
