import type { Request, Response } from "express";
import { BallBallService } from "../service/ballBallService";
import { logger } from "../utils/logger";

export class BallBallController {
	constructor(private ballBallService: BallBallService) {}
	providePoints = async (req: Request, res: Response) => {
		const { points, matches_live_id } = req.body;
		const player = req.session.playerId;
		logger.info(points);
		logger.info(matches_live_id);
		const result = await this.ballBallService.providePoints(
			points,
			player,
			matches_live_id
		);
		delete req.session.matchLiveId;
		logger.info(matches_live_id);
		res.status(201).json(result);
	};
}
