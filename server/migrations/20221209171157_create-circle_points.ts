import { Knex } from "knex";
import { table } from "../utils/table";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(table.CIRCLE_POINTS, (table) => {
		table.increments();
		table.string("color").notNullable();
		table.string("size").notNullable();
		table.integer("points").notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable(table.CIRCLE_POINTS);
}
