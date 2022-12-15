import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable("circle_points", (table) => {
		table.increments();
		table.string("color").notNullable();
		table.string("size").notNullable();
		table.integer("points").notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable("circle_points");
}
