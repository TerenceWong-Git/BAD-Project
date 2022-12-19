import { Knex } from "knex";
import { MatchesRecord } from "../service/model";
import { table } from "../utils/table";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(table.ROOMS).del();
	await knex(table.MATCHES_LIVE).del();
	await knex(table.MATCHES_RECORD).del();

	// Inserts seed entries
	const trx = await knex.transaction();
	try {
		const roomData = [
			{
				id: 1,
				name: "Bassariscus astutus",
				password: "twehKPIc4lV",
				game_mode_id: 0
			},
			{
				id: 2,
				name: "Camelus dromedarius",
				password: "3d4Vob",
				game_mode_id: 0
			},
			{
				id: 3,
				name: "Odocoileus hemionus",
				password: "UReY60",
				game_mode_id: 1
			},
			{
				id: 4,
				name: "Dasypus novemcinctus",
				password: "W2Z6ek13j5",
				game_mode_id: 1
			},
			{
				id: 5,
				name: "Gazella granti",
				password: "6cUVKosrC",
				game_mode_id: 1
			},
			{
				id: 6,
				name: "Centrocercus urophasianus",
				password: "F8iWiXC5",
				game_mode_id: 0
			},
			{
				id: 7,
				name: "Agkistrodon piscivorus",
				password: "4ecxLwlUYirF",
				game_mode_id: 1
			},
			{
				id: 8,
				name: "Oncorhynchus nerka",
				password: "fuiZCBx09x",
				game_mode_id: 1
			},
			{
				id: 9,
				name: "Bettongia penicillata",
				password: "gvYWfcNcr",
				game_mode_id: 0
			},
			{
				id: 10,
				name: "Centrocercus urophasianus",
				password: "RPznznzx90",
				game_mode_id: 0
			},
			{
				id: 11,
				name: "Leprocaulinus vipera",
				password: "46nqKdHSzb9",
				game_mode_id: 1
			},
			{
				id: 12,
				name: "Procyon cancrivorus",
				password: "wpTbxA",
				game_mode_id: 1
			},
			{
				id: 13,
				name: "Pitangus sulphuratus",
				password: "MWhDC7",
				game_mode_id: 1
			},
			{
				id: 14,
				name: "Isoodon obesulus",
				password: "QUVNpMW",
				game_mode_id: 1
			},
			{
				id: 15,
				name: "Lycaon pictus",
				password: "mp6AnH52",
				game_mode_id: 0
			},
			{
				id: 16,
				name: "Dusicyon thous",
				password: "Rx98dYtpoK5",
				game_mode_id: 1
			},
			{
				id: 17,
				name: "Oncorhynchus nerka",
				password: "kI13TL0NcNvW",
				game_mode_id: 1
			},
			{
				id: 18,
				name: "Bos frontalis",
				password: "NOACuopEc",
				game_mode_id: 1
			},
			{
				id: 19,
				name: "Haematopus ater",
				password: "YSUKAZfu",
				game_mode_id: 1
			},
			{
				id: 20,
				name: "Larus fuliginosus",
				password: "NLVYZTi6",
				game_mode_id: 0
			}
		];
		const RoomId = await trx(table.ROOMS).insert(roomData).returning("id");
		const MatchId = await trx(table.MATCHES_LIVE)
			.insert([
				{
					id: 1,
					rooms_id: RoomId[0],
					players_id: 0,
					is_spectator: false,
					is_host: true
				},
				{
					id: 2,
					rooms_id: RoomId[1],
					players_id: 0,
					is_spectator: false,
					is_host: true
				},
				{
					id: 3,
					rooms_id: RoomId[2],
					players_id: 2,
					is_spectator: false,
					is_host: true
				},
				{
					id: 4,
					rooms_id: RoomId[3],
					players_id: 2,
					is_spectator: false,
					is_host: true
				},
				{
					id: 5,
					rooms_id: RoomId[4],
					players_id: 2,
					is_spectator: false,
					is_host: true
				},
				{
					id: 6,
					rooms_id: RoomId[5],
					players_id: 1,
					is_spectator: false,
					is_host: true
				},
				{
					id: 7,
					rooms_id: RoomId[6],
					players_id: 1,
					is_spectator: false,
					is_host: true
				},
				{
					id: 8,
					rooms_id: RoomId[7],
					players_id: 2,
					is_spectator: false,
					is_host: true
				},
				{
					id: 9,
					rooms_id: RoomId[8],
					players_id: 1,
					is_spectator: false,
					is_host: true
				},
				{
					id: 10,
					rooms_id: RoomId[9],
					players_id: 2,
					is_spectator: false,
					is_host: true
				},
				{
					id: 11,
					rooms_id: RoomId[10],
					players_id: 1,
					is_spectator: false,
					is_host: true
				},
				{
					id: 12,
					rooms_id: RoomId[11],
					players_id: 0,
					is_spectator: false,
					is_host: true
				},
				{
					id: 13,
					rooms_id: RoomId[12],
					players_id: 0,
					is_spectator: false,
					is_host: true
				},
				{
					id: 14,
					rooms_id: RoomId[13],
					players_id: 2,
					is_spectator: false,
					is_host: true
				},
				{
					id: 15,
					rooms_id: RoomId[14],
					players_id: 0,
					is_spectator: false,
					is_host: true
				},
				{
					id: 16,
					rooms_id: RoomId[15],
					players_id: 0,
					is_spectator: false,
					is_host: true
				},
				{
					id: 17,
					rooms_id: RoomId[16],
					players_id: 1,
					is_spectator: false,
					is_host: true
				},
				{
					id: 18,
					rooms_id: RoomId[17],
					players_id: 2,
					is_spectator: false,
					is_host: true
				},
				{
					id: 19,
					rooms_id: RoomId[18],
					players_id: 1,
					is_spectator: false,
					is_host: true
				},
				{
					id: 20,
					rooms_id: RoomId[19],
					players_id: 0,
					is_spectator: false,
					is_host: true
				}
			])
			.returning("id");
		await trx<MatchesRecord>(table.MATCHES_RECORD).insert([
			{
				id: 1,
				player_id: 0,
				points: 1456,
				matches_live_id: MatchId[0]
			},
			{
				id: 2,
				player_id: 2,
				points: 1730,
				matches_live_id: MatchId[1]
			},
			{
				id: 3,
				player_id: 1,
				points: 998,
				matches_live_id: MatchId[2]
			},
			{
				id: 4,
				player_id: 2,
				points: 1782,
				matches_live_id: MatchId[3]
			},
			{
				id: 5,
				player_id: 2,
				points: 1003,
				matches_live_id: MatchId[4]
			},
			{
				id: 6,
				player_id: 1,
				points: 358,
				matches_live_id: MatchId[5]
			},
			{
				id: 7,
				player_id: 2,
				points: 732,
				matches_live_id: MatchId[6]
			},
			{
				id: 8,
				player_id: 2,
				points: 568,
				matches_live_id: MatchId[7]
			},
			{
				id: 9,
				player_id: 0,
				points: 1977,
				matches_live_id: MatchId[8]
			},
			{
				id: 10,
				player_id: 2,
				points: 1110,
				matches_live_id: MatchId[9]
			},
			{
				id: 11,
				player_id: 1,
				points: 604,
				matches_live_id: MatchId[10]
			},
			{
				id: 12,
				player_id: 0,
				points: 1429,
				matches_live_id: MatchId[11]
			},
			{
				id: 13,
				player_id: 1,
				points: 784,
				matches_live_id: MatchId[12]
			},
			{
				id: 14,
				player_id: 2,
				points: 1662,
				matches_live_id: MatchId[13]
			},
			{
				id: 15,
				player_id: 0,
				points: 1591,
				matches_live_id: MatchId[14]
			},
			{
				id: 16,
				player_id: 0,
				points: 1415,
				matches_live_id: MatchId[15]
			},
			{
				id: 17,
				player_id: 1,
				points: 1978,
				matches_live_id: MatchId[16]
			},
			{
				id: 18,
				player_id: 1,
				points: 501,
				matches_live_id: MatchId[17]
			},
			{
				id: 19,
				player_id: 0,
				points: 334,
				matches_live_id: MatchId[18]
			},
			{
				id: 20,
				player_id: 2,
				points: 998,
				matches_live_id: MatchId[19]
			}
		]);
		await trx.commit();
	} catch (err) {
		await trx.rollback();
	}
}
