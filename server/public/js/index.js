// Please put the following syntax for using socket IO on client side
// const socket = io.connect();
// End

const start = document.querySelector("body");

start.addEventListener("keypress", (e) => {
	e.preventDefault();
	console.log("active");
	window.location = "/playerLogin.html";
});
