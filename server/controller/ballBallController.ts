import type { Request, Response } from "express";
import { BallBallService } from "../service/ballBallService";

export class BallBallController {
	constructor(private ballBallService: BallBallService) {}
	dummy = async (_req: Request, res: Response) => {
		const data = await this.ballBallService.dummy();
		res.json(data);
	};
}
