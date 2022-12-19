import { Knex } from "knex";
import { table } from "../utils/table";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(table.GAME_MODE).del();

	// Inserts seed entries
	await knex(table.GAME_MODE).insert([{ name: "reaction" }, { name: "laser" }]);
}
