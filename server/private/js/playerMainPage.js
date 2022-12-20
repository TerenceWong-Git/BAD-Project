reaction();
laser();
profile();
<<<<<<< HEAD
ranking();
=======
>>>>>>> b835112 (update match record seed for id issue)

function reaction() {
	document.querySelector("#reaction").addEventListener("click", async (e) => {
		e.preventDefault();
		window.location.href = `/modeSelection.html?game=1`;
	});
}

function laser() {
	document.querySelector("#laser").addEventListener("click", async (e) => {
		e.preventDefault();
		window.location.href = `/modeSelection.html?game=2`;
	});
}
function profile() {
	document.querySelector("#profile").addEventListener("click", async (e) => {
		e.preventDefault();
		window.location.href = `/playerProfile.html`;
	});
}
function ranking() {
	document.querySelector("#ranking").addEventListener("click", async (e) => {
		e.preventDefault();
		window.location.href = `/ranking.html`;
	});
}
