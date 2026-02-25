import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../config/firebase";
import { getUserProfile } from "../services/userService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    if (!firebaseUser?.uid) {
      setProfileData(null);
      return null;
    }

    setLoading(true);
    try {
      const profile = await getUserProfile(firebaseUser.uid);
      setProfileData(profile);
      return profile;
    } catch {
      setProfileData(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [firebaseUser?.uid]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setFirebaseUser(currentUser);

      if (!currentUser) {
        setProfileData(null);
        setLoading(false);
        return;
      }

      try {
        const profile = await getUserProfile(currentUser.uid);
        setProfileData(profile);
      } catch {
        setProfileData(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user: firebaseUser,
      firebaseUser,
      profileData,
      loading,
      refreshProfile,
    }),
    [firebaseUser, profileData, loading, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
