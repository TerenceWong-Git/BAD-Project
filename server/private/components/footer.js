class Footer extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = `
        <footer>
            <div class="footer-container">
                <div class="footer-left">
                    <div class="setting">
                        <i class='bx bx-cog bx-tada bx-flip-vertical' ></i>
                    </div>
                    
                </div>
                <div class="footer-right">
                    <div class="statement">
                        <h4>PRODUCED BY J.A.T @TECKY<h4>
                    </div>
                </div>
            </div>
 
        </footer>
        `;
	}
}

customElements.define("footer-component", Footer);
