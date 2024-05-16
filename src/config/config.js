/* import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'



const firebaseConfig = {
    apiKey: "AIzaSyCwUjs7nZK-FQgkkQ0YHEKmrED4I7o6ShI",
    authDomain: "researchelibrary-b258b.firebaseapp.com",
    projectId: "researchelibrary-b258b",
    storageBucket: "researchelibrary-b258b.appspot.com",
    messagingSenderId: "918309297517",
    appId: "1:918309297517:web:b89fffeb4a07bf1fbdce64",
    measurementId: "G-7FL9E2ETF6"
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage, };
 */

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database'; // Import the Realtime Database module

const firebaseConfig = {
    apiKey: "AIzaSyCwUjs7nZK-FQgkkQ0YHEKmrED4I7o6ShI",
    authDomain: "researchelibrary-b258b.firebaseapp.com",
    projectId: "researchelibrary-b258b",
    storageBucket: "researchelibrary-b258b.appspot.com",
    messagingSenderId: "918309297517",
    appId: "1:918309297517:web:b89fffeb4a07bf1fbdce64",
    measurementId: "G-7FL9E2ETF6"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const database = firebase.database(); // Initialize the Realtime Database

export { auth, db, storage, database }; // Export the database instance

