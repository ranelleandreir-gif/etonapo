import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.login = async function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    let userCred = await signInWithEmailAndPassword(auth, email, password);

    let ref = doc(db, "users", email);
    let snap = await getDoc(ref);

    if (snap.exists()) {
      let role = snap.data().role;

      if (role === "admin") {
        window.location.href = "admin-dashboard.html";
      } else if (role === "cashier") {
        window.location.href = "cashier-dashboard.html";
      } else if (role === "rider") {
        window.location.href = "rider-dashboard.html";
      }
    } else {
      document.getElementById("msg").innerText = "No role assigned!";
    }

  } catch (error) {
    document.getElementById("msg").innerText = "Login Failed!";
  }
};