import { createContext, useEffect, useState } from "react";
import { account, ID } from "../appwriteConfig";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const current = await account.get();
      setUser(current);
    } catch (err) {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // dead-end cuz a session is already active issuee
  // have to add delte session prior to account create
  
  const signUp = async (name, email, password) => {
  try {
    const session = await account.getSession("current");
    if (session) {
      await account.deleteSession("current");
    }
  } catch {}

  const newUser = await account.create(
    ID.unique(),
    email.trim(),
    password,
    name
  );

  await account.createEmailPasswordSession(
    email.trim(),
    password
  );

  await fetchUser();
};


// login
const login = async (email, password) => {
  try {
    const session = await account.getSession("current");
    if (session) {
      await account.deleteSession("current");
    }
  } catch {}

  await account.createEmailPasswordSession(
    email.trim(),
    password
  );

  await fetchUser();
};



  const logout = async () => {
    try {
      await account.deleteSession("current");
    } catch (err) {
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
