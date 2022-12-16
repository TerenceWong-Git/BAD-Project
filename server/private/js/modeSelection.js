onload();
solo();
duo();

async function onload() {

	document.querySelector("#logout").addEventListener("click", async (e) => {
		e.preventDefault();
		console.log("logout");
		const res = await fetch("/players/logout", { method: "PUT" });
		if (res.status === 200) {
			window.location.href = `/`;
		}
	});
};


function solo() {
	
    document.querySelector("#SOLO")
    .addEventListener("click", async (e) => {
        e.preventDefault();
		const res = await fetch(`/rooms/game/1`, { method: "POST" });
		if (res.status === 200){
			window.location.href = `/PreStart.html?matchId=matchId`
			console.log('window location:', window.location.search);
			
			}
		});
};

function duo() {
    document.querySelector("#DUO")
    .addEventListener("click", async (e) => {
        e.preventDefault();
		const res = await fetch("/rooms/game/1", { method: "POST" });
		if (res.status === 200){
			window.location.href = `/PreStart.html?matchId=matchId`
			console.log('window location:', window.location.search);
			
			}
		});
};

