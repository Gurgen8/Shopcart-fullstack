//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4kuKL30y08Oy_p8Mj6qCt3Ez00a2EQtA",
  authDomain: "facecontact-notification.firebaseapp.com",
  projectId: "facecontact-notification",
  storageBucket: "facecontact-notification.appspot.com",
  messagingSenderId: "488292454980",
  appId: "1:488292454980:web:5502c4f69f79825ef22211",
  measurementId: "G-XNLFRWL5G5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);