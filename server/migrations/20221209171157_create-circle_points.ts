import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable("circle_points", (table) => {
		table.increments();
		table.string("color");
		table.string("size");
		table.integer("points");
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable("circle_points");
}
