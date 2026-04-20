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

function addLoan() {
  let name = document.getElementById("name").value;
  let amount = document.getElementById("amount").value;
  let type = document.getElementById("type").value;

  if (!name || !amount) {
    alert("Please complete all fields");
    return;
  }

  let table = document.getElementById("loanTable");

  let row = table.insertRow();

  row.innerHTML = `
    <td>${name}</td>
    <td>₱${amount}</td>
    <td>${type}</td>
    <td class="pending">Pending</td>
  `;

  document.getElementById("name").value = "";
  document.getElementById("amount").value = "";
}

function showSection(section) {
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("loans").classList.add("hidden");

  document.getElementById(section).classList.remove("hidden");
}

function addLoan() {
  let name = document.getElementById("name").value;
  let amount = document.getElementById("amount").value;
  let type = document.getElementById("type").value;

  if (!name || !amount) {
    alert("Please complete all fields");
    return;
  }

  let table = document.getElementById("loanTable");

  let row = table.insertRow();

  row.innerHTML = `
    <td>${name}</td>
    <td>₱${amount}</td>
    <td>${type}</td>
    <td class="pending">Pending</td>
  `;

  document.getElementById("name").value = "";
  document.getElementById("amount").value = "";
}