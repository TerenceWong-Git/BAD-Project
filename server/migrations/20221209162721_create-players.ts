import { Knex } from "knex";
import { table } from "../utils/table";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(table.PLAYERS, (table) => {
		table.increments();
		table.string("name");
		table.string("email").notNullable().unique();
		table.string("password").notNullable();
		table.string("image");
		table.integer("age").unsigned();
		table.integer("gender"); // Boolean
		table.timestamps(true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable(table.PLAYERS);
}
