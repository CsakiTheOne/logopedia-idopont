import { app } from './firebase';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
} from 'firebase/auth';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
let onAuthStateChangedListeners = [];
let currentUser = null;

onAuthStateChanged(auth, user => {
    currentUser = user;
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
    createUserWithEmailAndPassword(auth, email, password);
}

function logIn(email, password) {
    signInWithEmailAndPassword(auth, email, password);
}

function logInGoogle(useRedirectInstead) {
    if (useRedirectInstead) {
        signInWithRedirect(auth, googleProvider);
    }
    else {
        signInWithPopup(auth, googleProvider);
    }
}

function logOut() {
    signOut(auth);
}

export {
    addOnAuthStateChangedListener,
    removeOnAuthStateChangedListener,
    removeAllOnAuthStateChangedListeners,
    getCurrentUser,
    register,
    logIn,
    logInGoogle,
    logOut,
};
