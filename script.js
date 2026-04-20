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