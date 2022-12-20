import { Knex } from "knex";
import { table } from "../utils/table";

export class BallBallService {
	constructor(private knex: Knex) {}

	async dummy() {
		const result = await this.knex();
		return result;
	}
	async providePoints(
		players_id: number,
		points: number,
		matches_live_id: number
	) {
		const importResult = { players_id, points, matches_live_id };
		const resultOfTheGame = await this.knex(table.MATCHES_RECORD).insert(
			importResult
		);
		return resultOfTheGame;
	}
}
