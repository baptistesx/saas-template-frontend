import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_xlwil1F61hYZ04YYWWXqcjjKSCqX_Lc",

  authDomain: "imlazy-f6a6e.firebaseapp.com",

  projectId: "imlazy-f6a6e",

  storageBucket: "imlazy-f6a6e.appspot.com",

  messagingSenderId: "71621008582",

  appId: "1:71621008582:web:092e2d3a0c62d9c5d2cbc7",

  measurementId: "G-VBVRG858LT",
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore(firebaseApp);

const signInWithGoogle = async () => {
  try {
    // Auth with google account
    const res = await signInWithPopup(auth, provider);

    const user = res.user;

    // Check if user already registered
    const docRef = doc(db, "users", user.uid);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // User already registered
      return { isNewUser: false, data: docSnap.data(), id: user.uid };
    } else {
      // Create new user
      let docRef = doc(db, "users", user.uid);

      await setDoc(docRef, {
        email: user.email,
      });

      docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);
      return { isNewUser: true, data: docSnap.data(), id: user.uid };
    }
  } catch (err) {
    console.error(err);
    return { error: true, message: err };
  }
};

const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    // Check if user already registered
    const q = query(collection(db, "users"), where("email", "==", email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      return {
        isNewUser: false,
        data: querySnapshot.docs[0].data(),
        id: querySnapshot.docs[0].id,
      };
    } else {
      return { error: true, message: "This user doesn't exist" };
    }
  } catch (error) {
    console.error(error.code);
    return { error: error.code, message: "This user doesn't exist" };
  }
};

const registerWithEmailAndPassword = async ({ email, password }) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    let docRef = doc(db, "users", res.user.uid);

    await setDoc(docRef, {
      email: email,
    });

    return { data: res.user, id: res.user.uid };
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

//TODO: to implement on the frontend
const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  provider,
  signInWithGoogle,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
