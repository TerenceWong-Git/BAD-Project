import { Knex } from "knex";
import { table } from "../utils/table";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(table.ROOMS, (table) => {
		table.increments();
		table.string("name").notNullable();
		table.string("password").notNullable();
		table.integer("game_mode_id").unsigned();
		table.foreign("game_mode_id").references("game_mode.id");
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable(table.ROOMS);
}
