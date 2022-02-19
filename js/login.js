function fn() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (username == "admin" && password == "admin@123") {
    alert("Login successfull");
    window.open("admin.html");
    return false;
  } else {
    alert("Login failed");
  }
}
