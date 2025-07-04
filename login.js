// js/firebase-init.js
const firebaseConfig = {
    apiKey: "AIzaSyB347UQVB-MVrcu234y9K1EiDky1WjTqwI",
    authDomain: "mymusicweb-bf2b8.firebaseapp.com",
    projectId: "mymusicweb-bf2b8",
    storageBucket: "mymusicweb-bf2b8.firebasestorage.app",
    messagingSenderId: "776730389109",
    appId: "1:776730389109:web:9ae4fecc2021dc8fd5263c",
    measurementId: "G-LRJX7J7E6J"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
// js/login.js
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        document.getElementById('message').textContent = "Login successful!";
        document.getElementById('message').style.color = "green";
        // You can redirect if needed: window.location.href = "index.html";
      })
      .catch((error) => {
        document.getElementById('message').textContent = "Error: " + error.message;
        document.getElementById('message').style.color = "red";
      });
  });
    