importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
     apiKey: "AIzaSyD72hN5YWmDSJdLebNldlbLInD5j5nyJrw",
  authDomain: "mini-project-7ecfd.firebaseapp.com",
  databaseURL: "https://mini-project-7ecfd-default-rtdb.firebaseio.com",
  projectId: "mini-project-7ecfd",
  storageBucket: "mini-project-7ecfd.firebasestorage.app",
  messagingSenderId: "172423282435",
  appId: "1:172423282435:web:1aa293b348a22f05bdb336",
  measurementId: "G-RCXKBDYCP2"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});