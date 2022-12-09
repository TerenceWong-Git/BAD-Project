import { Knex } from "knex";

export class PlayersService {
	constructor(private knex: Knex) {}

	async dummy() {
		const result = await this.knex();
		return result;
	}
}
