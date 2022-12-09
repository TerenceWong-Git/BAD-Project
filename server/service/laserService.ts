import { Knex } from "knex";

export class LaserService {
	constructor(private knex: Knex) {}

	async dummy() {
		const result = await this.knex();
		return result;
	}
}
