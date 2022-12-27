import { ApplicationError, InternalServerError } from "./error";
import type { Request, Response, NextFunction } from "express";
import { logger } from "./logger";

export type AsyncRouterHandler = (req: Request, res: Response) => Promise<void>;

export const asyncWrapper =
	(routeHandler: AsyncRouterHandler) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await routeHandler(req, res);
		} catch (err) {
			logger.info("wrapper");
			logger.info((err as any).message);
			if (err instanceof ApplicationError) {
				next(err);
			}
			next(new InternalServerError());
		}
	};
