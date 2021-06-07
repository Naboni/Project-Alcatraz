import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDnN_lXnJRwcZrO3SBIbINjR20iJ5XhJyQ",
    authDomain: "temaribet-af8a0.firebaseapp.com",
    databaseURL: "https://temaribet-af8a0-default-rtdb.firebaseio.com",
    projectId: "temaribet-af8a0",
    storageBucket: "temaribet-af8a0.appspot.com",
    messagingSenderId: "361477504348",
    appId: "1:361477504348:web:bb1f559f4687130e691599"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;