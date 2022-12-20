import type { Request, Response } from "express";
import { BallBallService } from "../service/ballBallService";

export class BallBallController {
	constructor(private ballBallService: BallBallService) {}
	dummy = async (_req: Request, res: Response) => {
		const data = await this.ballBallService.dummy();
		res.json(data);
	};
	providePoints = async (req: Request, res: Response) => {
		const { players_id, points, matches_live_id } = req.body;
		const id = await this.ballBallService.providePoints(
			players_id,
			points,
			matches_live_id
		);
		res.status(201).json({ id });
	};
}
