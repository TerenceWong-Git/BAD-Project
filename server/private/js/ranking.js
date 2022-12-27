loadAllRank();
loadSelfRank();

const nextPage = document.querySelector("body");

nextPage.addEventListener("keypress", (e) => {
	e.preventDefault();
	window.location.href = "/playerMainPage.html";
});

async function loadAllRank() {
	const resp = await fetch("/players/ranking");
	const ranks = await resp.json();
	let htmlStr = ``;
	for (const rank of ranks) {
		htmlStr += /*html*/ `
        <tr>
        <td>${rank.name}</td>
        <td>${rank.points}
        </tr>
        `;
	}

	document.querySelector("#all").innerHTML += htmlStr;
}

async function loadSelfRank() {
	const resp = await fetch("/players/my_ranking");
	const ranks = await resp.json();
	let htmlStr = ``;
	for (const rank of ranks) {
		htmlStr += /*html*/ `
        <tr>
        <td style="text-align: center;">${rank.points}
        </tr>
        `;
	}

	document.querySelector("#own").innerHTML += htmlStr;
}
