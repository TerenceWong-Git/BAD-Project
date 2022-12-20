import type { Request, Response } from "express";
import { LaserService } from "../service/laserService";

export class LaserController {
	constructor(private laserService: LaserService) {}
	dummy = async (_req: Request, res: Response) => {
		const data = await this.laserService.dummy();
		res.json(data);
	};
}
