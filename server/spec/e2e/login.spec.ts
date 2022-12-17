import path from "path";
import Playwright from "playwright";
import "../../main";
import { PORT } from "../../main";

jest.setTimeout(35 * 1000);

describe("Login", () => {
	let page: Playwright.Page;
	let browser: Playwright.Browser;
	const index: string = `localhost:${PORT}`;
	let accounts: { email: string; password: string }[] = [
		{ email: "alex@tecky.io", password: "alex" },
		{ email: "abc@tecky.io", password: "abcabc" },
		{ email: "david@abc.io", password: "david" }
	];
	let i: number = parseInt((Math.random() * accounts.length).toString());

	beforeAll(async () => {
		browser = await Playwright.chromium.launch();
		page = await browser.newPage();
	});

	beforeEach(async () => {
		await page.goto(index);
	});

	it("should display 'CAM-SPORT' text on title", async () => {
		const title = await page.title();
		expect(title).toContain("CAM-SPORT");
	});

	it("should go to login page from index page", async () => {
		await page.evaluate(async () => {
			const start = document.querySelector("body");
			if (start) {
				(start as HTMLBodyElement).onkeydown;
			}
		});
		const formLogInEle = await page.evaluate(() =>
			document.querySelector("#form-login")
		);
		expect(formLogInEle).toBeDefined();
	});

	it("should be blocked for 'profile page' without login", async () => {
		await page.goto(path.join(index, "playerMainPage"));
		const formLogInEle = await page.evaluate(() =>
			document.querySelector("#form-login")
		);
		expect(formLogInEle).toBeDefined();
	});

	it("should successfully login", async () => {
		await page.evaluate(async () => {
			const start = document.querySelector("body");
			if (start) {
				(start as HTMLBodyElement).onkeydown;
			}
		});
		await page.evaluate(() => {
			const emailInput = document.querySelector("[name=login_email]");
			const passwordInput = document.querySelector("[name=login_password]");
			if (emailInput && passwordInput) {
				(emailInput as HTMLInputElement).value = accounts[i].email;
				(passwordInput as HTMLInputElement).value = accounts[i].password;
			}
			const submitInput = document.querySelector("#form-login [type=submit]");
			if (submitInput) {
				(submitInput as HTMLInputElement).click();
			}
		});
		const mode = await page.evaluate(() => document.querySelector(".carousel"));
		expect(mode).toBeDefined();
	});
	afterAll(async () => {
		await browser.close();
	});
});
