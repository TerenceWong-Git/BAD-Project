loadProfile();
updateProfile();


async function loadProfile() {
	const data = await fetch("/players/profile");
	const infos = await data.json();
	let htmlStr = /*html*/ `<div class="box-content">My Profile
    <form id="form-profile">
    
        <div class="input-box">
        <div>Name :</div>
            <input
                id="profile_name"
                value=${infos.name}
                id="profile_name"
                type="text"
            />
        </div>
        <div class="input-box">
            <div>Email :</div>
            <input
                type="email"
                id="login_email"
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
    const data = await fetch("/players/profile");
	const infos = await data.json();
    console.log(infos);
    
}


