


class Header extends HTMLElement {
    constructor() {
        super();
    }
    

    connectedCallback() {
        this.innerHTML =  `
            <header>
                <nav >
                    <div class="header-container">
                        <span id="left">
                            <div id="home">
                                <i class="bx bx-home-smile"></i>
                                <h1><a href="/playerMainPage.html">CAM-SPORT</a></h1>
                            </div>
                            <ul><a href="" id="logout">LOGOUT</a></ul>
                            <div class="players">
                                <i class='bx bx-user'></i>Hello, 
                                <div id="player-name">Player</div>
                            </div>
                        </span>
                    </div>
                </nav>
            </header>
        `;
    }
}
            
customElements.define("header-component", Header);
            
async function onload() {
    document.querySelector("#logout").addEventListener("click", async () => {
// e.preventDefault();
        console.log("logout");
        const res = await fetch("/players/logout", { method: "DELETE" });
        if (res.status === 200) {
            window.location.reload("/");
        }
    })
};
onload();

