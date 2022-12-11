// Register the service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js", {
          scope: "/pwa-lab5/"
        })
        .then(registration => {
          console.log("Service Worker registered: ", registration)
        })
        .catch(registrationError => {
          console.log("Service Worker registration failed: ", registrationError)
        })
    })
  }
  


// disabling the form section initally
//document.getElementById("form-section").style.display = "none"


  if ("Notification" in window && "serviceWorker" in navigator) {
    document.getElementById("additems").addEventListener("click", function () {
        var permissionStatus = Notification.permission;
        console.log("Notification permission status: ", permissionStatus)
        if (permissionStatus === "granted") {
            showFormSec();
        } else {
            Notification.requestPermission(function (status) {
                console.log('Notification permission status:', status);
                if (status === "granted") {
                    showFormSec();
                }
            });
        }
    });
}

// firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD404XXvQZldkTLMY9Vaj1iQUwOQpizTv4",
    authDomain: "pwa-project-94421.firebaseapp.com",
    projectId: "pwa-project-94421",
    storageBucket: "pwa-project-94421.appspot.com",
    messagingSenderId: "550978748884",
    appId: "1:550978748884:web:38d4e8ad677718e21e5641",
    measurementId: "G-RQMK4T7N3W"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  var item = document.getElementById("item");
  var error = document.getElementsByClassName("error");

  // Loading the music from the database
  window.onload = getItem();

  // get the songs from the database
    function getItem() {
    getDocs(collection(db, "shopperlist")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        displaySongs(doc.data(), doc.id);
      });
    });
  }

  // adding items and validation
var addItem = document.getElementById("add_btn");
addItem.addEventListener("click", async () => {
  if (item.value == "") {
    error[0].innerHTML = "Please enter the item";
    error[0].style.color = "red";
  }
  if (item.value != "") {
    error[0].innerHTML = "";
    error[1].innerHTML = "";
    try {
      const docRef = await addDoc(collection(db, "shopperlist"), {
        item: item.value,
      });
      console.log("Document written with ID: ", docRef.id);
      displaySongs({ item: item.value }, docRef.id);
      clearFields();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  //disappear the error message after 3 seconds
  setTimeout(() => {
    error[0].innerHTML = "";
    error[1].innerHTML = "";
  }, 3000);
});