loadName();
loadResult();


async function loadName() {
	const resp = await fetch("/players/profile");
	const infos = await resp.json();
	let	 htmlStr = /*html*/ `<div class="right">${infos.name}</div>`;
	document.querySelector("#td1").innerHTML = htmlStr;
};

async function loadResult() {
    const res = await fetch ("/players/my_ranking");
    const results = await res.json();
    console.log(results);
    let CurrentPointHtmlStr = /*html*/ `<div class="right"></div>`;
    document.querySelector("#td2").innerHTML = CurrentPointHtmlStr;
    let HighestPointHtmlStr = /*html*/ `<div class="right">${results[0].points}</div>`;
    document.querySelector("#td3").innerHTML = HighestPointHtmlStr;
};







