import { Knex } from "knex";
import { table } from "../utils/table";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(table.MATCHES_RECORD, (table) => {
		table.dropColumn("game_mode_id");
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(table.MATCHES_RECORD, (table) => {
		table.integer("game_mode_id").unsigned();
		table.foreign("game_mode_id").references("game_mode.id");
	});
}
