loadAllRank();
loadSelfRank();

const start = document.querySelector("body");

start.addEventListener("keypress", (e) => {
	e.preventDefault();
	console.log("active");
<<<<<<< HEAD
	window.location.href = "/playerMainPage.html";
});

async function loadAllRank() {
	const resp = await fetch("/players/ranking");
	const ranks = await resp.json();
	console.log(ranks);
	let htmlStr = ``;
	for (const rank of ranks) {
		htmlStr += /*html*/ `
=======
	window.location.href= "/playerMainPage.html" ;
});



async function loadAllRank() {
	const resp = await fetch("/players/ranking");
	const ranks = await resp.json();
    console.log(ranks);
	let	 htmlStr = ``;
    for(const rank of ranks){
        htmlStr += /*html*/ `
>>>>>>> main
        <tr>
        <td>${rank.name}</td>
        <td>${rank.points}
        </tr>
        `;
<<<<<<< HEAD
	}

	document.querySelector("#all").innerHTML += htmlStr;
}
=======
    };
    
	document.querySelector("#all").innerHTML += htmlStr;
};

>>>>>>> main

async function loadSelfRank() {
	const resp = await fetch("/players/my_ranking");
	const ranks = await resp.json();
<<<<<<< HEAD
	console.log(ranks);
	let htmlStr = ``;
	for (const rank of ranks) {
		htmlStr += /*html*/ `
=======
    console.log(ranks);
	let	 htmlStr = ``;
    for(const rank of ranks){
        htmlStr += /*html*/ `
>>>>>>> main
        <tr>
        <td style="text-align: center;">${rank.points}
        </tr>
        `;
<<<<<<< HEAD
	}

	document.querySelector("#own").innerHTML += htmlStr;
}
=======
    };
    
	document.querySelector("#own").innerHTML += htmlStr;
};

>>>>>>> main
