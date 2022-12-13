import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("game_mode").del();

	// Inserts seed entries
	await knex("game_mode").insert([{ name: "reaction" }, { name: "laser" }]);
}
