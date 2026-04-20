// admin.js
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

window.checkAccess = async function () {
  let key = document.getElementById("accessKey").value;

  let email = "admin@gmail.com"; // admin account mo sa Firebase

  try {
    await signInWithEmailAndPassword(auth, email, key);

    // success
    window.location.href = "admin-dashboard.html";

  } catch (error) {
    document.getElementById("msg").innerText = "Invalid Access Key!";
  }
};