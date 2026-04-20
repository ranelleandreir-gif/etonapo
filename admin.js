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
window.checkAccess = function () {
  let key = document.getElementById("accessKey").value;

  // 👉 palitan mo kung anong gusto mong key
  let correctKey = "kasipag123";

  if (key === correctKey) {
    // save access (optional, for protection later)
    localStorage.setItem("adminAccess", "granted");

    // redirect to admin login
    window.location.href = "admin-login.html";
  } else {
    document.getElementById("msg").innerText = "Wrong Access Key!";
  }
};