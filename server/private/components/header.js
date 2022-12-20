window.onload = async () => {
	await loadInfo();
};

class UserLoginHeader extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = /*html*/ `
            <header>
                <nav >
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

async function onload() {
	document.querySelector("#logout").addEventListener("click", async (e) => {
		e.preventDefault();
		console.log("logout");
		const res = await fetch("/players/logout", { method: "PUT" });
		if (res.status === 200) {
			window.location.href = `/`;
		}
	});
}
