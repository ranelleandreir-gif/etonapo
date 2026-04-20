import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.login = async function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let selectedRole = localStorage.getItem("role");

  try {
    let userCred = await signInWithEmailAndPassword(auth, email, password);

    let ref = doc(db, "users", email);
    let snap = await getDoc(ref);

    if (snap.exists()) {
      let role = snap.data().role;

      // 🚨 SECURITY CHECK
      if (role !== selectedRole) {
        document.getElementById("msg").innerText = "Wrong role selected!";
        return;
      }

      if (role === "admin") {
        window.location.href = "admin-dashboard.html";
      } else if (role === "cashier") {
        window.location.href = "cashier-dashboard.html";
      } else {
        window.location.href = "rider-dashboard.html";
      }

    } else {
      document.getElementById("msg").innerText = "No role found!";
    }

  } catch (error) {
    document.getElementById("msg").innerText = "Login Failed!";
  }
};