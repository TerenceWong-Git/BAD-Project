import { Knex } from "knex";
// import { AccountExistError } from "../utils/error";
import { hashPassword } from "../utils/hash";
import { logger } from "../utils/logger";
import { table } from "../utils/table";
import { Player } from "./model";

export class PlayersService {
	constructor(private knex: Knex) {}

	async dummy() {
		const result = await this.knex();
		return result;
	}

	async checkExistingAcc(email: string, password: string) {
		logger.info(`This is email from service ${email}`);
		logger.info(`This is password from service ${password}`);
		logger.info(`This is table ${table.PLAYERS}`);
		// email = `'${email}'`;
		const player = await this.knex<Player>(table.PLAYERS)
			.where("email", "=", email)
			.select(["id", "name", "email", "password"])
			.first();
		// logger.info(`This is player from service ${player}`);
		if (!player) {
			password = await hashPassword(password);
			logger.info(`hashed = ${password}`);
			const insertData = { email, password };
			const result = await this.knex(table.PLAYERS)
				.insert(insertData)
				// .onConflict("email")
				// .ignore()
				.returning("id");
			logger.info(result instanceof Array);
			logger.info(Object.keys(result[0]));
			return result[0].id;
		}
		// throw new AccountExistError();
	}
}
