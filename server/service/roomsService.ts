import { Knex } from "knex";
import { logger } from "../utils/logger";
import { table } from "../utils/table";

export class RoomsService {
	constructor(private knex: Knex) {}

	async dummy() {
		const result = await this.knex();
		return result;
	}

	async createRoom(
		playerId: number | undefined,
		name: string,
		pass: string,
		game_mode: number
	) {
		const newRoom = await this.knex.transaction();
		try {
			const rooms = await newRoom(table.ROOMS)
				.insert([{ name: name, password: pass, game_mode_id: game_mode }], "id")
				.transacting(newRoom);
			logger.info(rooms[0].id);

			const result = await newRoom(table.MATCHES_LIVE)
				.transacting(newRoom)
				.insert({
					rooms_id: rooms[0].id,
					players_id: playerId,
					is_spectator: false
				})
				.returning("id");

			await newRoom.commit();
			return result[0];
		} catch (e) {
			await newRoom.rollback();
			return;
		}
	}
}
