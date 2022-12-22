setting();

class Footer extends HTMLElement {
	constructor() {
		super();
	}
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = /*html*/ `
	connectedCallback() {
		this.innerHTML = /*html*/ `
        <footer>
            <div class="footer-container">
                <div class="footer-left">
                    <div class="setting">
                        <i class='bx bx-cog bx-tada bx-flip-vertical' id="setting"></i>
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
}

customElements.define("footer-component", Footer);

function setting() {
	document.querySelector("#setting").addEventListener("click", async (e) => {
		e.preventDefault();

		Swal.fire({
			title: "Make a guess!",
			text: "著跑鞋可以跑步，著行山鞋可爬山，著咩識飛?",
			icon: "info",
			showCancelButton: true,
			confirmButtonText: "Duo mode!!!",
			cancelButtonText: "Answer!!!",
			reverseButtons: true
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire(
					"Thanks for your support!!!",
					"We need your donation ($1000) to develop new function :)",
					"error"
				);
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				Swal.fire(
					"著（雀）仔",
					"We need your donation ($500) to develop new function :)",
					"error"
				);
			}
		});
	});
}
