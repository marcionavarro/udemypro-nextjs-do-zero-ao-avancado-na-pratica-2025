// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDcJ8bA4oyr6QSdMI3_2FxjOnfKxKBLzZY",
  authDomain: "nextjstarefas.firebaseapp.com",
  projectId: "nextjstarefas",
  storageBucket: "nextjstarefas.firebasestorage.app",
  messagingSenderId: "1045539010799",
  appId: "1:1045539010799:web:3d6f9eedae33bf0eaa431a"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };