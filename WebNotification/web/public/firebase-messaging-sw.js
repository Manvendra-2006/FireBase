importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBgc_lKawS3Hl9Iw7db00ncKgkYwSAFMww",
  authDomain: "app-15638.firebaseapp.com",
  projectId: "app-15638",
  storageBucket: "app-15638.firebasestorage.app",
  messagingSenderId: "653259511087",
  appId: "1:653259511087:web:aeeb887f342a24db7a3dda"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});