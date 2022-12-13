document
.querySelector("#logout")
.addEventListener("click", async () => {
    const res = await fetch("/logout", { method: "PUT" });
    
    if (res.status === 200) {
        
        window.location = `/index.html`
       }
       console.log(res.status);
})
