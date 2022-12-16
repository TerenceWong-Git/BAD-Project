import { PlayersService } from "../../service/playersService";
import Knex from "knex";
import knexConfig from "../../knexfile";
// import { v4 as uuidv4 } from "uuid";
import { Player } from "../../service/model";
import { table } from "../../utils/table";
import { checkPassword, hashPassword } from "../../utils/hash";

jest.mock("../../utils/hash");

const config = knexConfig["test"];
const knex = Knex(config);

describe("Testing for playersService", () => {
	let service: PlayersService;
	let playerIds: Array<number>;
	let accounts: { email: string; password: string }[] = [
		{ email: "alex@tecky.io", password: "alex" },
		{ email: "abc@tecky.io", password: "abcabc" },
		{ email: "david@abc.io", password: "david" }
	];
	let finalAccounts: { email: string; password: string }[] = JSON.parse(
		JSON.stringify(accounts)
	);
	let newPassword: string[] = [];
	for (let j = 0; j < accounts.length; j++) {
		newPassword.push(Math.random().toString(32).slice(2, 32));
	}
	let i: number = parseInt((Math.random() * 3).toString());

	beforeAll(async () => {
		await knex.schema.createTable(table.PLAYERS, (table) => {
			table.increments();
			table.string("name");
			table.string("email").notNullable();
			table.string("password").notNullable();
			table.string("image");
			table.integer("age");
			table.integer("gender");
			table.timestamps(true, true);
		});
		for (let j = 0; j < accounts.length; j++) {
			finalAccounts[j].password = newPassword[j];
		}
		playerIds = (
			await knex<Player>(table.PLAYERS).insert(finalAccounts, "id")
		).map((row) => row.id);

		// console.log(playerIds);
	});

	beforeEach(async () => {
		service = new PlayersService(knex);

		(checkPassword as jest.Mock).mockImplementation(() =>
			Promise.resolve(true)
		);
		(hashPassword as jest.Mock).mockImplementation(() =>
			Promise.resolve("IAmGod")
		);
	});

	it("Login should be success", async () => {
		const inputEmail = accounts[i].email;
		const hash = newPassword[i];
		const result = await service.checkLogin(inputEmail, hash);

		expect(result).toEqual({
			id: playerIds[i],
			email: inputEmail,
			password: newPassword[i]
		});
	});

	it("Register should be success", async () => {
		const inputName = "";
		const inputEmail = "peter@abc.com";
		const inputPassword = "12345678";
		const result = await service.checkRegister(
			inputName,
			inputEmail,
			inputPassword
		);

		expect(result).toEqual(finalAccounts.length + 1);
	});

	afterEach(async () => {
		// Removed inserted data to keep testing database clean
		await knex(table.PLAYERS).whereIn("id", playerIds).del();
	});
	afterAll(async () => {
		await knex.schema.dropTable(table.PLAYERS);
		await knex.destroy();
	});
});
