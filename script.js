import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } 
from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

/* 🔥 FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyBTkf7LjPDlTdRr1N_4xfvzdcjdMBGVKZk",
  authDomain: "eto-na-5543f.firebaseapp.com",
  projectId: "eto-na-5543f",
  storageBucket: "eto-na-5543f.firebasestorage.app",
  messagingSenderId: "914719267981",
  appId: "1:914719267981:web:50f6d701115695702516c4"
};

/* INIT FIREBASE */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let loansData = [];

/* =========================
   NAVIGATION (DASH / LOAN)
========================= */
window.show = function(page){

  document.getElementById("dash").classList.add("hidden");
  document.getElementById("loan").classList.add("hidden");

  document.getElementById(page).classList.remove("hidden");
};

/* =========================
   SOLO / GROUP TOGGLE
========================= */
window.toggle = function(){

  let type = document.getElementById("type").value;
  let members = document.getElementById("members");

  if(type === "Solo"){
    members.disabled = true;
    members.value = "";
  } else {
    members.disabled = false;
  }
};

/* =========================
   ADD LOAN (FIREBASE SAVE)
========================= */
window.addLoan = async function(){

  let leader = document.getElementById("leader").value;
  let members = document.getElementById("members").value;
  let amount = document.getElementById("amount").value;
  let type = document.getElementById("type").value;

  if(!leader || !amount){
    alert("Please fill required fields");
    return;
  }

  try{
    await addDoc(collection(db,"loans"),{
      leader: leader,
      members: members,
      amount: amount,
      type: type,
      status: "Pending",
      createdAt: new Date()
    });

    alert("Loan Added Successfully ✅");

    // clear form
    document.getElementById("leader").value = "";
    document.getElementById("members").value = "";
    document.getElementById("amount").value = "";

    loadLoans();

  } catch(error){
    console.error(error);
    alert("Error saving loan");
  }
};

/* =========================
   LOAD LOANS (FIREBASE READ)
========================= */
async function loadLoans(){

  let table = document.getElementById("table");
  table.innerHTML = "";

  const snap = await getDocs(collection(db,"loans"));

  let total = 0;
  let borrowers = 0;
  let groups = 0;

  snap.forEach(doc => {

    let l = doc.data();

    total += Number(l.amount);
    borrowers++;

    if(l.type === "Group"){
      groups++;
    }

    table.innerHTML += `
      <tr>
        <td>
          <b>${l.leader}</b><br>
          <small>${l.members || "-"}</small>
        </td>
        <td>₱${l.amount}</td>
        <td>${l.type}</td>
        <td>${l.status}</td>
      </tr>
    `;
  });

  // DASHBOARD STATS
  document.getElementById("total").innerText = "₱" + total;
  document.getElementById("borrowers").innerText = borrowers;
  document.getElementById("groups").innerText = groups;
  document.getElementById("pending").innerText = borrowers;
}

/* =========================
   INIT LOAD
========================= */
loadLoans();

window.toggle = function () {
  let type = document.getElementById("type").value;
  let members = document.getElementById("members");

  if (type === "Solo") {
    members.value = "";
    members.style.display = "none"; // hide
  } else {
    members.style.display = "block"; // show
    members.disabled = false;
  }
};

window.addLoan = async function () {

  let leader = document.getElementById("leader").value;
  let members = document.getElementById("members").value;
  let amount = document.getElementById("amount").value;
  let type = document.getElementById("type").value;

  if (!leader || !amount) {
    alert("Fill required fields");
    return;
  }

  await addDoc(collection(db, "loans"), {
    leader: leader,
    members: type === "Solo" ? "" : members,
    amount: amount,
    type: type,
    status: "Pending"
  });

  loadLoans();
};

async function loadLoans() {

  let table = document.getElementById("table");
  table.innerHTML = "";

  const snap = await getDocs(collection(db, "loans"));

  let total = 0;
  let borrowers = 0;
  let groups = 0;

  snap.forEach(doc => {

    let l = doc.data();

    total += Number(l.amount);
    borrowers++;

    if (l.type === "Group") groups++;

    table.innerHTML += `
      <tr>
        <td>
          <b>${l.leader}</b><br>
          ${l.type === "Group" ? `<small>${l.members}</small>` : ""}
        </td>
        <td>₱${l.amount}</td>
        <td>${l.type}</td>
        <td>${l.status}</td>
      </tr>
    `;
  });

  document.getElementById("total").innerText = "₱" + total;
  document.getElementById("borrowers").innerText = borrowers;
  document.getElementById("groups").innerText = groups;
  document.getElementById("pending").innerText = borrowers;
}

window.show = function(page){
  document.getElementById("dash").style.display = "none";
  document.getElementById("loan").style.display = "none";

  document.getElementById(page).style.display = "block";
};

function adminLogin() {
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;

  // SIMPLE LOGIN (FOR DEMO ONLY)
  if (user === "admin" && pass === "1234") {
    alert("Login Successful ✅");

    // redirect to admin panel
    window.location.href = "admin.html";

  } else {
    alert("Wrong username or password ❌");
  }
}

function checkAccess() {
  let key = document.getElementById("accessKey").value;
  let msg = document.getElementById("msg");

  // ACCESS KEY (pwede mo palitan)
  if (key === "kasipag123") {
    msg.style.color = "lightgreen";
    msg.innerText = "Access Granted ✅";

    // go to login page
    setTimeout(() => {
      window.location.href = "login.html"; 
      // or admin.html depende sa flow mo
    }, 1000);

  } else {
    msg.style.color = "red";
    msg.innerText = "Wrong Access Key ❌";
  }
}

import { getFirestore, collection, getDocs } 
from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

const db = getFirestore(app);

async function login(user, pass) {

  const snap = await getDocs(collection(db, "accounts"));

  let found = false;

  snap.forEach(doc => {
    let data = doc.data();

    if(data.username === user && data.password === pass){
      found = true;

      alert("Login Success: " + data.role);

      // redirect based on role
      if(data.role === "admin"){
        window.location.href = "admin.html";
      }

      if(data.role === "cashier"){
        window.location.href = "cashier.html";
      }

      if(data.role === "rider"){
        window.location.href = "rider.html";
      }
    }
  });

  if(!found){
    alert("Invalid login");
  }
}   

import { getFirestore, collection, getDocs } 
from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

const db = getFirestore(app);

async function login(user, pass, accessKey) {

  const snap = await getDocs(collection(db, "accounts"));

  let found = false;

  snap.forEach(doc => {
    let data = doc.data();

    // ADMIN LOGIN (may access key)
    if(
      data.username === user &&
      data.password === pass &&
      data.role === "admin"
    ){

      if(data.accessKey !== accessKey){
        alert("Wrong Admin Access Key ❌");
        return;
      }

      found = true;
      alert("Admin Login Success ✅");

      window.location.href = "admin.html";
    }

    // CASHIER / RIDER LOGIN
    if(
      data.username === user &&
      data.password === pass &&
      data.role !== "admin"
    ){
      found = true;
      alert(data.role + " Login Success ✅");

      window.location.href = data.role + ".html";
    }
  });

  if(!found){
    alert("Invalid credentials ❌");
  }
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } 
from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

/* FIREBASE */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* LOGIN FUNCTION */
window.login = async function () {

  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;
  let key = document.getElementById("key").value;
  let role = document.getElementById("role").value;

  const snap = await getDocs(collection(db, "accounts"));

  let found = false;

  snap.forEach(doc => {
    let d = doc.data();

    if (
      d.username === user &&
      d.password === pass &&
      d.role === role
    ) {

      // ADMIN ACCESS KEY CHECK
      if (role === "admin") {
        if (d.accessKey !== key) {
          document.getElementById("msg").innerText = "Wrong Access Key ❌";
          return;
        }
      }

      found = true;

      document.getElementById("msg").innerText = "Login Success ✅";

      setTimeout(() => {
        window.location.href = role + "login.html";
      }, 1000);
    }
  });

  if (!found) {
    document.getElementById("msg").innerText = "Invalid Login ❌";
  }
};