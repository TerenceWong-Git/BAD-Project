import { PlayersService } from "../../service/playersService";
import Knex from "knex";
import knexConfig from "../../knexfile";
// import { v4 as uuidv4 } from "uuid";
import { Player } from "../../service/model";
import { table } from "../../utils/table";
import { checkPassword, hashPassword } from "../../utils/hash";
// import { InvalidInfoError } from "../../utils/error";

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
	let i: number = parseInt((Math.random() * accounts.length).toString());

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
	});

	beforeEach(async () => {
		service = new PlayersService(knex);

		(checkPassword as jest.Mock).mockImplementation(() =>
			Promise.resolve(true)
		);
		(hashPassword as jest.Mock).mockImplementation(() =>
			Promise.resolve(finalAccounts[i].password)
		);
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
		playerIds.push(playerIds.length + 1);
		newPassword.push(Math.random().toString(32).slice(2, 32));

		expect(result).toEqual(finalAccounts.length + 1);
	});

	it("Register should be fail - player exist in DB", async () => {
		const inputName = "happyGuy";
		const inputEmail = "alex@tecky.io";
		const inputPassword = "";
		const result = await service.checkRegister(
			inputName,
			inputEmail,
			inputPassword
		);

		expect(result).toBeUndefined();
	});

	it("Login should be success", async () => {
		const inputEmail = accounts[i].email;
		const hash = newPassword[i];
		const result = await service.checkLogin(inputEmail, hash);

		expect(result).toEqual({
			id: playerIds[i],
			email: inputEmail,
			password: hash
		});
	});

	// it("Login should be fail - invalid email", async () => {
	// 	const inputEmail = "randomEmail";
	// 	const hash = "";
	// 	await service.checkLogin(inputEmail, hash);
	// 	expect(service.checkLogin).toThrowError(InvalidInfoError);
	// });

	// it("Login should be fail - invalid password", async () => {
	// 	const inputEmail = accounts[i].email;
	// 	const inputPassword = "wrongPassword";
	// 	(checkPassword as jest.Mock).mockImplementation(() =>
	// 		Promise.resolve(false)
	// 	);
	// 	await service.checkLogin(inputEmail, inputPassword);

	// 	expect(service.checkLogin).toThrowError(InvalidInfoError);
	// });
	afterAll(async () => {
		await knex.schema.dropTable(table.PLAYERS);
		await knex.destroy();
	});
});
