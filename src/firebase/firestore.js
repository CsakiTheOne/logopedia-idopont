import { app } from './firebase';
import { getCurrentUser } from './auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const db = getFirestore(app);

function userIsAdmin(callback) {
    const userUid = getCurrentUser().uid;
    const docRef = doc(db, 'users', userUid);
    getDoc(docRef)
        .then(snapshot => {
            console.log(snapshot.data());
            callback(snapshot.data().isAdmin);
        })
        .catch(error => {
            console.error(error);
            callback(false)
        });
}

export {
    userIsAdmin,
};
