import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtzxluD-670lfHCbbqweVayAPIx6CNe0o",
  authDomain: "devops-trista.firebaseapp.com",
  projectId: "devops-trista",
  storageBucket: "devops-trista.firebasestorage.app",
  messagingSenderId: "164514167755",
  appId: "1:164514167755:web:04733beb62663b782d544e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Tambahkan ini supaya bisa di-import
export { auth };
