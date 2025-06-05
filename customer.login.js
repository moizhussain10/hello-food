function loginCustomer() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("user-data")) || [];

    let matched = false;

    for (let i = 0; i < users.length; i++) {
        if (
            users[i].Email === email &&
            users[i].Password === password
        ) {
            matched = true;
            break;
        }
    }

    if (matched) {
        alert("Login successful!");
        localStorage.setItem("currentUser", email);
        window.location.href = "customer.html";
    } else {
        alert("Login failed! Check email or password.");
        window.location.href = "index.html";
    }
}
