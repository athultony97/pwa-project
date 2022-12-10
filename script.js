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
document.getElementById("form-section").style.display = "none"


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