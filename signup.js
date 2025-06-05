function signup(event) {
    event.preventDefault(); // Stop form from reloading

    let Name = document.querySelector('#fullname');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');

    let newUser = {
        Fullname: Name.value.trim(),
        Email: email.value.trim(),
        Password: password.value
    };

    let users = localStorage.getItem('user-data');

    if (users) {
        users = JSON.parse(users);  
    } else {
        users = [];  
    }

    users.push(newUser);

    localStorage.setItem('user-data', JSON.stringify(users));

    alert("Sign-up successful!");

    Name.value = "";
    email.value = "";
    password.value = "";

    window.location.href="login.html"
}
