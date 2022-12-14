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

// disabling the form section initally
 document.getElementById("form-section").style.display = "none"

 // on send notification button clicked
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
        if (document.getElementById("item").value === "") {
            document.getElementById("error").innerHTML = "Please add content in Item";
        } else {
            console.log("Else section")
            var options = {
                body: document.getElementById('body')?.value,
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

function showFormSec() {
    document.getElementById("form-section").style.display = "block";
}

// firebase configuration
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";;
import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
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
const db = getFirestore(app);

var item = document.getElementById("item");

var addItem = document.getElementById("add_btn");

addItem.addEventListener("click", async () => {
    console.log(item.value)
    addDoc(collection(db, "shopperlist"), {
        item: item.value
    }).then(docRef => {
        console.log(docRef.id)
    }).catch(err => {
        console.log(err)
    })
})

window.onload = () => {
    getDocs(collection(db, "shopperlist")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
             const listContainer = document.getElementsByClassName('list-item-container')
             var div = document.createElement("div");

            listContainer[0].appendChild(div)
            div.classList.add("list")
            div.innerText = doc.data().item
        });
    })
}

// clear the fields after adding a song
function clearFields() {
    item.value = "";
  }
