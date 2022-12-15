onload();

class UserLoginHeader extends HTMLElement {
    constructor() {
        super();
    }


    connectedCallback() {
        this.innerHTML = /*html*/ `
            <header>
                <span>
                    <i class="bx bx-home-smile"></i>
                    <h1><a href="/playerMainPage.html">CAM-SPORT</a></h1>
                    <ul>
                        <a href="" id="logout">LOGOUT</a>
                    </ul>
                </span>
                
                    <span>Hello, Service user.</span>
                    <i class='bx bx-user'></i>
                
            </header>
        `;
    }
}

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

customElements.define("header-component", UserLoginHeader);