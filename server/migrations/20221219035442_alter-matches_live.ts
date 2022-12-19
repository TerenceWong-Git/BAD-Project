import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table("matches_live", (table) => {
		table.boolean("is_host").notNullable();
	});
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table("matches_live", (table) => {
		table.dropColumn("is_host");
	});
}

