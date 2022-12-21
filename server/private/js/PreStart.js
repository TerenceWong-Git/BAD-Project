
const start = document.querySelector("body");

start.addEventListener("keypress", (e) => {
	e.preventDefault();
	console.log("active");

	const queryString = window.location.search;
	console.log(queryString);
	const urlParams = new URLSearchParams(queryString);
	const product = urlParams.get("matchId");

	window.location = `/ballBall.html?matchId=${product}`;
});
