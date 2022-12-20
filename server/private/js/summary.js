loadName();
loadResult();


async function loadName() {
	const resp = await fetch("/players/profile");
	const infos = await resp.json();
	let	 htmlStr = /*html*/ `<div>${infos.name}</div>`;
	document.querySelector("#td1").innerHTML = htmlStr;
};

async function loadResult() {
    const res = await fetch ("/players/my_ranking");
    const results = await res.json();
    console.log(results);
    console.log("???");
}


