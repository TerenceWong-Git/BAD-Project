import { Knex } from "knex";

export class BallBallService {
	constructor(private knex: Knex) {}

	async dummy() {
		const result = await this.knex();
		return result;
	}
}
