window.onload = () => {
	playerLogin();
	playerRegister();
};

function playerLogin() {
	document
		.querySelector("#form-login")
		.addEventListener("submit", async (e) => {
			e.preventDefault();

			const form = e.target;
			const email = form.login_email.value;
			const password = form.login_password.value;

			const formBody = { email: email, password: password };

			const resp = await fetch("/players/login", {
				method: "POST",
				headers: {
					"content-type": "application/json; charset=utf-8"
				},

				body: JSON.stringify(formBody)
			});

			const data = await resp.json();
			console.log(resp.status);
			if (resp.status !== 201) {
				document.querySelector(
					"#login-error-msg"
				).innerHTML = `${data.message}`;
				window.location.href = "/playerMainPage.html";
			}
		});
}

function playerRegister() {
	document
		.querySelector("#form-register")
		.addEventListener("submit", async (e) => {
			e.preventDefault();

			const form = e.target;
			const email = form.register_email.value;
			const username = form.register_username.value;
			const password = form.register_password.value;
			const confirm_password = form.register_confirm_password.value;

			if (!email || !password || !confirm_password || !username) {
				document.querySelector(
					"#register-error-msg"
				).innerHTML = `please input value`;
			} else if (password !== confirm_password) {
				document.querySelector(
					"#register-error-msg"
				).innerHTML = `wrong password`;
			} else {
				const formBody = {
					email: email,
					password: password,
					username: username
				};
				const resp = await fetch("/players/register", {
					method: "POST",
					headers: {
						"content-type": "application/json; charset=utf-8"
					},
					body: JSON.stringify(formBody)
				});

				const data = await resp.json();

				if (resp.status !== 201) {
					document.querySelector(
						"#register-error-msg"
					).innerHTML = `${data.message}`;
				}
				window.location.href = "/playerMainPage.html";
			}
		});
}
