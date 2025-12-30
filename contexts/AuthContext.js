import { createContext, useEffect, useState } from "react";
import { account, databases, ID } from "../appwriteConfig";
import { APPLICANTS_COLLECTION_ID, DB_ID } from "../constants";
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

  const signUp = async (name, email, password) => {
  // Create the user account
  const newUser = await account.create({
    userId: ID.unique(),
    email,
    password,
    name,
  });

  // Immediately log them in
  await account.createEmailPasswordSession({
    email,
    password,
  });

  await fetchUser(); // refresh user in context

  // Create applicant document if needed
  try {
    await databases.createDocument(DB_ID, APPLICANTS_COLLECTION_ID, ID.unique(), {
      userID: newUser.$id,
      name: name,
      universities: [],
      statuses: [],
    });
  } catch (e) {
    // ignore if document already exists
  }
};

// login
const login = async (email, password) => {
  await account.createEmailPasswordSession({
    email,
    password,
  });
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
