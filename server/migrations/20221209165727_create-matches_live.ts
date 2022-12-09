import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable("matches_live", (table) => {
		table.increments();
		table.integer("rooms_id").unsigned();
		table.foreign("rooms_id").references("rooms.id");
		table.integer("players_id").unsigned();
		table.foreign("players_id").references("players.id");
		table.boolean("is_spectator").notNullable();
		table.timestamps(true, true);
	});
	await knex.schema.alterTable("matches_live", (table) => {
		table.renameColumn("updated_at", "ended_at");
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable("matches_live");
}
