import { app } from './firebase';
import { getCurrentUser } from './auth';
import { getFirestore, doc, getDoc, getDocs, collection } from 'firebase/firestore';
import Work from '../model/Work';

const db = getFirestore(app);

function userIsAdmin(callback: (isAdmin: boolean) => void) {
    if (getCurrentUser() == null) {
        callback(false);
        return;
    }

    const userUid = getCurrentUser()?.uid;
    if (!userUid) return;

    const docRef = doc(db, 'users', userUid);
    getDoc(docRef)
        .then(snapshot => {
            callback(snapshot.data()?.isAdmin);
        })
        .catch(error => {
            callback(false);
        });
}

function getWorks(callback: (works: Work[]) => void) {
    getDocs(collection(db, 'works'))
        .then(querySnapshot => {
            const works: Work[] = [];
            querySnapshot.forEach(document => {
                works.push(Work.fromDocumentData(document.data()));
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
