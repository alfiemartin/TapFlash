import { firebase } from "@firebase/app";
import "@firebase/storage";
import "@firebase/firestore";
import "@firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCOxpxuHxsE3X2mAYvFD8xcaCZgwdiFTzs",
  authDomain: "tapflash-77edb.firebaseapp.com",
  projectId: "tapflash-77edb",
  storageBucket: "tapflash-77edb.appspot.com",
  messagingSenderId: "197901796789",
  appId: "1:197901796789:web:6522a701e71f8a248c45fc",
  measurementId: "G-LH1FNCLYF9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp, provider };
