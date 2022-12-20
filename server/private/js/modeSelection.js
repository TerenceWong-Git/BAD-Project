solo();
duo();

async function onload() {
	document.querySelector("#logout").addEventListener("click", async (e) => {
		e.preventDefault();
		const res = await fetch(`/rooms/game/1`, { method: "POST" });
		if (res.status === 200) {
			window.location.href = `/PreStart.html?matchId=matchId`;
			console.log("window location:", window.location.search);
		} else {
			window.location.reload("/");
		}
	});
}

function solo() {
	document.querySelector("#SOLO").addEventListener("click", async (e) => {
		e.preventDefault();
		const res = await fetch(`/rooms/game/1`, { method: "POST" });
		const result = await res.json();
		if (res.status === 200) {
			window.location.href = `/PreStart.html?matchId=${result.matches_live_id}`;
			console.log("window location:", window.location.search);
		}
	});
}

function duo() {
	document.querySelector("#DUO").addEventListener("click", async (e) => {
		e.preventDefault();
		const res = await fetch("/rooms/game/1", { method: "POST" });
		if (res.status === 200) {
			window.location.href = `/PreStart.html?matchId=${result.matches_live_id}`;
			console.log("window location:", window.location.search);
		}
	});
}
