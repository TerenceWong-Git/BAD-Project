
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
		
		Swal.fire({
			title: 'Make a guess!',
			text: "著跑鞋可以跑步，著行山鞋可爬山，著咩識飛?",
			icon: 'info',
			showCancelButton: true,
			confirmButtonText: 'Duo mode!!!',
			cancelButtonText: 'Answer!!!',
			reverseButtons: true
		  }).then((result) => {
			if (result.isConfirmed) {
			  Swal.fire(
				'Thanks for your support!!!',
				'We need your donation ($1000) to develop new function :)',
				'error'
			  )
			} else if (
			  result.dismiss === Swal.DismissReason.cancel
			) {
			  Swal.fire(
				'著（雀）仔',
				'We need your donation ($500) to develop new function :)',
				'error'
			  )
			}
		  })
	});
}
function achi() {
	document.querySelector("#achi").addEventListener("click", async (e) => {
		e.preventDefault();
		
		Swal.fire({
			title: 'Make a guess!',
			text: "點解大肚婆唔可以食煙?",
			icon: 'info',
			showCancelButton: true,
			confirmButtonText: 'Duo mode!!!',
			cancelButtonText: 'Achievements!!!',
			reverseButtons: true
		  }).then((result) => {
			if (result.isConfirmed) {
			  Swal.fire(
				'Thanks for your support!!!',
				'We need your donation ($1000) to develop new function :)',
				'error'
			  )
			} else if (
			  result.dismiss === Swal.DismissReason.cancel
			) {
			  Swal.fire(
				'因爲BB未夠18歲',
				'We need your donation ($500) to develop new function :)',
				'error'
			  )
			}
		  })
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
