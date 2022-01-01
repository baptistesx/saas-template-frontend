import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
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
import { firebaseConfig } from "./firebaseConfig";

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
        isAdmin: false,
      });

      docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);
      return {
        isNewUser: true,
        data: docSnap.data(),
        id: user.uid,
        isAdmin: false,
      };
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
    console.error("tttt", error.code);
    return { error: error.code, message: "This user doesn't exist" };
  }
};

const registerWithEmailAndPassword = async ({ email, password }) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    let docRef = doc(db, "users", res.user.uid);

    await setDoc(docRef, {
      email: email,
      isAdmin: false,
    });
    console.log("auth.currentUser", auth.currentUser);
    // Send Email Verification and redirect to my website.
    await sendEmailVerification(auth.currentUser);

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

const getUsers = async () => {
  try {
    // Check if user already registered
    // const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(collection(db, "users"));

    // return querySnapshot.docs;
    return querySnapshot.docs.map((user) => {
      return { ...user.data(), id: user.id };
    });
    // if (querySnapshot.docs.length > 0) {
    //   return {
    //     isNewUser: false,
    //     data: querySnapshot.docs[0].data(),
    //     id: querySnapshot.docs[0].id,
    //   };
    // } else {
    //   return { error: true, message: "This user doesn't exist" };
    // }
  } catch (error) {
    console.error(error.code);
    return { error: error.code, message: "Error gettings users" };
  }
};

const deleteUserById = async (id) => {
  try {
    // await deleteDoc(doc(db, "users", id));
    // Check if user already registered
    const docRef = doc(db, "users", id);

    const docSnap = await getDoc(docRef);
    console.log(docSnap);
    // const user = await getUserById(docSnap);
    await deleteUser(docSnap);
    // return [];
    return getUsers();
  } catch (error) {
    console.error(error);
    return { error: true, message: "Error deleting user" };
  }
};

const toggleAdminRights = async (id, isAdmin) => {
  try {
    let docRef = doc(db, "users", id);

    // const currentDate = new Date();
    // const licenceExpiration = new Date(
    //   currentDate.setMonth(currentDate.getMonth() + 1)
    // );
    await setDoc(docRef, { idAdmin: !isAdmin }, { merge: true });
    return !isAdmin;
  } catch (error) {
    return { error: true, message: "Failed to toggle admin rights" };
    // console.error(error);
    // return { error: error.code, message: "Error deleting user" };
  }
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
  getUsers,
  deleteUserById,
  toggleAdminRights,
};
