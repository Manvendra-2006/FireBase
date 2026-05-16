# 🔥 Firebase Learning Journey

A hands-on learning repository covering core Firebase services — built with **React + Vite**. Each folder is a standalone mini-project focused on one Firebase concept.

---

## 📚 What I Learned

| # | Topic | Folder |
|---|-------|--------|
| 1 | Firebase Setup & Initialization | `firebase/` |
| 2 | Firebase Context API Pattern | `FireBaseContext/context/` |
| 3 | Cloud Firestore (Database) | `CloudFireStore/databse/` |
| 4 | Realtime Database | `RealTimeDatabase/realtimedatabase/` |
| 5 | Firebase Cloud Messaging (Web Push) | `WebNotification/web/` |
| 6 | Full Project — Auth + Firestore CRUD | `Project/project/` |

---

## 🗂️ Repository Structure

```
root/
│
├── 📂 firebase/                          # Module 1 — Firebase basic setup
│   └── src/
│       └── firebase/
│           └── firebase.js              # Firebase app init + config
│
├── 📂 FireBaseContext/context/           # Module 2 — Firebase with React Context
│   └── src/
│       ├── FireBase/
│       │   └── FireBaseProvider.jsx     # Firebase Context Provider
│       └── pages/
│           └── Signup.jsx               # Signup page consuming context
│
├── 📂 CloudFireStore/databse/            # Module 3 — Cloud Firestore
│   └── src/
│       └── Firebase/
│           └── Firebase.js              # Firestore init + CRUD helpers
│
├── 📂 RealTimeDatabase/realtimedatabase/ # Module 4 — Realtime Database
│   └── src/
│       └── FireBase/
│           └── RealTimeDataBase.js      # Realtime DB init + read/write
│
├── 📂 WebNotification/web/               # Module 5 — Firebase Cloud Messaging
│   └── public/
│       └── firebase-messaging-sw.js     # Service Worker for background notifications
│   └── src/
│       └── Firebase/
│           └── Firebase.js              # FCM init + token + onMessage
│
└── 📂 Project/project/                   # Module 6 — Full Project (Auth + Firestore)
    └── src/
        ├── FireBase/
        │   └── FireBaseProvider.jsx     # Auth + Firestore context
        ├── CloudFirestore/
        │   └── DataBase.jsx             # Firestore CRUD operations
        ├── Pages/
        │   ├── Login.jsx
        │   ├── SignUp.jsx
        │   ├── Home.jsx
        │   ├── AddList.jsx
        │   ├── DetailPage.jsx
        │   └── Update.jsx
        └── components/
            └── Navbar.jsx
```

---

## 🔥 Module 1 — Firebase Setup (`firebase/`)

Basic Firebase project initialization using the Web SDK.

**What I learned:**
- Create a Firebase project in the Firebase Console
- Register a web app and get the config object
- Initialize Firebase with `initializeApp()`
- Export `auth`, `db`, and `app` instances for use across the project

**Key file — `firebase.js`:**
```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  // ...
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## ⚛️ Module 2 — Firebase Context (`FireBaseContext/context/`)

Wrapping Firebase services in React Context so any component can access auth without prop drilling.

**What I learned:**
- Create a `FireBaseProvider.jsx` that holds `auth` and exposes helper functions
- Use `createContext` + `useContext` pattern for Firebase
- Provide `signUp`, `logIn`, `logOut` methods via context

**Flow:**
```
main.jsx
  └── <FireBaseProvider>        ← wraps entire app
        └── <App />
              └── <Signup />    ← calls useContext(FireBaseContext)
                    └── fireBase.createUserWithEmailAndPassword(...)
```

**.env variables needed:**
```env
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
```

---

## 🗄️ Module 3 — Cloud Firestore (`CloudFireStore/databse/`)

Firebase's flexible NoSQL document database — stores data as collections of documents.

**What I learned:**
- Difference between Firestore and Realtime Database
- `addDoc` / `setDoc` — create documents
- `getDocs` / `getDoc` — read collections and single documents
- `updateDoc` — update specific fields
- `deleteDoc` — delete a document
- `query` + `where` + `orderBy` — filter and sort data
- `onSnapshot` — real-time listener (live updates without refresh)

**Core operations:**
```js
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";

// Add
await addDoc(collection(db, "items"), { name: "Test", createdAt: new Date() });

// Read all
const snapshot = await getDocs(collection(db, "items"));
snapshot.forEach(doc => console.log(doc.id, doc.data()));

// Real-time listener
onSnapshot(collection(db, "items"), (snapshot) => {
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

// Update
await updateDoc(doc(db, "items", id), { name: "Updated" });

// Delete
await deleteDoc(doc(db, "items", id));
```

---

## ⚡ Module 4 — Realtime Database (`RealTimeDatabase/realtimedatabase/`)

Firebase's original JSON tree database — great for live syncing and low-latency use cases.

**What I learned:**
- Difference between Realtime Database (JSON tree) vs Firestore (documents/collections)
- `ref()` — point to a database location
- `set()` — write data (overwrites)
- `push()` — add data with auto-generated key
- `onValue()` — real-time listener
- `update()` — update specific fields without overwriting
- `remove()` — delete data

**Core operations:**
```js
import { getDatabase, ref, set, push, onValue, update, remove } from "firebase/database";

const db = getDatabase(app);

// Write
await set(ref(db, "users/" + userId), { name: "Manvendra", age: 20 });

// Push (auto key)
await push(ref(db, "messages"), { text: "Hello!", timestamp: Date.now() });

// Real-time read
onValue(ref(db, "users"), (snapshot) => {
  console.log(snapshot.val());
});

// Update
await update(ref(db, "users/" + userId), { age: 21 });

// Delete
await remove(ref(db, "users/" + userId));
```

**.env variables needed:**
```env
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_DATABASE_URL=        ← required for Realtime DB
VITE_PROJECT_ID=
VITE_APP_ID=
```

---

## 🔔 Module 5 — Firebase Cloud Messaging (`WebNotification/web/`)

Send push notifications to users even when the browser tab is closed.

**What I learned:**
- How web push notifications work (foreground vs background)
- Request notification permission from the user
- Generate an FCM registration token (to target a specific device/browser)
- Handle **foreground notifications** with `onMessage()`
- Handle **background notifications** via Service Worker (`firebase-messaging-sw.js`)
- How to send a test notification from Firebase Console

**Flow:**
```
User grants notification permission
        │
        ▼
getToken(messaging, { vapidKey }) → FCM Registration Token
        │
        ▼
Token sent to your backend / saved to Firestore
        │
        ▼
Firebase Console / your server sends a notification to this token
        │
        ├── App is open → onMessage() fires → show in-app notification
        └── App is closed → Service Worker intercepts → shows OS notification
```

**Key files:**

`Firebase.js` — foreground handling:
```js
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const messaging = getMessaging(app);

// Request permission + get token
const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_VAPID_KEY });
console.log("FCM Token:", token);

// Foreground message handler
onMessage(messaging, (payload) => {
  console.log("Notification received:", payload);
});
```

`public/firebase-messaging-sw.js` — background handler (Service Worker):
```js
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js");

firebase.initializeApp({ /* same config */ });

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
```

> **Note:** The Service Worker file must live in `/public/` so it is served from the root (`/firebase-messaging-sw.js`).

---

## 🚀 Module 6 — Full Project (`Project/project/`)

A complete CRUD application combining Firebase Authentication + Cloud Firestore — deployed to Firebase Hosting.

**What I learned:**
- Combining Auth + Firestore in one project
- Protecting routes — redirect to login if not authenticated
- Full CRUD: Add, View, Update, Delete items from Firestore
- Firebase Hosting deployment with `firebase deploy`
- CI/CD with GitHub Actions (`firebase-hosting-pull-request.yml`) — auto-preview on every PR

**Pages:**

| Page | Purpose |
|------|---------|
| `SignUp.jsx` | Register with email/password |
| `Login.jsx` | Login with email/password |
| `Home.jsx` | Display all Firestore documents |
| `AddList.jsx` | Add a new document to Firestore |
| `DetailPage.jsx` | View a single document |
| `Update.jsx` | Edit and update a document |

**Auth + Firestore flow:**
```
User signs up / logs in (Firebase Auth)
        │
        ▼
Protected routes check onAuthStateChanged
        │
        ▼
Home → fetches all docs from Firestore collection
        │
        ├── AddList  → addDoc()
        ├── Detail   → getDoc()
        ├── Update   → updateDoc()
        └── Delete   → deleteDoc()
```

**Deploy to Firebase Hosting:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

**GitHub Actions (`.github/workflows/firebase-hosting-pull-request.yml`):**
- Automatically builds and deploys a **preview channel** on every pull request
- Lets you review changes on a live URL before merging to main

---

## ⚙️ Common Setup (All Modules)

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add Project** → follow the steps
3. Go to **Project Settings → General → Your apps** → Add a Web App
4. Copy the config object

### 2. Install Firebase SDK

```bash
npm install firebase
```

### 3. Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
VITE_DATABASE_URL=your_project.firebaseio.com   # Realtime DB only
VITE_VAPID_KEY=your_vapid_key                   # FCM only
```

> All variables must start with `VITE_` to be accessible in Vite projects.

---

## 🔥 Firebase Services — Quick Comparison

| Service | Type | Best For |
|---------|------|----------|
| **Cloud Firestore** | NoSQL Document DB | Structured data, complex queries, scalable apps |
| **Realtime Database** | JSON Tree DB | Live sync, chat, simple low-latency data |
| **Authentication** | Auth Service | Email/password, Google, GitHub login |
| **Cloud Messaging (FCM)** | Push Notifications | Web push, background alerts |
| **Firebase Hosting** | Static Hosting | Deploy React/Vite apps with a single command |

---

## 📄 License

MIT — Free to use and learn from.

---

## 👨‍💻 Author

**Manvendra** — [github.com/Manvendra-2006](https://github.com/Manvendra-2006)

> *Learning Firebase one service at a time 🔥*
