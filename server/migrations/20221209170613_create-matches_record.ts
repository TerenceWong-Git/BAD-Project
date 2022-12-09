import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable("matches_record", (table) => {
		table.increments();
		table.integer("players_id").unsigned();
		table.foreign("players_id").references("players.id");
		table.integer("points").notNullable();
		table.integer("game_mode_id").unsigned();
		table.foreign("game_mode_id").references("game_mode.id");
		table.integer("matches_live_id").unsigned();
		table.foreign("matches_live_id").references("matches_live.id");
		table.timestamp("played_at");
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable("matches_record");
}
