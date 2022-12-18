import type { Request, Response } from "express";
import { Player } from "../service/model";
import { PlayersService } from "../service/playersService";
import { InternalServerError, InvalidInfoError } from "../utils/error";
// import { logger } from "../utils/logger";

export class PlayersController {
	constructor(private playersService: PlayersService) {}
	dummy = async (_req: Request, res: Response) => {
		const data = await this.playersService.dummy();
		res.json(data);
	};
	register = async (req: Request, res: Response) => {
		const { name, email, password } = req.body;
		// logger.info("name = ", name);
		// logger.info("email = ", email);
		// logger.info("password = ", password);
		let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
		if (!email || !password || !regex.test(email)) {
			throw new InvalidInfoError();
		}
		const id = await this.playersService.checkRegister(name, email, password);
		// logger.info("hello", { message: `This is player ${id}` });
		req.session.playerId = id;
		// logger.info(req.session.playerId);
		res.status(201).json({ message: "success" });
	};
	login = async (req: Request, res: Response) => {
		const { email, password } = req.body;
		// logger.info("email = ", email);
		// logger.info("password = ", password);
		if (!email || !password) {
			throw new InvalidInfoError();
		}
		const player = await this.playersService.checkLogin(email, password);
		// logger.info(player);
		req.session.playerId = player.id;
		// logger.info(req.session.playerId);
		res.status(200).json({ message: "success" });
	};
	logout = async (req: Request, res: Response) => {
		delete req.session.playerId;
		res.status(205).json({ message: "logout success" });
		// console.log(res.status);
	};

	getProfile = async (req: Request, res: Response) => {
		const data = await this.playersService.showProfile(req.session.playerId);
		res.status(200).json(data);
	};
	updateProfile = async (req: Request, res: Response) => {
		const data: Player = req.body;
		const result = await this.playersService.updateProfile(data);
		if (!result) {
			throw new InternalServerError();
		}
		res.status(200).json({ message: "success" });
	};
	checkLoggedInAPI = async (req: Request, res: Response) => {
		if (req.session.playerId) {
			res.status(200).json({ isLoggedIn: true });
		}
	};
	individualRanking = async (req: Request, res: Response) => {
		const player = req.session.playerId;
		const data = await this.playersService.individualRanking(player);
		res.status(200).json(data);
	};
	getRanking = async (_req: Request, res: Response) => {
		const data = await this.playersService.getRanking();
		res.status(200).json(data);
	};
}
