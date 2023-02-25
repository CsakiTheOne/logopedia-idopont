import { app } from './firebase';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

const auth = getAuth(app);
let onAuthStateChangedListeners = [];
let currentUser = null;

onAuthStateChanged(auth, user => {
    onAuthStateChangedListeners.forEach(listener => listener(user));
});

function addOnAuthStateChangedListener(listener) {
    onAuthStateChangedListeners.push(listener);
}

function removeOnAuthStateChangedListener(listener) {
    onAuthStateChangedListeners.pop(listener);
}

function removeAllOnAuthStateChangedListeners() {
    onAuthStateChangedListeners = [];
}

function getCurrentUser() {
    return currentUser;
}

function register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            currentUser = userCredential.user;
            console.log('User registered:');
            console.log({currentUser});
            //callback(currentUser);
        })
        .catch(error => {
            //callback(null);
        });
}

function logIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            currentUser = userCredential.user;
            console.log('User logged in:');
            console.log({currentUser});
            //callback(currentUser);
        })
        .catch(error => {
            //callback(null);
        });
}

function logOut() {
    console.log('Logging out user:');
    console.log({currentUser});
    signOut(auth);
}

export {
    addOnAuthStateChangedListener,
    removeOnAuthStateChangedListener,
    removeAllOnAuthStateChangedListeners,
    getCurrentUser,
    register,
    logIn,
    logOut,
};
