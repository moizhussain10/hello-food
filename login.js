function login(event) {
    event.preventDefault(); // Stop form reload

    let loginEmail = document.querySelector('#loginEmail').value.trim();
    let loginPassword = document.querySelector('#loginPassword').value;

    let savedUsers = localStorage.getItem('user-data');

    if (savedUsers) {
        savedUsers = JSON.parse(savedUsers);  // string → array
    } else {
        savedUsers = [];
    }

    let userFound = false;

    for (let i = 0; i < savedUsers.length; i++) {
        if (
            savedUsers[i].Email === loginEmail &&
            savedUsers[i].Password === loginPassword
        ) {
            userFound = true;
            break;
        }
    }

    if (userFound) {
        alert("Login successful!");
        askUserRole(); // 🎯 NEW FUNCTION HERE
    } else {
        alert("User not found. Please sign up.");
        window.location.href = "signup.html";
    }

}

// 🎉 NEW FUNCTION: Ask user what role they want to login as
function askUserRole() {
    let role = prompt("Login as Admin or Customer?").toLowerCase();

    if (role === "admin") {
        window.location.href = "admin.html";
    } else if (role === "customer") {
        window.location.href = "customr.html";
    } else {
        alert("Invalid role. Please enter 'admin' or 'customer'.");
    }
}
