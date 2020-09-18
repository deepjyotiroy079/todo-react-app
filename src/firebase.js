import * as firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    
    /**
     * ADD YOUR FIREBASE CONFIGURATION HERE
     */
});

const db = firebaseApp.firestore();
export default db;