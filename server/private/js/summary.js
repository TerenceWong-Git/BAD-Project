loadName();
loadResult();
main();
profile();
ranking();

async function loadName() {
	const resp = await fetch("/players/profile");
	const infos = await resp.json();
	let htmlStr = /*html*/ `<div class="right">${infos.name}</div>`;
	document.querySelector("#td1").innerHTML = htmlStr;
}

async function loadResult() {
	const resp = await fetch("/ballBall/reaction");
	const currentResults = await resp.json();
	let CurrentPointHtmlStr = /*html*/ `<div class="right">${currentResults.points}</div>`;
	document.querySelector("#td2").innerHTML = CurrentPointHtmlStr;

	const res = await fetch("/players/my_ranking");
	const highestResults = await res.json();
	let HighestPointHtmlStr = /*html*/ `<div class="right">${highestResults[0].points}</div>`;
	document.querySelector("#td3").innerHTML = HighestPointHtmlStr;
}
function profile() {
	document.querySelector("#toProfile").addEventListener("click", async (e) => {
		e.preventDefault();
		window.location.href = `/playerProfile.html`;
	});
}
function ranking() {
	document.querySelector("#toRanking").addEventListener("click", async (e) => {
		e.preventDefault();
		window.location.href = `/ranking.html`;
	});
}
function main() {
	document.querySelector("#toMainPage").addEventListener("click", async (e) => {
		e.preventDefault();
		window.location.href = `/playerMainPage.html`;
	});
}
