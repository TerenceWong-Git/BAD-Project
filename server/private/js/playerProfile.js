window.onload = async () => {
	await loadInfo();
	await loadProfile();
	await updateProfile();
};

async function loadInfo() {
	const resp = await fetch("/players/profile");
	const infos = await resp.json();
	let htmlStr = /*html*/ `<ul style="color: white;">Hello, ${infos.name}</ul>`;
	document.querySelector("#player-name").innerHTML = htmlStr;
}

async function loadProfile() {
	const data = await fetch("/players/profile");
	const infos = await data.json();
	let htmlStr = /*html*/ `<div class="box-content">My Profile
    <form id="form-profile">
    
        <div class="input-box">
        <div>Name :</div>
            <input
                type="text"
                id="profile_name"
                value=${infos.name}
                name="profile_name"
                
            />
        </div>
        <div class="input-box">
            <div>Email :</div>
            <input
                type="email"
                id="profile_email"
                value=${infos.email}
                name="profile_email"
                readonly
            />
        </div>
        <div class="input-box">
            <div>Age :</div>
            <input
                type="number"
                id="profile_age"
                value=${infos.age}
                name="profile_age"
                max="100"
                min="10"
            />
        </div>
        <div id="profile-error-msg" class="error-msg"></div>
        <input type="submit" class="dark-btn" value="Update" />
    </form>`;
	document.querySelector(".box-content").innerHTML = htmlStr;
}

async function updateProfile() {
	document
		.querySelector("#form-profile")
		.addEventListener("submit", async (e) => {
			e.preventDefault();
			const form = e.target;
			const email = form.profile_email.value;
			const username = form.profile_name.value;
			const age = form.profile_age.value;
			const formBody = { name: username, email: email, age: age };
			const resp = await fetch("/players/profile", {
				method: "PATCH",
				headers: { "Content-Type": "application/json; charset=utf-8" },
				body: JSON.stringify(formBody)
			});
			const data = await resp.json();
			if (resp.status !== 200) {
				document.querySelector(
					"#profile-error-msg"
				).innerHTML = `${data.message}`;
			}
			window.location.replace("/playerMainPage.html");
		});
}
