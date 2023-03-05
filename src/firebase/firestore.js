import { app } from './firebase';
import { getCurrentUser } from './auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const db = getFirestore(app);

function userIsAdmin(callback) {
    if (getCurrentUser() == null) {
        callback(false);
        return;
    }

    const userUid = getCurrentUser().uid;
    const docRef = doc(db, 'users', userUid);
    getDoc(docRef)
        .then(snapshot => {
            callback(snapshot.data().isAdmin);
        })
        .catch(error => {
            callback(false);
        });
}

export {
    userIsAdmin,
};
