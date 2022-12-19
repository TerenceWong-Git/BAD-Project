// onload();
reaction();
laser();
profile();


// async function onload() {
// 	document.querySelector("#logout").addEventListener("click", async (e) => {
// 		e.preventDefault();
// 		console.log("logout");
// 		const res = await fetch("/players/logout", { method: "PUT" });
// 		if (res.status === 200) {
// 			window.location.replace("/");
// 		}
// 	});
// };

function reaction() {
    document.querySelector("#reaction")
    .addEventListener("click", async (e) => {
        e.preventDefault();
			window.location.href = `/modeSelection.html?game=1`;
		});
};

function laser() {
    document.querySelector("#laser")
    .addEventListener("click", async (e) => {
        e.preventDefault();
			window.location.href = `/modeSelection.html?game=2`;
		});
};
function profile() {
    document.querySelector("#profile")
    .addEventListener("click", async (e) => {
        e.preventDefault();
		window.location.href = `/playerProfile.html`;
		});
};

