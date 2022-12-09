import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable("rooms", (table) => {
		table.increments();
		table.string("name");
		table.string("password");
		table.integer("game_mode_id").unsigned();
		table.foreign("game_mode_id").references("game_mode.id");
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable("rooms");
}
