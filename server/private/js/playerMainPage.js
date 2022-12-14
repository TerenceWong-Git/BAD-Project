onload();

async function onload() {
    document
    .querySelector("#logout")
    .addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("logout");
        const res = await fetch("/players/logout", { method: "PUT" });
        if (res.status === 200) {
        window.location.href = `/`;
    }
})
}
