import { InvalidInfoError } from "../../utils/error";
import type { Request, Response } from "express";
import { PlayersController } from "../../controller/playersController";
import { PlayersService } from "../../service/playersService";
import { getMockRequest, getMockResponse } from "../utils";
import { Player } from "../../service/model";

jest.mock("../../service/playersService");

describe("playersController Test Case", () => {
	let controller: PlayersController;
	let service: PlayersService;
	let req: Request;
	let res: Response;
	let accounts: Player[] = [
		{ id: 1, email: "alex@tecky.io", password: "alex" },
		{ id: 2, email: "abc@tecky.io", password: "abcabc" },
		{ id: 3, email: "david@abc.io", password: "david" }
	];
	let i: number = parseInt((Math.random() * accounts.length).toString());
	beforeEach(() => {
		service = new PlayersService({} as any);
		service.checkRegister = jest.fn(() => Promise.resolve(accounts.length + 1));
		service.checkLogin = jest.fn(() => Promise.resolve(accounts[i]));
		service.showProfile = jest.fn(() =>
			Promise.resolve({
				name: accounts[i].name,
				email: accounts[i].email,
				image: accounts[i].image,
				age: accounts[i].age,
				gender: accounts[i].gender
			})
		);
		service.updateProfile = jest.fn(() => Promise.resolve(accounts[i].id));
		req = getMockRequest();
		res = getMockResponse();
		controller = new PlayersController(service);
		req.session.playerId = undefined;
	});

	it("Register should be success", async () => {
		const inputName = "Peter";
		const inputEmail = "peter@abc.io";
		const inputPassword = "ThisIsPeter";
		req.body = { name: inputName, email: inputEmail, password: inputPassword };

		await controller.register(req, res);
		accounts.push(req.body);
		expect(service.checkRegister).toBeCalledWith(
			inputName,
			inputEmail,
			inputPassword
		);
		expect(req.session.playerId).toEqual(accounts.length);
		expect(res.json).lastCalledWith({ message: "success" });
		expect(res.json).toBeCalledTimes(1);
	});

	it("Register should be success without name", async () => {
		const inputName = "";
		const inputEmail = "shawn@abc.io";
		const inputPassword = "Baddie";
		req.body = { name: inputName, email: inputEmail, password: inputPassword };

		await controller.register(req, res);
		accounts.push(req.body);
		expect(service.checkRegister).toBeCalledWith(
			inputName,
			inputEmail,
			inputPassword
		);
		expect(req.session.playerId).toEqual(accounts.length);
		expect(res.json).lastCalledWith({ message: "success" });
		expect(res.json).toBeCalledTimes(1);
	});

	it("Register should be fail - Invalid email", async () => {
		const inputName = "Peter Wong";
		const inputEmail = "ThisIsPeter";
		const inputPassword = "ThisIsPeter";
		req.body = { name: inputName, email: inputEmail, password: inputPassword };

		try {
			await controller.register(req, res);
		} catch (err) {}

		expect(service.checkRegister).not.toBeCalled();
		expect(res.json).not.toBeCalled();
	});

	it("Register should be fail - Missing email / password", async () => {
		const inputPassword = "ThisIsPeter";
		req.body = { password: inputPassword };

		try {
			await controller.register(req, res);
		} catch (err) {}

		expect(service.checkRegister).not.toBeCalled();
		expect(res.json).not.toBeCalled();
	});

	it("Register should be fail - User already existed in DB", async () => {
		const inputEmail = "alex@tecky.io";
		const inputPassword = "123456";
		req.body = { email: inputEmail, password: inputPassword };
		service.checkRegister = jest.fn(() =>
			Promise.reject(new InvalidInfoError())
		);
		try {
			await controller.register(req, res);
		} catch (err) {}

		expect(service.checkRegister).toBeCalled();
		expect(res.json).not.toBeCalled();
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

	it("Login should be fail - Missing email / password", async () => {
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

	it("Logout should be success after register", async () => {
		const inputName = "Peter2";
		const inputEmail = "peter2@abc.io";
		const inputPassword = "ThisIsPeter2";
		req.body = { name: inputName, email: inputEmail, password: inputPassword };

		await controller.register(req, res);
		accounts.push(req.body);
		await controller.logout(req, res);

		expect(service.checkRegister).toBeCalledWith(
			inputName,
			inputEmail,
			inputPassword
		);
		expect(req.session.playerId).not.toEqual(accounts[i].id);
		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenNthCalledWith(1, { message: "success" });
		expect(res.status).toHaveBeenNthCalledWith(2, 205);
		expect(res.json).toHaveBeenNthCalledWith(2, { message: "logout success" });
		expect(res.json).toBeCalledTimes(2);
	});

	it("Logout should be success after login", async () => {
		const inputEmail = accounts[i].email;
		const inputPassword = accounts[i].password;
		req.body = { email: inputEmail, password: inputPassword };

		// Stage 2 - Execute Test Subject
		await controller.login(req, res);
		await controller.logout(req, res);

		expect(service.checkLogin).toBeCalledWith(inputEmail, inputPassword);
		expect(req.session.playerId).not.toEqual(accounts[i].id);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({ message: "success" });
		expect(res.status).toHaveBeenNthCalledWith(2, 205);
		expect(res.json).toHaveBeenNthCalledWith(2, { message: "logout success" });
		expect(res.json).toBeCalledTimes(2);
	});

	it("getProfile should be success after login", async () => {
		const inputEmail = accounts[i].email;
		const inputPassword = accounts[i].password;
		req.body = { email: inputEmail, password: inputPassword };

		// Stage 2 - Execute Test Subject
		await controller.login(req, res);
		accounts[i]["image"] = "happyMeal.jpg";
		accounts[i]["age"] = parseInt((Math.random() * 100).toString());
		accounts[i]["gender"] = parseInt(Math.round(Math.random()).toString());
		await controller.getProfile(req, res);

		expect(service.checkLogin).toBeCalledWith(inputEmail, inputPassword);
		expect(req.session.playerId).toEqual(accounts[i].id);
		expect(res.status).toHaveBeenNthCalledWith(1, 200);
		expect(res.json).toHaveBeenNthCalledWith(1, { message: "success" });
		expect(res.status).lastCalledWith(200);
		expect(res.json).lastCalledWith({
			name: accounts[i].name,
			email: accounts[i].email,
			image: accounts[i].image,
			age: accounts[i].age,
			gender: accounts[i].gender
		});
		expect(res.json).toBeCalledTimes(2);
	});

	it("getProfile should be success after login and updateProfile", async () => {
		const inputEmail = accounts[i].email;
		const inputPassword = accounts[i].password;
		req.body = { email: inputEmail, password: inputPassword };

		// Stage 2 - Execute Test Subject
		await controller.login(req, res);
		accounts[i]["image"] = "happyMeal.jpg";
		accounts[i]["age"] = parseInt((Math.random() * 100).toString());
		accounts[i]["gender"] = parseInt(Math.round(Math.random()).toString());
		await controller.getProfile(req, res);
		let deepCopy = JSON.parse(JSON.stringify(accounts[i]));
		deepCopy["image"] = "happyMeal2.jpg";
		deepCopy["age"] = parseInt((Math.random() * 100).toString());
		deepCopy["gender"] = parseInt(Math.round(Math.random()).toString());
		await controller.updateProfile(req, res);
		// await controller.getProfile(req, res);

		expect(service.checkLogin).toBeCalledWith(inputEmail, inputPassword);
		expect(req.session.playerId).toEqual(accounts[i].id);
		expect(res.status).toHaveBeenNthCalledWith(1, 200);
		expect(res.json).toHaveBeenNthCalledWith(1, { message: "success" });
		expect(res.status).toHaveBeenNthCalledWith(2, 200);
		expect(res.json).toHaveBeenNthCalledWith(2, {
			name: accounts[i].name,
			email: accounts[i].email,
			image: accounts[i].image,
			age: accounts[i].age,
			gender: accounts[i].gender
		});
		expect(res.status).toHaveBeenNthCalledWith(3, 200);
		expect(res.json).toHaveBeenNthCalledWith(3, { message: "success" });
		// expect(res.status).toHaveBeenNthCalledWith(4, 200);
		// expect(res.json).toHaveBeenNthCalledWith(4, {
		// 	name: accounts[i].name,
		// 	email: accounts[i].email,
		// 	image: accounts[i].image,
		// 	age: accounts[i].age,
		// 	gender: accounts[i].gender
		// });
		// expect(res.json).toBeCalledTimes(4);
	});
});
