function getStarted() {
	const start = document.querySelector("body");
	if (start) {
		start.addEventListener("keypress", (e) => {
			e.preventDefault();
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			const product = urlParams.get("matchId");

			window.location = `/ballBall.html?matchId=${product}`;
		});
	}
}
