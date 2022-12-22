import { Knex } from "knex";
import { GameMode, MatchesRecord } from "../service/model";
import { table } from "../utils/table";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(table.MATCHES_RECORD).del();
	await knex(table.MATCHES_LIVE).del();
	await knex(table.PLAYERS).del();
	await knex(table.ROOMS).del();
	await knex(table.GAME_MODE).del();

	// Inserts seed entries
	const trx = await knex.transaction();
	try {
		const GameModeId = (
			await trx<GameMode>(table.GAME_MODE)
				.insert([{ name: "reaction" }, { name: "laser" }])
				.returning("id")
				.transacting(trx)
		).map((row) => row.id);
		const roomData = [
			{
				name: "Bassariscus astutus",
				password: "twehKPIc4lV",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Camelus dromedarius",
				password: "3d4Vob",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Odocoileus hemionus",
				password: "UReY60",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Dasypus novemcinctus",
				password: "W2Z6ek13j5",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Gazella granti",
				password: "6cUVKosrC",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Centrocercus urophasianus",
				password: "F8iWiXC5",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Agkistrodon piscivorus",
				password: "4ecxLwlUYirF",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Oncorhynchus nerka",
				password: "fuiZCBx09x",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Bettongia penicillata",
				password: "gvYWfcNcr",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Centrocercus urophasianus",
				password: "RPznznzx90",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Leprocaulinus vipera",
				password: "46nqKdHSzb9",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Procyon cancrivorus",
				password: "wpTbxA",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Pitangus sulphuratus",
				password: "MWhDC7",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Isoodon obesulus",
				password: "QUVNpMW",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Lycaon pictus",
				password: "mp6AnH52",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Dusicyon thous",
				password: "Rx98dYtpoK5",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Oncorhynchus nerka",
				password: "kI13TL0NcNvW",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Bos frontalis",
				password: "NOACuopEc",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Haematopus ater",
				password: "YSUKAZfu",
				game_mode_id: GameModeId[0]
			},
			{
				name: "Larus fuliginosus",
				password: "NLVYZTi6",
				game_mode_id: GameModeId[0]
			}
		];
		const RoomId = (
			await trx(table.ROOMS).insert(roomData).returning("id").transacting(trx)
		).map((row) => row.id);
		const PlayerId = (
			await knex(table.PLAYERS)
				.insert([
					{
						name: "alex",
						email: "alex@tecky.io",
						password:
							"$2a$10$pn4/K78nHhJ38yWjog.JzuYD7QnH24/fFEEGhucG0g1.2QnfKXWTO",
						age: 20,
						gender: 0
					},
					// alex plain pass: alex
					{
						name: "abc",
						email: "abc@tecky.io",
						password:
							"$2a$10$CWCmcnQLFEf55nTz874XBOSsUsL38NRhFzLr3XE6N0MnpsTN.dZfy",
						age: 17,
						gender: 1
					},
					// abc plain pass: abcabc
					{
						name: "david",
						email: "david@abc.io",
						password:
							"$2a$10$ROmT3whmNSF9uZjwGLgm1.awlUtmUj3mdOi9QnVIiznp0kB6DyzD2",
						age: 30,
						gender: 0
					}
					// david plain pass: david
				])
				.returning("id")
				.transacting(trx)
		).map((row) => row.id);
		const MatchId = (
			await trx(table.MATCHES_LIVE)
				.insert([
					{
						rooms_id: RoomId[0],
						players_id: PlayerId[0],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[1],
						players_id: PlayerId[0],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[2],
						players_id: PlayerId[2],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[3],
						players_id: PlayerId[2],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[4],
						players_id: PlayerId[2],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[5],
						players_id: PlayerId[1],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[6],
						players_id: PlayerId[1],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[7],
						players_id: PlayerId[2],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[8],
						players_id: PlayerId[1],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[9],
						players_id: PlayerId[2],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[10],
						players_id: PlayerId[1],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[11],
						players_id: PlayerId[0],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[12],
						players_id: PlayerId[0],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[13],
						players_id: PlayerId[2],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[14],
						players_id: PlayerId[0],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[15],
						players_id: PlayerId[0],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[16],
						players_id: PlayerId[1],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[17],
						players_id: PlayerId[2],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[18],
						players_id: PlayerId[1],
						is_spectator: false,
						is_host: true
					},
					{
						rooms_id: RoomId[19],
						players_id: PlayerId[0],
						is_spectator: false,
						is_host: true
					}
				])
				.returning("id")
				.transacting(trx)
		).map((row) => row.id);
		await trx<MatchesRecord>(table.MATCHES_RECORD)
			.insert([
				{
					players_id: PlayerId[0],
					points: 1456,
					matches_live_id: MatchId[0]
				},
				{
					players_id: PlayerId[2],
					points: 1730,
					matches_live_id: MatchId[1]
				},
				{
					players_id: PlayerId[1],
					points: 998,
					matches_live_id: MatchId[2]
				},
				{
					players_id: PlayerId[2],
					points: 1782,
					matches_live_id: MatchId[3]
				},
				{
					players_id: PlayerId[2],
					points: 1003,
					matches_live_id: MatchId[4]
				},
				{
					players_id: PlayerId[1],
					points: 358,
					matches_live_id: MatchId[5]
				},
				{
					players_id: PlayerId[2],
					points: 732,
					matches_live_id: MatchId[6]
				},
				{
					players_id: PlayerId[2],
					points: 568,
					matches_live_id: MatchId[7]
				},
				{
					players_id: PlayerId[0],
					points: 1977,
					matches_live_id: MatchId[8]
				},
				{
					players_id: PlayerId[2],
					points: 1110,
					matches_live_id: MatchId[9]
				},
				{
					players_id: PlayerId[1],
					points: 604,
					matches_live_id: MatchId[10]
				},
				{
					players_id: PlayerId[0],
					points: 1429,
					matches_live_id: MatchId[11]
				},
				{
					players_id: PlayerId[1],
					points: 784,
					matches_live_id: MatchId[12]
				},
				{
					players_id: PlayerId[2],
					points: 1662,
					matches_live_id: MatchId[13]
				},
				{
					players_id: PlayerId[0],
					points: 1591,
					matches_live_id: MatchId[14]
				},
				{
					players_id: PlayerId[0],
					points: 1415,
					matches_live_id: MatchId[15]
				},
				{
					players_id: PlayerId[1],
					points: 1978,
					matches_live_id: MatchId[16]
				},
				{
					players_id: PlayerId[1],
					points: 501,
					matches_live_id: MatchId[17]
				},
				{
					players_id: PlayerId[0],
					points: 334,
					matches_live_id: MatchId[18]
				},
				{
					players_id: PlayerId[2],
					points: 998,
					matches_live_id: MatchId[19]
				}
			])
			.transacting(trx);
		await trx.commit();
	} catch (err) {
		await trx.rollback();
		console.log(err);
		throw err;
	}
}
