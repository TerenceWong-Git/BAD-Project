loadInfo();

<<<<<<< HEAD
async function loadInfo() {
	const resp = await fetch("/players/profile");
	const infos = await resp.json();
	console.log("hi");
	console.log(infos.name);
	console.log(typeof infos.name);
	let htmlStr = /*html*/ `<ul style="color: white;">Hello, ${infos.name}</ul>`;
	document.querySelector("#player-name").innerHTML = htmlStr;
}

=======
>>>>>>> b835112 (update match record seed for id issue)
class Header extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML =
			/*html*/
			`
		<header>
			<nav>
				<div class="header-container">
					<span id="left">
						<div id="home">
							<i class="bx bx-home-smile"></i>
							<h1><a href="/playerMainPage.html">CAM-SPORT</a></h1>
						</div>
						<ul><a href="" id="logout">LOGOUT</a></ul>
						<div class="players">
							<i class='bx bx-user'></i>
							<div id="player-name"></div>
						</div>
					</span>
				</div>
			</nav>
		</header>
        `;
	}
}

customElements.define("header-component", Header);

document.querySelector("#logout").addEventListener("click", async () => {
	console.log("logout");
	const res = await fetch("/players/logout", { method: "DELETE" });
	if (res.status === 200) {
		window.location.reload("/");
	}
});
<<<<<<< HEAD

document.querySelector(".players").addEventListener("click", async (e) => {
	e.preventDefault();
	window.location.href = "/playerProfile.html";
});
=======
>>>>>>> b835112 (update match record seed for id issue)
