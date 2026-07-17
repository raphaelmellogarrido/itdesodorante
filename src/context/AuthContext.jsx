import { createContext, useContext, useEffect, useState } from "react";
import { pb } from "../lib/pocketbase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(pb.authStore.record);

  useEffect(() => {
    return pb.authStore.onChange(() => {
      setUser(pb.authStore.record);
    });
  }, []);

  async function login(email, password) {
    await pb.collection("users").authWithPassword(email, password);
  }

  async function register({ name, email, password, passwordConfirm }) {
    await pb.collection("users").create({
      name,
      email,
      password,
      passwordConfirm,
    });
    await login(email, password);
  }

  function logout() {
    pb.authStore.clear();
  }

  async function updateProfile(data) {
    await pb.collection("users").update(user.id, data);
    await pb.collection("users").authRefresh();
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
