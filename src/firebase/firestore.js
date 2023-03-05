import { app } from './firebase';
import { getCurrentUser } from './auth';
import { getFirestore, doc, getDoc, getDocs, collection } from 'firebase/firestore';

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

function getWorks(callback) {
    getDocs(collection(db, 'works'))
        .then(querySnapshot => {
            const works = [];
            querySnapshot.forEach(document => {
                works.push(document.data());
            });
            callback(works);
        })
        .catch(error => {
            console.error(error);
            callback([]);
        });
}

export {
    userIsAdmin,
    getWorks,
};
