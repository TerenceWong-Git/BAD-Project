const start = document.querySelector("body");

start.addEventListener("keypress", (e) => {
	e.preventDefault();
	console.log("active");
	window.location = "/playerLogin.html";
});
