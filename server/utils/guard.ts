import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "./error";

export const isLoggedInAPI = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.session.playerId) {
		throw new UnauthorizedError();
	}
	next();
};

export const isLoggedInStatic = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.session.playerId) {
		res.redirect("/playerLogin.html");
		return;
	}
	next();
};

export const isMatchIdAPI = (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	if (req.session.matchLiveId !== req.query.matchId) {
		throw new UnauthorizedError();
	}
	next();
};

export const isMatchIdStatic = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log("this is match 1 ", typeof req.session.matchLiveId);
	console.log("this is match 2 ", typeof req.query.matchId);
	if (req.session.matchLiveId !== Number(req.query.matchId)) {
		res.redirect("/playerMainPage.html");
		return;
	}
	next();
};
