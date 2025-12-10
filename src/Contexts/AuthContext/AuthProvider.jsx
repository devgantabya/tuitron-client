import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const normalizeUser = (userData) => {
    return {
      ...userData,
      displayName: userData.displayName || userData.name || "User",
      photoURL:
        userData.photoURL ||
        userData.image ||
        "https://i.ibb.co/fGMNLM9Z/Sample-User-Icon.png",
    };
  };

  const createUserWithEmail = async (email, password, extraData = {}) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const normalized = normalizeUser({ ...result.user, ...extraData });
    setUser(normalized);
    setLoading(false);
    return result;
  };

  const signInUser = async (email, password, extraData = {}) => {
    setLoading(true);
    const result = await signInWithEmailAndPassword(auth, email, password);
    const normalized = normalizeUser({ ...result.user, ...extraData });
    setUser(normalized);
    setLoading(false);
    return result;
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);
    const normalized = normalizeUser(result.user);
    setUser(normalized);
    setLoading(false);
    return result;
  };

  const signOutUser = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(normalizeUser(currentUser));
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUserWithEmail,
    signInUser,
    signInWithGoogle,
    signOutUser,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
