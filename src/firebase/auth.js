import { app } from './firebase';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

const auth = getAuth(app);

let currentUser = null;

function getCurrentUser() {
    return currentUser;
}

function register(email, password, callback) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            currentUser = userCredential.user;
            callback(currentUser);
        })
        .catch(error => {
            callback(null);
        });
}

function logIn(email, password, callback) {
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            currentUser = userCredential.user;
            callback(currentUser);
        })
        .catch(error => {
            callback(null);
        });
}

function logOut() {
    signOut();
}

export { getCurrentUser, register, logIn, logOut };
