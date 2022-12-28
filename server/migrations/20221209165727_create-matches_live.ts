import { Knex } from "knex";
import { table } from "../utils/table";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(table.MATCHES_LIVE, (table) => {
		table.increments();
		table.integer("rooms_id").unsigned();
		table.foreign("rooms_id").references("rooms.id");
		table.integer("players_id").unsigned();
		table.foreign("players_id").references("players.id");
		table.boolean("is_spectator").notNullable();
		table.timestamps(true, true);
		table.unique(["rooms_id", "players_id"]);
	});

	await knex.schema.alterTable(table.MATCHES_LIVE, (table) => {
		table.renameColumn("updated_at", "ended_at");
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable(table.MATCHES_LIVE);
}
