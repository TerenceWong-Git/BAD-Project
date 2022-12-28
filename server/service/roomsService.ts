import { Knex } from "knex";
import { logger } from "../utils/logger";
import { table } from "../utils/table";
import { MatchesLive, Room, RoomMatch } from "./model";

export class RoomsService {
	constructor(private knex: Knex) {}

	async createRoom(
		playerId: number,
		name: string,
		pass: string,
		game_mode: number
	) {
		const newRoom = await this.knex.transaction();
		try {
			const rooms = await newRoom<Room>(table.ROOMS).insert(
				{ name: name, password: pass, game_mode_id: game_mode },
				"id"
			);
			logger.info(rooms[0].id);

			const match = await newRoom<MatchesLive>(table.MATCHES_LIVE).insert(
				{
					rooms_id: rooms[0].id,
					players_id: playerId,
					is_spectator: false,
					is_host: true
				},
				"id"
			);

			const result: RoomMatch = {
				rooms_id: rooms[0].id,
				matches_live_id: match[0].id
			};

			await newRoom.commit();
			return result;
		} catch (e) {
			await newRoom.rollback();
			throw e;
		}
	}
	async updateRoom(id: number, name: string, pass: string, mode: number) {
		await this.knex<Room>(table.ROOMS)
			.update({ id: id, name: name, password: pass, game_mode_id: mode })
			.where("id", id);
	}
}
