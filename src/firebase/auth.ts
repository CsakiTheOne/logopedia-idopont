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
    User,
} from 'firebase/auth';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
let onAuthStateChangedListeners: ((user: User | null) => void)[] = [];
let currentUser: User | null = null;

onAuthStateChanged(auth, user => {
    currentUser = user;
    onAuthStateChangedListeners.forEach(listener => listener(user));
});

function addOnAuthStateChangedListener(listener: (user: User | null) => void) {
    onAuthStateChangedListeners.push(listener);
}

function removeOnAuthStateChangedListener(listener: (user: User | null) => void) {
    onAuthStateChangedListeners.filter(l => l !== listener);
}

function removeAllOnAuthStateChangedListeners() {
    onAuthStateChangedListeners = [];
}

function getCurrentUser(): User | null {
    return currentUser;
}

function register(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password);
}

function logIn(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password);
}

function logInGoogle(useRedirectInstead: boolean = false) {
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
