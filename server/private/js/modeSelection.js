solo();
duo();

function solo() {
	document.querySelector("#SOLO").addEventListener("click", async (e) => {
function solo() {
	document.querySelector("#SOLO").addEventListener("click", async (e) => {
		e.preventDefault();
		const res = await fetch(`/rooms/game/1`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			}
		});
		const result = await res.json();
		console.log("res.status: ", res.status);
		const res = await fetch(`/rooms/game/1`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			}
		});
		const result = await res.json();
		console.log("res.status: ", res.status);
		if (res.status === 200) {
			window.location.href = `/PreStart.html?matchId=${result.matches_live_id}`;
			console.log("window location:", window.location.search);
		}
	});
}
}

function duo() {
	document.querySelector("#DUO").addEventListener("click", async (e) => {
		e.preventDefault();
		// Swal.fire({
		// 	icon: "info",
		// 	text:"$500/monthly to unlock"
		// });

		Swal.fire({
			title: 'Make a guess!',
			text: "蘋果汁係蘋果味，橙汁係橙味，咁益力多係咩味？",
			icon: 'info',
			showCancelButton: true,
			confirmButtonText: 'Duo mode!!!',
			cancelButtonText: 'Answer!!!',
			reverseButtons: true
		  }).then((result) => {
			if (result.isConfirmed) {
			  Swal.fire(
				'Thanks for your support!!!',
				'We need your donation ($500) to develop new function :)',
				'error'
			  )
			} else if (
			  result.dismiss === Swal.DismissReason.cancel
			) {
			  Swal.fire(
				'你今日飲咗未',
				'We need your donation ($500) to develop new function :)',
				'error'
			  )
			}
		  })
	});
}
