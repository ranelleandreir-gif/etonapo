function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let role = document.getElementById("role").value;
  let msg = document.getElementById("msg");

  // SIMPLE DEMO LOGIN (for prototype lang)
  if (username === "admin" && password === "1234" && role === "admin") {
    window.location.href = "admin.html";
  }
  else if (username === "cashier" && password === "1234" && role === "cashier") {
    window.location.href = "cashier.html";
  }
  else if (username === "rider" && password === "1234" && role === "rider") {
    window.location.href = "rider.html";
  }
  else {
    msg.innerText = "Invalid credentials!";
    msg.style.color = "red";
  }
}

function checkAccess() {
  let key = document.getElementById("accessKey").value;
  let msg = document.getElementById("msg");

  if (key === "kasipagadmin") {
    // 👉 redirect to login page
    window.location.href = "admin-login.html";
  } else {
    msg.innerText = "Wrong Access Key!";
    msg.style.color = "red";
  }
}

function adminLogin() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if (u === "admin" && p === "1234") {
    window.location.href = "admin.html";
  } else {
    alert("Invalid Login");
  }
}