import type { Request, Response } from "express";
import { PlayersService } from "../service/playersService";
import { InternalServerError, InvalidInfoError } from "../utils/error";
export class PlayersController {
	constructor(private playersService: PlayersService) {}
	register = async (req: Request, res: Response) => {
		const { name, email, password } = req.body;
		let regex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
		if (!email || !password || !regex.test(email)) {
			throw new InvalidInfoError();
		}
		const id = await this.playersService.checkRegister(name, email, password);
		req.session.playerId = id;
		res.status(201).json({ message: "success" });
	};
	login = async (req: Request, res: Response) => {
		const { email, password } = req.body;
		if (!email || !password) {
			throw new InvalidInfoError();
		}
		const player = await this.playersService.checkLogin(email, password);
		req.session.playerId = player.id;
		res.status(200).json({ message: "success" });
	};
	logout = async (req: Request, res: Response) => {
		delete req.session.playerId;
		res.status(205).json({ message: "logout success" });
	};

	getProfile = async (req: Request, res: Response) => {
		const data = await this.playersService.showProfile(req.session.playerId);
		res.status(200).json(data);
	};
	updateProfile = async (req: Request, res: Response) => {
		const { name, email, age } = req.body;
		const result = await this.playersService.updateProfile(
			req.session.playerId,
			name,
			email,
<<<<<<< HEAD
			Number(age)
=======
			image,
			Number(age),
			Number(gender)
>>>>>>> b835112 (update match record seed for id issue)
		);
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
