import db from '../db/firestore';
import firebase from 'firebase';
import 'firebase/auth';

const createUserProfile = userProfile => 
    db.collection('profiles')
        .doc(userProfile.uid)
        .set(userProfile);

export const getUserProfile = uid =>
    db.collection('profiles')
        .doc(uid)
        .get()
        .then(snapshot => snapshot.data());

export async function register({ email, password, username, avatar }) {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await createUserProfile({
        uid: user.uid,
        username,
        email,
        avatar,
        joinedChats: []
    });
}

export const login = ({ email, password }) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

export const logout = () => firebase.auth().signOut();

export const onAuthStateChanges = onAuth =>
  firebase.auth().onAuthStateChanged(onAuth);