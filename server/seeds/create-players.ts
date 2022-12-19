import { Knex } from "knex";
import { table } from "../utils/table";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(table.PLAYERS).del();

	// Inserts seed entries
	await knex(table.PLAYERS).insert([
		{
			email: "alex@tecky.io",
			password: "$2a$10$pn4/K78nHhJ38yWjog.JzuYD7QnH24/fFEEGhucG0g1.2QnfKXWTO"
		},
		// alex plain pass: alex
		{
			email: "abc@tecky.io",
			password: "$2a$10$CWCmcnQLFEf55nTz874XBOSsUsL38NRhFzLr3XE6N0MnpsTN.dZfy"
		},
		// abc plain pass: abcabc
		{
			email: "david@abc.io",
			password: "$2a$10$ROmT3whmNSF9uZjwGLgm1.awlUtmUj3mdOi9QnVIiznp0kB6DyzD2"
		}
		// david plain pass: david
	]);
}
