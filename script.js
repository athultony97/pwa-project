// Register the service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js", {
          scope: "/pwa-project/"
        })
        .then(registration => {
          console.log("Service Worker registered: ", registration)
        })
        .catch(registrationError => {
          console.log("Service Worker registration failed: ", registrationError)
        })
    })
  }
  
  function onClickHome() {
    myNavigator.pushPage("index1.html")
  }

// disabling the form section initally
document.getElementById("form-section").style.display = "none"


function showFormSec() {
    document.getElementById("form-section").style.display = "block";
}


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

    // when show button clicked: new notification is created
    document.getElementById("add_btn").addEventListener("click", function () {
        if (document.getElementById("title").value === "") {
            document.getElementById("error").innerHTML = "Please add content in Title";
        } else {
            console.log("Else section")
            var options = {
                body: document.getElementById('body').value,
                actions: [{
                        action: "agree",
                        title: "Agree"
                    },
                    {
                        action: "disagree",
                        title: "Disagree"
                    },
                ],
            };
            new Notification(document.getElementById("item").value)
            //new Notification(document.getElementById("body").value)
             navigator.serviceWorker.ready.then((register) => {
             register.showNotification(item.value, options);
            });
        }
    });

    navigator.serviceWorker.addEventListener("message", function (event) {
        document.getElementById("error").innerHTML = event.data;
    });
}

// firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
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
      displayItems({ item: item.value }, docRef.id);
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


// Display the songs
function displayItems(data, id) {
    var itemList = document.getElementsByClassName("list-item-container");
    var itemDivision = document.createElement("div");
    itemDivision.classList.add("list-songs");
    itemDivision.setAttribute("id", id);
    itemDivision.innerHTML = `
      <div class="textfields">
           <div>
              <h2 class="list-item-title">${data?.item}</h2>
           </div>
        </div>
        <div class="buttons">
        </div>
      `;
    itemList[0].appendChild(itemDivision);
    deleteBtn(id, itemDivision.querySelector(".buttons"));
  }
