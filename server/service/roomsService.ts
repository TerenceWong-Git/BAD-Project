import { Knex } from "knex";

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
			const rooms = await newRoom
				.insert([{ name: name, password: pass, game_mode_id: game_mode }])
				.into("room")
				.returning("id")
				.transacting(newRoom);

			const result = await newRoom
				.insert({
					rooms_id: rooms[0].id,
					players_id: playerId,
					is_spectator: false
				})
				.into("matches_live")
				.returning("id");

			await newRoom.commit();
			return result[0];
		} catch (e) {
			await newRoom.rollback();
			return;
		}
	}
}
