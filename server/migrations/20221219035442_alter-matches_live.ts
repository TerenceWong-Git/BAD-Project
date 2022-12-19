import { Knex } from "knex";
import { table } from "../utils/table";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.table(table.MATCHES_LIVE, (table) => {
		table.boolean("is_host").notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.table(table.MATCHES_LIVE, (table) => {
		table.dropColumn("is_host");
	});
}
