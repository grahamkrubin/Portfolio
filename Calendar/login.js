// ajax.js

function loginAjax(event) {
    const username = document.getElementById("username").value; // Get the username from the form
    const password = document.getElementById("password").value; // Get the password from the form
    console.log(username);
    console.log(password);
    // Make a URL-encoded string for passing POST data:
    const data = { 'username': username, 'password': password };
    console.log(data);
    fetch("login.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => data.success ? prepPostLogin() : console.log(`You were not logged in ${data.message}`));
        //.then(data => console.log(data.success ? "You've been logged in!" : `You were not logged in ${data.message}`))
}
function prepPostLogin(){
     $(document).ready(function(){
        $("#username").hide();
        $("#password").hide();
        $("#login_btn").hide();
        $("#newuser").hide();
        $("#newpass").hide();
        $("#create_btn").hide();
        $("#logout_btn").show();
        $("#logged-user").show();
        });
     let events = [];
     
     fetch("getCalendarEvents.php", {
            method: 'POST',
            //body: JSON.stringify(data),
            headers: { 'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => data.success ? console.log(data): console.log("nothin"));
       
}
/*
function hideLogin(){
   
}
*/
document.getElementById("login_btn").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click