solo();
duo();


function solo() {
	
    document.querySelector("#SOLO")
    .addEventListener("click", async (e) => {
        e.preventDefault();
		const res = await fetch(`/rooms/game/1`, { method: "POST" });
		if (res.status === 200){
			window.location.href = `/PreStart.html?matchId=matchId`
			console.log('window location:', window.location.search);
			} else {
				window.location.reload("/")
			};
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

