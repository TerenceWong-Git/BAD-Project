import { Knex } from "knex";
import { InvalidInfoError } from "../utils/error";
import { checkPassword, hashPassword } from "../utils/hash";
// import { logger } from "../utils/logger";
import { table } from "../utils/table";
import { MatchesRecord, Player } from "./model";

export class PlayersService {
	constructor(private knex: Knex) {}

	async dummy() {
		const result = await this.knex();
		return result;
	}

	async checkRegister(name: string, email: string, password: string) {
		// logger.info(`This is email from service ${email}`);
		// logger.info(`This is password from service ${password}`);
		// logger.info(`This is table ${table.PLAYERS}`);
		const player = await this.knex<Player>(table.PLAYERS)
			.where("email", "=", email)
			.first(["id", "name", "email", "password"]);
		if (!player) {
			password = await hashPassword(password);
			// logger.info(`hashed = ${password}`);
			const insertData = { name, email, password };
			const result = await this.knex(table.PLAYERS)
				.insert(insertData)
				.returning("id");
			// logger.info(result instanceof Array);
			// logger.info(Object.keys(result[0]));
			return result[0].id;
		}
	}

	async checkLogin(email: string, password: string) {
		const player = await this.knex<Player>(table.PLAYERS)
			.where("email", "=", email)
			.first(["id", "email", "password"]);

		if (player && (await checkPassword(password, player.password))) {
			return player;
		}
		throw new InvalidInfoError();
	}
	async showProfile(id: number | undefined) {
		const player = await this.knex<Player>(table.PLAYERS)
			.where("id", id)
			.first(["name", "email", "image", "age", "gender"]);
		return player;
	}
	async updateProfile(
		id: number | undefined,
		name: string,
		email: string,
		image: string,
		age: number,
		gender: number
	) {
		const player = await this.knex<{ id: number }[] | { id: number } | Player>(
			table.PLAYERS
		)
			.where("id", id)
			.update(
				{
					name: name,
					email: email,
					image: image,
					age: age,
					gender: gender
				},
				"id"
			);
		return player[0];
	}
	async individualRanking(id: number | undefined) {
		const result = await this.knex<MatchesRecord>(table.MATCHES_RECORD)
			.select([
				"id",
				"players_id",
				"points",
				"matches_live_id",
				"played_at"
			])
			.where("players_id", id)
			.orderBy("points", "desc")
			.limit(5);
		return result;
	}
	async getRanking() {
		const result = await this.knex<MatchesRecord>(table.MATCHES_RECORD)
			.select([
				"matches_record.id",
				"matches_record.players_id",
				"players.name",
				"matches_record.points",
				"matches_record.matches_live_id",
				"matches_record.played_at"
			])
			.innerJoin(table.PLAYERS, "matches_record.players_id", "players.id")
			.orderBy("points", "desc")
			.limit(5);
		return result;
	}
}
