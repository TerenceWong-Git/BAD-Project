import { Knex } from "knex";
import { table } from "../utils/table";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(table.GAME_MODE, (table) => {
		table.increments();
		table.string("name").notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable(table.GAME_MODE);
}
