import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC812eaDn0_Ny0XkFxl5ryIN3HP7mSaMhg",
  authDomain: "bodegas-aquacolors.firebaseapp.com",
  projectId: "bodegas-aquacolors",
  storageBucket: "bodegas-aquacolors.appspot.com",
  messagingSenderId: "661702643564",
  appId: "1:661702643564:web:c48704f5f79982b3e36d49"

/*   apiKey: "AIzaSyBJkEVMJfrm3tZ_7ag5EZ5ff49In547EJY",
  authDomain: "aquacolors-auth.firebaseapp.com",
  projectId: "aquacolors-auth",
  storageBucket: "aquacolors-auth.appspot.com",
  messagingSenderId: "391414983905",
  appId: "1:391414983905:web:ceff1f5a5be3528d5a5ba0",
  measurementId: "G-RMQRGQ151J" */

};

const firebaseApp = initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default firebaseApp;
