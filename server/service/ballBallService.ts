import { Knex } from "knex";
import { table } from "../utils/table";
import { MatchesRecord } from "./model";

export class BallBallService {
	constructor(private knex: Knex) {}
	async providePoints(
		points: number,
		players_id: number | undefined,
		matches_live_id: number
	) {
		const importResult = { points, players_id, matches_live_id };
		const resultOfTheGame = await this.knex<MatchesRecord>(
			table.MATCHES_RECORD
		).insert(importResult, "points");
		return resultOfTheGame;
	}
	async getPoints(id: number | undefined) {
		const data = await this.knex(table.MATCHES_RECORD)
			.first("points")
			.where("matches_live_id", id);
		return data;
	}
}
