import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyAnxTBVcssUL7Xmz4S4ncRb2uu_uOHrsbU",
  authDomain: "test-react-d1086.firebaseapp.com",
  projectId: "test-react-d1086",
  storageBucket: "test-react-d1086.appspot.com",
  messagingSenderId: "543832785076",
  appId: "1:543832785076:web:d8e14229045f71f87417e1"
};
// Initialize Firebase
const fireb = firebase.initializeApp(config);
const store = fireb.firestore()

export {store};