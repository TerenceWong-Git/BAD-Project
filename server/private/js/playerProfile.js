window.onload() = () => {
    loadProfile();
}

async function loadProfile() {
	const data = await fetch("/players/profile");
	const infos = await data.json();
	let htmlStr = /*html*/ `<div class="box-content">
    <form id="form-profile">
    <box-icon name='rename' ></box-icon>
        <div class="input-box">
            <box-icon name='rename' ></box-icon>
            <input
                id="profile_name"
                value=${infos.name}
                id="profile_name"
                type="text"
            />
        </div>
        <div class="input-box">
            <i class="bx bx-envelope"></i>
            <input
                type="email"
                id="login_email"
                value=${infos.email}
                name="profile_email"
                readonly
            />
        </div>
        <div class="input-box">
            <p>Age</p>
            <input
                type="number"
                id="profile_age"
                placeholder=${infos.age}
                name="profile_age"
            />
        </div>
        <div class="input-box" id="input-box-gender">
            <box-icon name='male-female'></box-icon>
            <<input type="radio" id="male" name="gender" value="Male">
            <label for="male">Male</label><br>
            <<input type="radio" id="female" name="gender" value="Female">
            <label for="female">Female</label><br>
        </div>
        <div id="login-error-msg" class="error-msg"></div>
        <input type="submit" class="dark-btn" value="login" />
    </form>`;
	document.querySelector(".box-content").innerHTML = htmlStr;
}
