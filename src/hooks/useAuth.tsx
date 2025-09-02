import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { auth, googleProvider } from "../utils/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { User } from "../types";
import { getToken, setToken, removeToken, isTokenValid } from "../utils/auth";
import { saveData, loadData } from "../utils/realtimeDb";
import { mockApi } from "../utils/api";

// ----------------------------
// 🔹 Auth Context Interface
// ----------------------------
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: { fullName: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  loginAsGuest: () => void;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ----------------------------
  // 🔹 Google Login
  // ----------------------------
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken || "";
      setToken(token);
      setTokenState(token);
      // Build user object
      const userObj: User = {
        id: result.user.uid,
        fullName: result.user.displayName || "",
        email: result.user.email || "",
        subscriptionPlan: "free",
        createdAt: result.user.metadata.creationTime || new Date().toISOString(),
      };
      // Save user to database
      await saveData(`users/${userObj.id}`, userObj);
      setUser(userObj);
    } catch (error) {
      console.error("Google login error", error);
      throw new Error("Google login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------
  // 🔹 Init Auth from Local Storage
  // ----------------------------
  useEffect(() => {
    const savedToken = getToken();
    if (savedToken && isTokenValid(savedToken)) {
      setTokenState(savedToken);
      setUser({
        id: "1",
        fullName: "Current User",
        email: "user@example.com",
        subscriptionPlan: "free",
        createdAt: new Date().toISOString(),
      });
    }
    setIsLoading(false);
  }, []);

  // ----------------------------
  // 🔹 Email/Password Login
  // ----------------------------
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await mockApi.login(email, password);
      setToken(response.token);
      setTokenState(response.token);
      // Save user to database
      await saveData(`users/${response.user.id}`, response.user);
      setUser(response.user);
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------
  // 🔹 Signup
  // ----------------------------
  const signup = async (userData: { fullName: string; email: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await mockApi.signup(userData);
      setToken(response.token);
      setTokenState(response.token);
      // Save user to database
      await saveData(`users/${response.user.id}`, response.user);
      setUser(response.user);
    } catch (error) {
      console.error("Signup failed", error);
      throw new Error("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------
  // 🔹 Logout
  // ----------------------------
  const logout = () => {
    removeToken(); // remove from localStorage
    setTokenState(null);
    setUser(null);
  };

  // ----------------------------
  // 🔹 Guest Login
  // ----------------------------
  const loginAsGuest = () => {
    const guestToken = "guest-token";
    setToken(guestToken);
    setTokenState(guestToken);
    setUser({
      id: "guest",
      fullName: "Guest User",
      email: "guest@demo.com",
      subscriptionPlan: "free",
      createdAt: new Date().toISOString(),
    });
  };

  // ----------------------------
  // 🔹 Provide Auth Context
  // ----------------------------
  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    loginAsGuest,
    loginWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ----------------------------
// 🔹 Custom Hook
// ----------------------------
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
