import { loadInfo } from "../components/header";

window.onload = async () => {
    await loadInfo();
	await loadProfile();
    await updateProfile();
};






async function loadProfile() {
	const data = await fetch("/players/profile");
	const infos = await data.json();
	let htmlStr = /*html*/ `<div class="box-content">My Profile
    <form id="form-profile">
    
        <div class="input-box">
        <div>Name :</div>
            <input
                type="text"
                id="profile_name"
                value=${infos.name}
                name="profile_name"
                
            />
        </div>
        <div class="input-box">
            <div>Email :</div>
            <input
                type="email"
                id="profile_email"
                value=${infos.email}
                name="profile_email"
                readonly
            />
        </div>
        <div class="input-box">
            <div>Age :</div>
            <input
                type="number"
                id="profile_age"
                placeholder=${infos.age}
                name="profile_age"
            />
        </div>
        <div class="input-box" id="input-box-gender">
            <div>Gender :</div>
            
            <label for="male"><input type="radio" id="male" name="gender" value="Male">Male</label>
            
            <label for="female"><input type="radio" id="female" name="gender" value="Female">Female</label>
        </div>
        <div id="login-error-msg" class="error-msg"></div>
        <input type="submit" class="dark-btn" value="Update" />
    </form>`;
	document.querySelector(".box-content").innerHTML = htmlStr;
}

async function updateProfile() {
    
    document.querySelector("#form-profile").addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = e.target;
        // const email = form.profile_email.value;
		const username = form.profile_name.value;
		const age = form.profile_age.placeholder;
		const gender = form.male.value;
        console.log(username, age, gender);

        // const data = await fetch("/players/profile");
        // const infos = await data.json();
        // console.log(infos);
    });
}


