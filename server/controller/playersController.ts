import type { Request, Response } from "express";
import { Player } from "../service/model";
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
		logger.info("name = ", name);
		logger.info("email = ", email);
		logger.info("password = ", password);
		if (!email || !password) {
			throw new InvalidInfoError();
		}
		const id = await this.playersService.checkRegister(email, password);
		logger.info("hello", { message: `This is player ${id}` });
		req.session.playerId = id;
		logger.info(req.session.playerId);
		res.json({ message: "success" });
	};
	login = async (req: Request, res: Response) => {
		const { email, password } = req.body;
		logger.info("email = ", email);
		logger.info("password = ", password);
		if (!email || !password) {
			throw new InvalidInfoError();
		}
		const player = await this.playersService.checkLogin(email, password);
		// logger.info("welcome back", player);
		req.session.playerId = player.id;
		logger.info(req.session.playerId);
		res.json({ message: "success" });
	};
	logout = async (req: Request, res: Response) => {
		delete req.session.playerId;
    	res.json({ message: "logout success" });
		// console.log(res.status);
	};

	getProfile = async (req: Request, res: Response) => {
		const data = await this.playersService.showProfile(req.session.playerId);
		return data;
	};
	updateProfile = async (req: Request, res: Response) => {
		const data: Player = req.body;
		await this.playersService.insertProfile(data);
		res.json({ message: "success" });
	};
}
