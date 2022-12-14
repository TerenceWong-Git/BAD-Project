import { InvalidInfoError } from "../../utils/error";

import type { Request, Response } from "express";
import { PlayersController } from "../../controller/playersController";
import { PlayersService } from "../../service/playersService";
import { getMockRequest, getMockResponse } from "./utils";

jest.mock("../../service/playersService");

describe("playersController Test Case", () => {
	let controller: PlayersController;
	let service: PlayersService;
	let req: Request;
	let res: Response;
	let accounts = [
		{ id: 1, email: "alex@tecky.io", password: "alex" },
		{ id: 2, email: "abc@tecky.io", password: "abcabc" },
		{ id: 3, email: "david@abc.io", password: "david" }
	];
	let i = parseInt((Math.random() * 3).toString());

	beforeEach(() => {
		service = new PlayersService({} as any);
		service.checkLogin = jest.fn(() => Promise.resolve(accounts[i]));
		req = getMockRequest();
		res = getMockResponse();
		controller = new PlayersController(service);
	});

	it("Login should be success", async () => {
		// Stage 1 - Prepare TestCase
		const inputEmail = accounts[i].email;
		const inputPassword = accounts[i].password;
		req.body = { email: inputEmail, password: inputPassword };

		// Stage 2 - Execute Test Subject
		await controller.login(req, res);

		// Stage 3 - Verification
		expect(service.checkLogin).toBeCalledWith(inputEmail, inputPassword);
		expect(req.session.playerId).toEqual(accounts[i].id);
		expect(res.json).lastCalledWith({ message: "success" });
		expect(res.json).toBeCalledTimes(1);
	});

	it("Login should be fail - Missing username / password", async () => {
		const inputPassword = accounts[i].password;
		req.body = { password: inputPassword };

		try {
			await controller.login(req, res);
		} catch (err) {}

		expect(service.checkLogin).not.toBeCalled();
		expect(res.json).not.toBeCalled();
	});

	it("Login should be fail - Cannot found User in DB", async () => {
		const inputEmail = "peter@tecky.io";
		const inputPassword = "1234";
		req.body = { email: inputEmail, password: inputPassword };
		service.checkLogin = jest.fn(() => Promise.reject(new InvalidInfoError()));
		try {
			await controller.login(req, res);
		} catch (err) {}

		expect(service.checkLogin).toBeCalled();
		expect(res.json).not.toBeCalled();
	});
});
