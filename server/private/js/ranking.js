loadAllRank();

const start = document.querySelector("body");

start.addEventListener("keypress", (e) => {
	e.preventDefault();
	console.log("active");
	window.location.href = "/playerMainPage.html";
});

async function loadAllRank() {
	const resp = await fetch("/players/ranking");
	const ranks = await resp.json();
	console.log(ranks);
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
