import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

//Check how these functions can access AuthProvider and FirestoreProvider
// in order not to have to pass auth and db parameters to functions everytime

//TODO: when the user already connected himself once with google account
//and his password is memorized, allow him to change google account in the popup
const signInWithGoogle = async ({ auth, db }) => {
  const provider = new GoogleAuthProvider();

  try {
    // Auth with google account
    const res = await signInWithPopup(auth, provider);

    const user = res.user;

    // Check if user already registered
    const docRef = doc(db, "users", user.uid);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // User already registered
      localStorage.setItem(
        "user",
        JSON.stringify({
          isNewUser: false,
          ...docSnap.data(),
          id: user.uid,
        })
      );
      return { isNewUser: false, data: docSnap.data(), id: user.uid };
    } else {
      // Create new user
      let docRef = doc(db, "users", user.uid);

      await setDoc(docRef, {
        email: user.email,
        isAdmin: false,
        isPremium: false,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          isNewUser: true,
          ...docSnap.data(),
          id: user.uid,
        })
      );
      return {
        isNewUser: true,
        data: docSnap.data(),
        id: user.uid,
        isAdmin: false,
        isPremium: false,
      };
    }
  } catch (err) {
    console.error(err);
    return { error: true, message: err };
  }
};

const loginWithEmailAndPassword = async ({ auth, db, email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    // Check if user already registered
    const q = query(collection(db, "users"), where("email", "==", email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          isNewUser: false,
          ...querySnapshot.docs[0].data(),
          id: querySnapshot.docs[0].id,
        })
      );
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

const registerWithEmailAndPassword = async ({ auth, db, email, password }) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    let docRef = doc(db, "users", res.user.uid);

    await setDoc(docRef, {
      email: email,
      isAdmin: false,
      isPremium: false,
    });
    console.log("auth.currentUser", auth.currentUser);
    localStorage.setItem(
      "user",
      JSON.stringify({ ...res.user, id: res.user.uid })
    );

    // TODO: to uncomment for production
    //await sendEmailVerification(auth.currentUser);

    return { data: res.user, id: res.user.uid };
  } catch (err) {
    console.error(err);
    return { error: err.code, message: err.message };
  }
};

//TODO: update emails content and reset password page style
const resetPassword = async (auth, email) => {
  console.log(email);
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.error(err);
  }
};

const logout = (auth) => {
  signOut(auth);
};

const getUsers = async (db) => {
  // Check if user already registered
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((user) => {
    return { ...user.data(), id: user.id };
  });
};

const deleteUserById = async (db, id) => {
  console.log(id);
  // Check if user already registered
  const docRef = doc(db, "users", id);

  const docSnap = await getDoc(docRef);
  //TODO: find how to delete user from Firebase Auth
  // await deleteUser(id);
};

const toggleAdminRights = async (db, id, isAdmin) => {
  let docRef = doc(db, "users", id);

  await setDoc(docRef, { isAdmin: !isAdmin }, { merge: true });
};

export {
  signInWithGoogle,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  resetPassword,
  logout,
  getUsers,
  deleteUserById,
  toggleAdminRights,
};
