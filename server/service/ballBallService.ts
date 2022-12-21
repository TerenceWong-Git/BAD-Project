import { Knex } from "knex";
import { table } from "../utils/table";

export class BallBallService {
	constructor(private knex: Knex) {}
	async providePoints(
		points: number,
		players_id: number | undefined,
		matches_live_id: number
	) {
		const importResult = { points, players_id, matches_live_id };
		const resultOfTheGame = await this.knex(table.MATCHES_RECORD).insert(
			importResult,"points"
		);
		return resultOfTheGame;
	}
}
